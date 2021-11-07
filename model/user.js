const { Schema, model } = require('mongoose')
const gravatar = require('gravatar')
const { UserSubscription } = require('../config/constants')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const SALT_FACTOR = 6

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
    },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+.\S+/
        return re.test(String(value).toLowerCase())
      },
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: [
        UserSubscription.STARTER,
        UserSubscription.PRO,
        UserSubscription.BUSINESS,
      ],
      default: UserSubscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
    isVerified: { type: Boolean, default: false },
    verifyToken: {
      type: String,
      required: true,
      default: crypto.randomUUID(),
    },
  },

  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
