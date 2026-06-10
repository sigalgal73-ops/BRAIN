// netlify/functions/videos.js
// מושך את פיד ה-RSS של ערוץ היוטיוב (בחינם, בלי מפתח API) ומחזיר רשימת סרטונים כ-JSON.
// הדף (videos.html / en/videos.html) מצייר מזה קוביות. מתעדכן אוטומטית בכל העלאה חדשה.

const DEFAULT_CHANNEL = "UCWF03qbriOtNCx8M19QFGQQ"; // Brain Co-Manager

exports.handler = async (event) => {
  try {
    const channel = (event.queryStringParameters && event.queryStringParameters.channel) || DEFAULT_CHANNEL;
    const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=" + encodeURIComponent(channel);

    const res = await fetch(feedUrl, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) {
      return { statusCode: res.status, headers: cors(), body: JSON.stringify({ error: "feed fetch failed", status: res.status }) };
    }
    const xml = await res.text();

    // כל סרטון נמצא בתוך <entry>...</entry>
    const entries = xml.split("<entry>").slice(1);
    const videos = [];
    for (const e of entries) {
      const id = match(e, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      if (!id) continue;
      const title = decode(match(e, /<media:title>([\s\S]*?)<\/media:title>/) || match(e, /<title>([\s\S]*?)<\/title>/) || "");
      const published = match(e, /<published>([^<]+)<\/published>/) || "";
      videos.push({
        id,
        title,
        published,
        thumb: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"
      });
    }

    return {
      statusCode: 200,
      headers: Object.assign(cors(), {
        "content-type": "application/json",
        // קאש של 30 דקות ב-CDN כדי לא למשוך את הפיד בכל טעינה
        "cache-control": "public, max-age=0, s-maxage=1800"
      }),
      body: JSON.stringify({ channel, count: videos.length, videos })
    };
  } catch (err) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: String(err) }) };
  }
};

function match(s, re) { const m = s.match(re); return m ? m[1].trim() : ""; }
function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}
function cors() { return { "access-control-allow-origin": "*" }; }
