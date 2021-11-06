const { Schema, model, SchemaTypes } = require('mongoose')
const { ValidInfoContact } = require('../config/constants')
const mongoosePaginate = require('mongoose-paginate-v2')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    phone: {
      type: String,
      min: ValidInfoContact.MIN,
      max: ValidInfoContact.MAX,
      required: [true, 'Set phone for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
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

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = Contact
