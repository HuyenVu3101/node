const mongoose = require('mongoose')

const connect = async() => {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect('mongodb://127.0.0.1:27017/shopping-cart_dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true })
      console.log('Connect Successfully!!!')
    } catch (e) {
      console.log('Connect Failure!!!')
    }
}

module.exports =  { connect }
