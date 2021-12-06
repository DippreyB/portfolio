import mongoose from 'mongoose'

const trackSchema = mongoose.Schema({
    trackId: {
        type: String,
        required: true,
        unique: true,
    },
    trackName: {
        type: String,
        required: true,
    },
    trackArtist: {
        type: String,
        required: true,
    },
    albumArtUrl: {
        type: String,
        required: true,
    },
    status: { 
        type: String,
        enum: ['pending', 'accepted', 'rejected']
    },
    uri: { 
        type: String,
        required: true
    }
})



let Track
try{
    Track = mongoose.model('Track')
}catch(e){
    Track = mongoose.model('Track', trackSchema)
}

export default Track