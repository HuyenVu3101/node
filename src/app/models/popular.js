const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const popular = new Schema(
    {
      id: String,
      itemImg: String,
      itemTitle: { type: String, required: true },
      itemId: Number,
      itemPrice: String,
      currency: String,
      videoId: String,
      slug: { type:String, slug: 'id', unique: true }
    }, {
      timestamps: true
    }
);

module.exports = mongoose.model('popular', popular)