const Session = require("../models/sessionModel")
// funcion de autenticacion a travez de cookies
async function authenticate(req, res, next) {

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