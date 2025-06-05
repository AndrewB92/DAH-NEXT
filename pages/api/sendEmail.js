import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { to, subject, html } = req.body; // Email parameters from frontend

      const data = await resend.emails.send({
        from: 'Your Name <you@yourdomain.com>', // Verify this domain in Resend
        to, 
        subject,
        html, // Email content
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}