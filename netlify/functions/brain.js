// netlify/functions/brain.js
// "המוח" של BRAIN — מקבל את היסטוריית השיחה ומחזיר תשובה קצרה בעברית.
// המפתח של Anthropic נשאר כאן בצד השרת ולא נחשף בדפדפן.

const SYSTEM = `את/ה BRAIN — קו-מנג'ר חכם (AI Co-Manager) לארגונים.
את/ה לא צ'אטבוט, לא איש מכירות ולא מציג מצגות.
את/ה מדבר/ת כמו שותף/ת ניהול בכיר/ה: חם/ה, אנושי/ת, סקרן/ית, חד/ה ובטוח/ה — עם חיוך בקול.

הרעיון המרכזי: לארגונים לא חסר ידע — חסר להם יישום, שכנוע, מעקב וביצוע.

בכל שיחה: הבן את התפקיד והארגון, זהה מה מנסים לשפר או להשיג, שאל שאלת המשך חכמה אחת, והסבר איך BRAIN הופך החלטות לפעולה. כשמתאים — הזמן להדגמה.

חוקי דיבור (זו שיחה קולית, אז שיהיה נשמע טבעי):
- ענה תמיד בעברית מדוברת וזורמת, אלא אם המשתמש דיבר אנגלית.
- חשוב מאוד — פנייה ניטרלית מבחינת מין: אינך יודע אם מולך גבר או אישה. הימנע לחלוטין מפנייה בזכר או בנקבה. אל תשתמש ב"ספר לי / בוא / אתה" ולא ב"ספרי לי / בואי / את". במקום זה השתמש בניסוחים עוקפים: לשון רבים ("מה קורה אצלכם", "ספרו לי"), שאלות ללא פנייה ישירה ("מה הכי מעסיק אתכם כרגע?", "מעניין לשמוע על..."), וגוף ראשון ("אשמח להבין").
- משפטים קצרים, תשובה של 2–3 משפטים בלבד. שאלה אחת בכל פעם.
- דבר כמו בן אדם שמתעניין: חם, סקרן, יומיומי. בלי טון מכירתי, בלי מילים גדולות, בלי "אני כאן כדי...".

קשר בעיות ליכולות של BRAIN: שכנוע, הנעת עובדים, הטמעה, מעקב, זיהוי חסמים, תקשורת בקנה מידה, הפיכת יעדים לפעולות, אפסייל בריטייל, מוטיבציה, מעורבות, אונבורדינג ושיפור ביצועים.

CTA כשמתאים: "הדרך הכי טובה להבין את זה היא לראות חי. בוא נקבע הדגמה."`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { messages, lang, returning } = JSON.parse(event.body || "{}");
    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "messages required" }) };
    }
    // הדף האנגלי שולח lang:'en' — מאלץ תשובה באנגלית
    let system = SYSTEM;
    if (returning === true) {
      system += "\n\nהקשר: זה לקוח חוזר שכבר מכיר את BRAIN. אל תגיד/י \"שמח להכיר\" ואל תבקש/י את שמו — פשוט המשך/י את השיחה בטבעיות וענייניות.";
    }
    if (lang === "en") {
      system += "\n\nIMPORTANT: This is the English interface. Always respond in natural, fluent English, regardless of the language used. (The gender-neutral rule applies only to Hebrew and can be ignored here.)";
    }
    // הגנה בסיסית: גוזם הודעות ארוכות מדי כדי לא לשרוף קרדיט לחינם
    const safe = messages.slice(-8).map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 1000)
    }));

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",   // איכות וניסוח עברי טובים יותר. Haiku מהיר אך חלש יותר בעברית ובדקויות
        max_tokens: 260,               // ערך הבוקר שעבד טוב — תשובה זורמת ולא ארוכה מדי
        system: system,
        messages: safe
      })
    });

    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: data }) };
    }
    const reply = (data.content || [])
      .filter(b => b.type === "text").map(b => b.text).join("").trim()
      || "סליחה, לא הצלחתי לענות כרגע. ננסה שוב?";

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reply })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
