import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
}

export async function sendOrderConfirmation(
  email: string,
  name: string,
  orderId: string,
  total: number
) {
  return getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Pedido confirmado #${orderId.slice(0, 8).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#2D6A2D;padding:32px;text-align:center">
          <h1 style="color:white;margin:0;font-size:28px">Easy Clean</h1>
          <p style="color:#a8d5a2;margin:8px 0 0">Easy Cleaning</p>
        </div>
        <div style="padding:32px">
          <h2 style="color:#1a1a1a">Olá ${name}!</h2>
          <p style="color:#4a4a4a">O teu pedido foi confirmado com sucesso.</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:20px;margin:24px 0">
            <p style="margin:0;color:#4a4a4a">Nº Pedido: <strong>#${orderId.slice(0, 8).toUpperCase()}</strong></p>
            <p style="margin:8px 0 0;color:#4a4a4a">Total: <strong>€${total.toFixed(2)}</strong></p>
          </div>
          <p style="color:#4a4a4a">Iremos contactar-te em breve para confirmar o horário de recolha.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/app/orders/${orderId}"
            style="display:inline-block;background:#2D6A2D;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">
            Ver Pedido
          </a>
        </div>
        <div style="padding:24px;text-align:center;border-top:1px solid #eee">
          <p style="color:#999;font-size:14px;margin:0">© 2025 Easy Clean Luxembourg</p>
        </div>
      </div>
    `,
  });
}

export async function sendPickupReminder(
  email: string,
  name: string,
  pickupTime: string
) {
  return getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Recolha amanhã — Easy Clean",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#2D6A2D;padding:32px;text-align:center">
          <h1 style="color:white;margin:0;font-size:28px">Easy Clean</h1>
        </div>
        <div style="padding:32px">
          <h2>Olá ${name}!</h2>
          <p>A tua roupa será recolhida amanhã entre as <strong>${pickupTime}</strong>.</p>
          <p>Por favor, certifica-te de que a roupa está pronta e acessível.</p>
        </div>
      </div>
    `,
  });
}
