# הוראות הגדרת DMARC, SPF ו-DKIM ב-Cloudflare
## הגנה על brain2spark.ai מפני זיוף אימיילים (Email Spoofing)

---

## מה הבעיה?

כרגע מישהו יכול לשלוח אימיילים מזויפים בשם `@brain2spark.ai` ללקוחות שלך.  
3 רשומות DNS פותרות את זה לגמרי: **SPF**, **DKIM**, ו-**DMARC**.

---

## שלב 1 — כניסה ל-Cloudflare DNS

1. היכנסי ל-[dash.cloudflare.com](https://dash.cloudflare.com)
2. בחרי את הדומיין `brain2spark.ai`
3. לחצי על **DNS → Records**

---

## שלב 2 — הוספת SPF (אם לא קיים)

SPF מגדיר אילו שרתים מורשים לשלוח אימיילים בשמך.

**הוסיפי רשומת TXT:**

| שדה | ערך |
|-----|-----|
| Type | `TXT` |
| Name | `@` (כלומר brain2spark.ai) |
| Content | `v=spf1 include:_spf.google.com ~all` |
| TTL | Auto |

> **שימי לב:** אם את שולחת אימיילים דרך Gmail / Google Workspace, השתמשי בדוגמה למעלה.  
> אם דרך שירות אחר (SendGrid, Mailchimp, וכו') — שלחי לי ואעדכן את הערך.

---

## שלב 3 — הוספת DMARC (קריטי!)

DMARC מגן מפני זיוף ומגדיר מה לעשות עם אימיילים חשודים.

**הוסיפי רשומת TXT:**

| שדה | ערך |
|-----|-----|
| Type | `TXT` |
| Name | `_dmarc` |
| Content | `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@brain2spark.ai; ruf=mailto:dmarc-reports@brain2spark.ai; fo=1; pct=100` |
| TTL | Auto |

**הסבר הערכים:**
- `p=quarantine` — אימיילים חשודים יישלחו לספאם (לא יחסמו לגמרי בהתחלה)
- `rua=` — כתובת לקבלת דוחות כלליים (שני מידי חודש)
- `pct=100` — הגנה על 100% מהאימיילים

> לאחר שבועיים-שלושה, אפשר לשנות ל-`p=reject` להגנה מקסימלית.

---

## שלב 4 — בדיקת התוצאה

לאחר 10–30 דקות מההוספה, בדקי כאן:  
👉 [https://mxtoolbox.com/dmarc.aspx](https://mxtoolbox.com/dmarc.aspx)  
הכניסי `brain2spark.ai` — אמורה להופיע "DMARC Record Found ✓"

---

## סיכום מהיר

| רשומה | Name | Content |
|-------|------|---------|
| SPF | `@` | `v=spf1 include:_spf.google.com ~all` |
| DMARC | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@brain2spark.ai; fo=1; pct=100` |

---

*הכין עבורך: Claude / Brain Security Audit — 24 מאי 2026*
