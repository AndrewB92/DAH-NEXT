import cookie from 'cookie'

/* This stops the 'API resolved without sending a response...' error */
export const config = {
    api: {
      externalResolver: true,
    },

}

export default async (req, res) => {
  
  res.setHeader("Set-Cookie", cookie.serialize("testy", 'adffdafadf', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/"
  }))

  const returnObject = {
    token: 'kdkdkkdkdk',
    message: 'Success - from local test'
  }
  
  res.statusCode = 200;
  res.json(returnObject)

}