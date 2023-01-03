const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const popularSchema = new Schema(
    {
      _id: Number,
      name: String,
      itemImg: String,
      itemTitle: { type: String, required: true },
      itemId: Number,
      itemPrice: String,
      currency: String,
      videoId: String,
      slug: { type: String, slug: 'name', unique: true },
      deletedAt: Date,
      deleted: Boolean
    }, {
      _id: false,
      timestamps: true
    }
);

popularSchema.plugin(AutoIncrement)

// Custom query helper
popularSchema.query.sortable = function(req){
  const isValidType = ['asc', 'desc'].includes(req.query.type)
  if(req.query.hasOwnProperty('_sort')) {
    return this.sort({ [req.query.column] : isValidType ? req.query.type : 'desc'})
  }
  return this
}

mongoose.plugin(slug)
popularSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, deleted : true  })

module.exports = mongoose.model('popular', popularSchema)