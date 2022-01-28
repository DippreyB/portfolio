import mongoose from 'mongoose'

const interactionSchema = mongoose.Schema({
    userName: {
        type: String,

    },
    email: {
        type: String
    }

},{
    timestamps: true,
})

let Interaction
try{
    Interaction = mongoose.model('Interaction')
}catch(error) {
    Interaction = mongoose.model('Interaction', interactionSchema)
}   

export default Interaction