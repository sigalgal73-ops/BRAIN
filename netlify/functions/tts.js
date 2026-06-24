// netlify/functions/tts.js
// ממיר טקסט של BRAIN לקול עברי טבעי דרך ElevenLabs, ומחזיר MP3.
// המפתח של ElevenLabs נשאר כאן בצד השרת.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { text } = JSON.parse(event.body || "{}");
    if (!text || !String(text).trim()) {
      return { statusCode: 400, body: JSON.stringify({ error: "text required" }) };
    }
    const clean = String(text).slice(0, 800); // הגנה מפני טקסט ארוך מדי
    const voiceId = process.env.ELEVENLABS_VOICE_ID;

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_22050_32`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "content-type": "application/json",
          "accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text: clean,
          model_id: "eleven_v3", // היחיד שמדבר עברית טוב אצלנו. אל תחליפי — multilingual/turbo/flash יוצאים גיבריש
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.8,
            style: 0,
            use_speaker_boost: false
          }
        })
      }
    );

    if (!res.ok) {
      const t = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: t }) };
    }

    const buf = Buffer.from(await res.arrayBuffer());
    return {
      statusCode: 200,
      headers: { "content-type": "audio/mpeg" },
      body: buf.toString("base64"),
      isBase64Encoded: true
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
