const passport = require('passport')
const JwtStrategy = require('./strategies/jwt')
const LocalStrategy = require('./strategies/local')

passport.use(LocalStrategy)
passport.use(JwtStrategy)