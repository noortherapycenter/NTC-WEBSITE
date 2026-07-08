// Server-side password lock for the Noor Therapy Center admin area.
// Runs on Netlify's servers BEFORE any protected page is sent.
// Without the correct username + password the server returns 401 and
// never serves the page — this cannot be bypassed from the browser.

const USERNAME = "noorstaff";
const PASSWORD = "Admission1!";

export default async (request, context) => {
  const auth = request.headers.get("authorization") || "";

  if (auth.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === USERNAME && pass === PASSWORD) {
        return context.next();
      }
    } catch (e) {
      // fall through to the 401 below
    }
  }

  return new Response("Staff access only.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Noor Therapy Center Staff", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
};
