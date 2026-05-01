import { Resend } from 'resend';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  let body;

  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, message: 'Invalid JSON' });
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!emailPattern.test(email)) {
    return res.status(400).json({ ok: false, message: 'Invalid email' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ ok: false, message: 'Missing email configuration' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Bastion <onboarding@resend.dev>',
      to: 'aaalex.johansson@gmail.com',
      subject: 'Ny intresseanmälan från Bastion.se',
      text: `En person har anmält intresse för att få veta mer om Bastion framöver.\n\nIfylld e-postadress: ${email}`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Unable to send email' });
  }
}
