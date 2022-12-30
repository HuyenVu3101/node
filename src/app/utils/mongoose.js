module.exports = {
  multipleObject: (mongooses) => mongooses.map(mongoose => mongoose.toObject()),
  simpleObject: (mongoose) => mongoose ? mongoose.toObject() : mongoose
}