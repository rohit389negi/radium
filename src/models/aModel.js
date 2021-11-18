const mongoose=require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const aSchema= new mongoose.Schema({

    
    author_name: String, 
    age: Number,
    address: String,
    
    
}, {timestamps: true} )


module.exports = mongoose.model( 'myAuthor', aSchema ) 

