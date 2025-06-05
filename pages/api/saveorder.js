import cookie from 'cookie'

export default function handler(req, res) {
  res.setHeader("Set-Cookie", cookie.serialize("order", req.body.order, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/"
  }))
  res.statusCode = 200;
  res.json({ success: true })
}