import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

function bekraeftelseEmail(navn: string, email: string, plan: string): string {
  const planLabel =
    plan === "yearly" ? "Årlig – 279 DKK / år" : "Månedlig – 29 DKK / md";
  const fornavn = navn.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="da">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f2f2f0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">

          <!-- Header -->
          <tr>
            <td style="background:#000000;padding:24px 32px;">
              <p style="margin:0;color:#ffffff;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Tusindfryd</p>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:48px 32px 32px;">
              <h1 style="margin:0 0 12px;font-size:36px;font-weight:500;color:#000000;line-height:1.1;">Velkommen,<br>${fornavn}.</h1>
              <p style="margin:0;font-size:14px;color:#666666;line-height:1.6;">
                Dit medlemsskab er nu aktivt. Vi er glade for at have dig med.
              </p>
            </td>
          </tr>

          <!-- Fordele -->
          <tr>
            <td style="padding:0 32px 32px;">
              <p style="margin:0 0 16px;font-size:11px;color:#999999;letter-spacing:0.12em;text-transform:uppercase;">Dine fordele</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeeeee;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:13px;color:#000000;">— 10% rabat på alle ordrer</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:13px;color:#000000;">— Gratis standardlevering</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:13px;color:#000000;">— Tidlig adgang til nye drops</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:13px;color:#000000;">— Eksklusive tilbud og events i showroomet</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:13px;color:#000000;">— Prioriteret adgang til begrænsede fund</td></tr>
              </table>
            </td>
          </tr>

          <!-- Abonnement -->
          <tr>
            <td style="padding:0 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:16px 20px;">
                <tr>
                  <td style="font-size:11px;color:#999999;letter-spacing:0.12em;text-transform:uppercase;">Dit abonnement</td>
                  <td align="right" style="font-size:13px;color:#000000;">${planLabel}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:6px;font-size:11px;color:#bbbbbb;">Fornyes automatisk — opsiges til enhver tid</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 48px;">
              <a href="https://tusindfryd.io" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;padding:16px 32px;font-size:13px;letter-spacing:0.05em;">
                Gå til shoppen →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:11px;color:#bbbbbb;line-height:1.6;">
                Tusindfryd · Trindsøvej 10 · 8000 Aarhus C<br>
                Spørgsmål? Skriv til <a href="mailto:info@tusindfryd.io" style="color:#bbbbbb;">info@tusindfryd.io</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { navn, email, plan } = body;

  console.log("📧 Modtaget:", { navn, email, plan });

  if (!navn || !email || !plan) {
    return new Response(JSON.stringify({ error: "Manglende felter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await resend.emails.send({
    from: "Tusindfryd <onboarding@resend.dev>",
    to: email,
    subject: `Velkommen som medlem, ${navn.split(" ")[0]}`,
    html: bekraeftelseEmail(navn, email, plan),
  });

  console.log("📬 Resend svar:", { data, error });

  if (error) {
    console.error("❌ Resend fejl:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
