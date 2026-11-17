/* The registration form. It collects consent and contact details only (name, phone, and an optional email since
   17.11.2026). There is no way to attach a file here. */
(function (global) {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const C = global.CONSENT;
  const digits = (text) => text.replace(/\D/g, "");
  const validPhone = (text) => /^05\d{8}$/.test(digits(text));
  // Optional (17.11.2026). The same rule as Code.gs; one field, not typed twice.
  const validEmail = (text) => text.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

  function say(text, error) {
    $("status").textContent = text;
    $("status").classList.toggle("error", !!error);
  }

  /* Text with the phrases in CONSENT.links as links. Built from DOM nodes, never as HTML. A new tab keeps the form. */
  function linked(text) {
    return C.pieces(text).map((piece) => {
      if (typeof piece === "string") return piece;
      const a = document.createElement("a");
      a.textContent = piece[0];
      a.href = piece[1];
      a.target = "_blank";
      a.rel = "noopener";
      return a;
    });
  }

  function showNotice() {
    const notice = $("notice");
    const heading = document.createElement("h2");
    heading.textContent = C.title;
    notice.append(heading);
    for (const [title, text] of C.paragraphs) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = `${title}: `;
      p.append(strong, ...linked(text));
      notice.append(p);
    }
    $("consent-data-text").replaceChildren(...linked(C.consentData));
    $("consent-ai-text").textContent = C.consentAi || "";
    $("consent-ai-row").hidden = !C.consentAi;
    $("draft").hidden = !C.version.startsWith("DRAFT");
  }

  /* Every box shown is needed, and none is ticked in advance (נוהל_ציות_משפטי.md, section 2). The AI box shows only
     while consent.js names a provider. */
  function updateButton() {
    $("submit").disabled = !($("consent-data").checked && (!C.consentAi || $("consent-ai").checked));
  }

  function problem() {
    if (!$("name").value.trim()) return "חסר שם.";
    if (!validPhone($("phone").value)) return "מספר הטלפון לא נראה כמו נייד ישראלי.";
    if (digits($("phone").value) !== digits($("phone2").value)) return "שני מספרי הטלפון לא זהים.";
    const email = $("email").value.trim();
    if (email && !validEmail(email)) return "כתובת הדוא\"ל לא נראית תקינה. אפשר גם להשאיר את השדה ריק.";
    return "";
  }

  async function submit() {
    const wrong = problem();
    if (wrong) { say(wrong, true); return; }
    $("submit").disabled = true;
    say("שולחים...");
    try {
      const reply = await global.Api.call("register", {
        name: $("name").value.trim(), phone: digits($("phone").value), email: $("email").value.trim(),
        consentVersion: C.version, consentData: $("consent-data").checked, consentAi: !!C.consentAi && $("consent-ai").checked,
        website: $("website").value,
      });
      if (reply.ok) {
        $("form").hidden = true;
        $("done").hidden = false;
        return;
      }
      say(reply.error === "busy" ? "יש עומס. נסי שוב בעוד כמה דקות." : "הפרטים לא התקבלו. בדקי אותם ונסי שוב.", true);
    } catch (e) {
      say("אין חיבור לשרת. נסי שוב מאוחר יותר.", true);
    }
    updateButton();
  }

  showNotice();
  $("consent-data").addEventListener("change", updateButton);
  $("consent-ai").addEventListener("change", updateButton);
  $("submit").addEventListener("click", submit);
})(window);
