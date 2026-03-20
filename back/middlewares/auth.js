const Session = require("../models/sessionModel")

// const session = await Session.findOne({ sessionId: req.cookies.session_id })
//     .populate("userId") // joins the User doc if you need it

// if (!session) return res.status(401).json({ error: "Invalid session" })


async function authenticate(req, res, next) {

  // esta seccion valida por medio de la cookie y crsf
  const sessionId = req.cookies?.session_id
  if (sessionId) {
    

    const session = await Session.findOne({ sessionId: req.cookies.session_id })
    if (!session){
       return res.status(401).json({ error: "Invalid session" });
    }
    if (new Date() > new Date(session.expiresAt)) {
      return res.status(401).json({ error: "Session expired" });
    }
    req.user = { userId: session.userId, email: session.email};
    return next();
  }

  return res.status(401).json({ error: "No token provided" });
}

module.exports = {authenticate};