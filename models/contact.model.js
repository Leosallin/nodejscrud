const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    phone: {
      type: Number,
      require: true,
    },
    
    email: {
      type: String,
      require: false,
    }
  },
  {
    timestamps: true,
  }
);

const contact = mongoose.model('contact', contactSchema);
module.exports = contact;
