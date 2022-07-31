
const { Strategy } = require('passport-local');
const authService = require('../../../../modules/auth/services');

const LocalStrategy = new Strategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await authService.getUser(email, password);
    done(null, { id: user._id.toString(), email: user.email, active: user.active })
  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy