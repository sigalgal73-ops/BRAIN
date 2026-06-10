// netlify/functions/videos.js
// מחזיר את סרטוני הערוץ כ-JSON עבור דף הסרטונים (קוביות).
// אם מוגדר YOUTUBE_API_KEY (משתנה סביבה ב-Netlify) -> מושך את כל הסרטונים דרך YouTube Data API (עם דפדוף).
// אחרת -> נופל ל-RSS (15 הסרטונים האחרונים, בחינם, בלי מפתח).

const DEFAULT_CHANNEL = "UCWF03qbriOtNCx8M19QFGQQ"; // Brain Co-Manager

exports.handler = async (event) => {
  const channel = (event.queryStringParameters && event.queryStringParameters.channel) || DEFAULT_CHANNEL;
  try {
    let videos;
    if (process.env.YOUTUBE_API_KEY) {
      videos = await fromApi(channel, process.env.YOUTUBE_API_KEY);
    } else {
      videos = await fromRss(channel);
    }
    return {
      statusCode: 200,
      headers: Object.assign(cors(), {
        "content-type": "application/json",
        "cache-control": "public, max-age=0, s-maxage=1800"
      }),
      body: JSON.stringify({ channel, count: videos.length, source: process.env.YOUTUBE_API_KEY ? "api" : "rss", videos })
    };
  } catch (err) {
    try {
      const videos = await fromRss(channel);
      return { statusCode: 200, headers: Object.assign(cors(), { "content-type": "application/json" }), body: JSON.stringify({ channel, count: videos.length, source: "rss-fallback", videos }) };
    } catch (e) {
      return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: String(err) }) };
    }
  }
};

async function fromApi(channelId, key) {
  const uploads = "UU" + channelId.slice(2);
  const out = [];
  let pageToken = "";
  for (let i = 0; i < 10; i++) {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50"
      + "&playlistId=" + encodeURIComponent(uploads)
      + (pageToken ? "&pageToken=" + pageToken : "")
      + "&key=" + encodeURIComponent(key);
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error("api " + res.status + " " + JSON.stringify(data.error || {}));
    (data.items || []).forEach(it => {
      const id = it.contentDetails && it.contentDetails.videoId;
      if (!id) return;
      const sn = it.snippet || {};
      out.push({
        id,
        title: sn.title || "",
        published: (it.contentDetails && it.contentDetails.videoPublishedAt) || sn.publishedAt || "",
        thumb: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"
      });
    });
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }
  return out;
}

async function fromRss(channelId) {
  const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=" + encodeURIComponent(channelId);
  const res = await fetch(feedUrl, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error("rss " + res.status);
  const xml = await res.text();
  const entries = xml.split("<entry>").slice(1);
  const out = [];
  for (const e of entries) {
    const id = match(e, /<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!id) continue;
    const title = decode(match(e, /<media:title>([\s\S]*?)<\/media:title>/) || match(e, /<title>([\s\S]*?)<\/title>/) || "");
    const published = match(e, /<published>([^<]+)<\/published>/) || "";
    out.push({ id, title, published, thumb: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" });
  }
  return out;
}

function match(s, re) { const m = s.match(re); return m ? m[1].trim() : ""; }
function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}
function cors() { return { "access-control-allow-origin": "*" }; }
