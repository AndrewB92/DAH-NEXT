// pages/api/login.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Hardcoded credentials for simplicity
    if (username === 'dahtester' && password === 'egestas2024') {
      // Set session cookie with expiration (1 hour)
      const maxAge = 60 * 60; // 1 hour in seconds
      const cookie = serialize('auth', 'authenticated', {
        httpOnly: true, // Secure from JavaScript access
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        sameSite: 'strict',
        maxAge, // Cookie expires after 1 hour
        path: '/', // Cookie accessible on the entire site
      });

      res.setHeader('Set-Cookie', cookie);
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}