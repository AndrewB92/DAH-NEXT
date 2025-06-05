import cookie from 'cookie'

export default function handler(req, res) {
  
  // Set cookie with data
  res.setHeader("Set-Cookie", cookie.serialize("paymentrequest", req.body.paymentData, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/"
  }))

  const response = 'ok'
  
  res.status(200).json(response)
}