/* The deletion and requests page. A case is deleted by its number, which only the teacher's link carries; the key
   after the dot never leaves the browser. A request about registration details waits for the operator, who confirms
   it by email to that address, so a stranger who knows an address can't act on it (by email since 17.11.2026). */
(function (global) {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const C = global.CaseCrypto;

  function say(id, text, error) {
    $(id).textContent = text;
    $(id).classList.toggle("error", !!error);
  }

  const busy = (reply) => reply.error === "busy" ? "יש עומס. נסי שוב בעוד כמה דקות." : "";

  async function deleteCase() {
    const code = C.parseCode($("link").value);
    if (!code) { say("delete-status", "הקישור לא שלם. העתיקי אותו שוב, מההתחלה ועד הסוף.", true); return; }
    $("delete").disabled = true;
    say("delete-status", "מוחקים...");
    try {
      const reply = await global.Api.call("deleteMine", { caseId: code.caseId });
      if (reply.ok) {
        $("link").value = "";
        $("sure").checked = false;
        say("delete-status", "נמחק. התלוש והדוח כבר לא שמורים אצלנו.");
        return;
      }
      say("delete-status", busy(reply) || "המחיקה לא בוצעה. בדקי את הקישור ונסי שוב.", true);
    } catch (e) {
      say("delete-status", "אין חיבור לשרת. נסי שוב מאוחר יותר.", true);
    }
    $("delete").disabled = !$("sure").checked;
  }

  async function sendRequest() {
    const email = $("email").value.trim();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say("request-status", "כתובת הדוא\"ל לא נראית תקינה.", true); return; }
    $("request").disabled = true;
    say("request-status", "שולחים...");
    try {
      const reply = await global.Api.call("request", { type: $("type").value, email, website: $("website").value });
      if (reply.ok) {
        $("email").value = "";
        say("request-status", "הבקשה התקבלה. נשלח לך מייל לכתובת הזו כדי לוודא שהיא ממך.");
        return;
      }
      say("request-status", busy(reply) || "הבקשה לא התקבלה. בדקי את הפרטים ונסי שוב.", true);
    } catch (e) {
      say("request-status", "אין חיבור לשרת. נסי שוב מאוחר יותר.", true);
    } finally {
      $("request").disabled = false;
    }
  }

  /* Opened from the report page, the link arrives after the #, and is moved into the field and out of the address. */
  if (C.parseCode(global.location.hash)) {
    $("link").value = global.location.href;
    global.history.replaceState(null, "", global.location.pathname);
  }
  $("sure").addEventListener("change", () => { $("delete").disabled = !$("sure").checked; });
  $("delete").disabled = !$("sure").checked;  // A browser may restore the tick on Back, without a change event.
  $("delete").addEventListener("click", deleteCase);
  $("request").addEventListener("click", sendRequest);
})(window);
