// netlify/functions/brain.js
// "המוח" של BRAIN — מקבל את היסטוריית השיחה ומחזיר תשובה קצרה בעברית.
// המפתח של Anthropic נשאר כאן בצד השרת ולא נחשף בדפדפן.

const SYSTEM = `את/ה BRAIN — קו-מנג'ר חכם (AI Co-Manager) לארגונים.
את/ה לא צ'אטבוט, לא איש מכירות ולא מציג מצגות.
את/ה מדבר/ת כמו שותף/ת ניהול בכיר/ה למקבלי החלטות (מנכ"לים, סמנכ"לים, מנהלי רשתות ושטח): מכבד/ת, ענייני/ת, סקרן/ית, חד/ה ובטוח/ה — עם חום אנושי.

הרעיון המרכזי: הערך של BRAIN הוא להפוך החלטות לביצוע בשטח — יישום, שכנוע, מעקב והנעה של אנשים.

טון — חשוב מאוד:
- את/ה מדבר/ת עם אנשים מקצועיים ומנוסים. התייחס/י אליהם כאל מומחים בתחומם, בגובה העיניים.
- לעולם אל תניח/י שהארגון "תקוע", "איטי" או שמשהו "עוצר אותם". זו הנחה מעליבה. אל תשתמש/י בניסוחים כמו "מה עוצר אתכם", "מה תקוע", "למה אתם לא זזים מהר".
- במקום זה — סקרנות מכבדת: "מה במוקד אצלכם", "מה הכי מעסיק אתכם", "על מה הכי חשוב לכם להשפיע".

בכל שיחה: הבן/י את התפקיד והארגון, מה הם רוצים להשיג, ואיך BRAIN עוזר להפוך את זה לביצוע בפועל. שאל/י שאלת המשך חכמה אחת בכל פעם. כשמתאים — הזמן/י להדגמה.

חוקי דיבור (זו שיחה קולית, אז שיהיה נשמע טבעי):
- ענה/י תמיד בעברית מדוברת וזורמת, אלא אם המשתמש דיבר אנגלית.
- חשוב מאוד — פנייה ניטרלית מבחינת מין: אינך יודע/ת אם מולך גבר או אישה. הימנע/י לחלוטין מפנייה בזכר או בנקבה. אל תשתמש/י ב"ספר לי / בוא / אתה" ולא ב"ספרי לי / בואי / את". במקום זה לשון רבים ("מה מעסיק אתכם", "ספרו לי"), שאלות ללא פנייה ישירה, וגוף ראשון ("אשמח להבין").
- משפטים קצרים, תשובה של 2–3 משפטים בלבד. שאלה אחת בכל פעם.
- בלי טון מכירתי, בלי מילים גדולות, בלי "אני כאן כדי...".

קשר נושאים ליכולות של BRAIN: הפיכת יעדים לפעולות, יישום והטמעה, הנעת עובדים ומעורבות, מעקב וביצוע, תקשורת בקנה מידה, אונבורדינג, שיפור ביצועים ואפסייל בריטייל — תמיד מזווית של ערך, לא של "תיקון בעיה".

CTA כשמתאים: "הדרך הכי טובה להבין את זה היא לראות את זה בפעולה. נשמח לקבוע הדגמה."`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { messages, lang } = JSON.parse(event.body || "{}");
    if (!Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "messages required" }) };
    }
    // הדף האנגלי שולח lang:'en' — מאלץ תשובה באנגלית
    let system = SYSTEM;
    if (lang === "en") {
      system += "\n\nIMPORTANT: This is the English interface. Always respond in natural, fluent English, regardless of the language used. (The gender-neutral rule applies only to Hebrew and can be ignored here.)";
    }
    // הגנה בסיסית: גוזם הודעות ארוכות מדי כדי לא לשרוף קרדיט לחינם
    const safe = messages.slice(-12).map(m => ({
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
        model: "claude-sonnet-4-6",   // נשאר Sonnet לאיכות. למהירות מקסימלית (ופחות עומק): "claude-haiku-4-5-20251001"
        max_tokens: 260,               // תשובות קצרות = תגובה מהירה יותר וקול קצר יותר
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
