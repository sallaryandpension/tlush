/* The notice shown before registering. נוהל_ציות_משפטי.md, section 2, adapted to the blanked-file process.
   Final since 17.11.2026: the operator reports the lawyer approved it. A version starting with DRAFT stops a public
   build (tools/build_site.py), and so does any placeholder in [brackets]. A change of wording needs a new version, because the registrants
   sheet records which version each teacher agreed to.

   Every statement must match privacy.html and the code (retention: DEFAULT_DAYS in apps_script/Code.gs).

   AI: no provider is used now, because none has a written undertaking under regulation 3 (מסמך_הגדרות_מאגר.md).
   consentAi is null, so register.js hides the second box and the sheet records "לא". When a provider with a DPA is
   chosen, after a lawyer's approval: replace the AI paragraph with the text below, set consentAi, write a new version,
   and update the providers table in privacy.html. Teachers who registered before that are not sent to AI.
     ["בינה מלאכותית ומידע שיוצא מישראל", "את הקובץ בלי הפרטים המזהים תעבד מערכת בינה מלאכותית של <שם הספק>,
      שפועלת גם מחוץ לישראל, ב<מדינה>. הקובץ עובר אליה בלי שם, בלי מספר זהות ובלי פרטי בנק, ובלי פרטי הרישום.
      <פרטי שמירת המידע אצל הספק, לפי סעיף 3.3>."]
     consentAi: "אני מסכימה שהקובץ יועבר למערכת הבינה המלאכותית, גם מחוץ לישראל, כמתואר למעלה." */
(function (global) {
  "use strict";
  global.CONSENT = {
    /* Final: email first. The email is required and the entry code goes to it; the phone is optional (17.11.2026).
       The operator reports a lawyer approved this text and privacy.html version 2026-11-17-3. Before it: 2026-11-17-2
       (optional email) and 2026-11-17-1, both reported approved. */
    version: "2026-11-17-3",
    /* Phrases shown as links, opening in a new tab so the form keeps what was typed. register.js builds the links. */
    links: [
      ["מדיניות הפרטיות ואבטחת המידע", "privacy.html"],
      ["תנאי השימוש", "terms.html"],
      ["מחיקה ובקשות", "delete.html"],
    ],
    title: "לפני הרישום",
    paragraphs: [
      ["מי אנחנו", "שירות \"בדיקת תלוש למורים\", באחריות שירותי בדיקת תלושים ופנסיה. פניות דרך עמוד \"מחיקה ובקשות\" באתר."],
      ["למי השירות", "לעובדות ועובדי הוראה מגיל 18 ומעלה, שבודקים את התלוש שלהם עצמם."],
      ["מה מבקשים ולמה", "שם וכתובת דוא\"ל, כדי לשלוח לך הודעה מיד אחרי הרישום ואת קוד הכניסה. אם תרצי, גם מספר נייד: כרגע לא נשתמש בו, והוא נשמר רק כדי שנוכל לשלוח לך הודעות בעניין הבדיקה ב-SMS, אם נפעיל אפשרות כזו. אחר כך קובץ תלוש שהדפדפן שלך הסיר ממנו את הפרטים המזהים, כדי לבדוק אותו ולהכין עבורך דוח. לא נשתמש בהם לשום מטרה אחרת. אין כאן שדה להעלאת תלוש מקורי, ולא שולחים אלינו תלושים בשום דרך אחרת."],
      ["זו בחירה שלך", "אין חובה חוקית למסור את הפרטים או את הקובץ. בלי הסכמה לא נוכל לבצע את הבדיקה."],
      ["איפה נשמרים פרטי הרישום", "שם, דוא\"ל וטלפון (אם מסרת) נשמרים בחשבון Google של מפעיל השירות, ובשרתים של Google, גם מחוץ לישראל. הקובץ עצמו נשמר שם רק מוצפן, ו-Google לא יכולה לקרוא אותו. קוד הכניסה נשלח אלייך במייל מחשבון ה-Gmail של השירות."],
      ["מה נשאר בקובץ", "הקובץ נשלח בלי שם, בלי מספר זהות, בלי כתובת ובלי פרטי בנק, אבל הסכומים נשארים בו, כי צריך אותם לבדיקה. לכן אי אפשר להבטיח אנונימיות מלאה."],
      ["מי בודק", "מפעיל השירות בודק את הקובץ וקורא כל דוח לפני שהוא נמסר לך. כרגע הקובץ לא מועבר למערכת בינה מלאכותית. אם זה ישתנה, נבקש ממך אישור נפרד לפני כן."],
      ["למי עוד יימסר המידע", "לאף אחד, אלא אם תבקשי זאת או שהחוק מחייב זאת."],
      ["כמה זמן נשמור", "את הקובץ נמחק 90 ימים מיום השליחה. את הדוח נשמור 90 ימים מיום העלאתו. את פרטי הרישום נשמור 365 ימים מיום הרישום. אפשר לבקש מחיקה מוקדמת. הפירוט ב\"מדיניות הפרטיות ואבטחת המידע\"."],
      ["אבטחת המידע", "הקובץ מוצפן בדפדפן שלך לפני השליחה, והמפתח לפתיחתו נמצא רק במחשב של מפעיל השירות. קוד הכניסה נשמר רק בגיבוב. אין באתר עוגיות, אנליטיקה או סקריפטים של צד שלישי. הפירוט ב\"מדיניות הפרטיות ואבטחת המידע\"."],
      ["הזכויות שלך", "לעיין במידע שאנחנו מחזיקים עלייך, לבקש לתקן או למחוק אותו, ולחזור בך מההסכמה בכל שלב, בעמוד \"מחיקה ובקשות\". את התלוש והדוח אפשר למחוק שם בעצמך, מיד, בעזרת קישור הדוח. חזרה מהסכמה לא משפיעה על מה שכבר עובד."],
      ["מה השירות הזה ומה הוא לא", "השירות משווה מסמכים לטבלאות, להסכמים ולחוזרים, ומחשב פערים. הוא לא ייעוץ משפטי ולא ייעוץ פנסיוני, הוא לא מייצג אותך, והוא לא פונה לאף גורם בשמך. הבדיקה עלולה לטעות ולפספס דברים. הדוח לא מחליף התייעצות עם ארגון המורים או עם עורך דין. התנאים המלאים ב\"תנאי השימוש\"."],
    ],
    consentData: "אני בן/בת 18 ומעלה, קראתי את מדיניות הפרטיות ואבטחת המידע ואת תנאי השימוש, ואני מסכים/ה לעיבוד הפרטים והקובץ למטרה הזו.",
    consentAi: null,
  };

  /* Splits a text into plain strings and [phrase, href] pairs, for every phrase in CONSENT.links. */
  global.CONSENT.pieces = function (text) {
    const out = [];
    let rest = String(text || "");
    while (rest) {
      let best = null;
      for (const [phrase, href] of global.CONSENT.links) {
        const at = rest.indexOf(phrase);
        if (at >= 0 && (!best || at < best.at)) best = { at, phrase, href };
      }
      if (!best) { out.push(rest); break; }
      if (best.at) out.push(rest.slice(0, best.at));
      out.push([best.phrase, best.href]);
      rest = rest.slice(best.at + best.phrase.length);
    }
    return out;
  };
})(window);
