import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { navn, email, plan } = body;

  if (!navn || !email || !plan) {
    return new Response(JSON.stringify({ error: "Manglende felter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // E-mail via Resend er deaktiveret — kræver RESEND_API_KEY i .env
  // For at aktivere: uncomment koden nedenfor og tilføj RESEND_API_KEY til .env
  /*
  const { Resend } = await import("resend");
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Tusindfryd <onboarding@resend.dev>",
    to: email,
    subject: `Velkommen som medlem, ${navn.split(" ")[0]}`,
    html: bekraeftelseEmail(navn, email, plan),
  });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  */

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
