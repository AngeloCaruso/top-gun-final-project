const boom = require('@hapi/boom')
const { Strategy } = require('passport-local')
const bcrypt = require('bcrypt')

const usersService = require('../../../../modules/users/services')

const LocalStrategy = new Strategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await usersService.findByEmail(email)
    if (!user) {
      done(boom.unauthorized(), false)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      done(boom.unauthorized(), false)
    }

    done(null, { id: user._id.toString(), email: user.email, active: user.active })
  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy