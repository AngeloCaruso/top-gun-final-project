const { Strategy, ExtractJwt } = require('passport-jwt')
const  config  = require('../../../../config/env')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done)=> {
  console.log(payload)
  return done(null, payload)
})

module.exports = JwtStrategy