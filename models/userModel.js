import mongoose from 'mongoose'

const trackSchema = mongoose.Schema({
    trackId: {
        type: String,
        required: true
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
    }
})

const userSchema = mongoose.Schema({
    name: { 
            type: String,
            
    },
    email: {
        type: String,

        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    tracks: [trackSchema]
})



userSchema.methods.addTrack = function(newTrack) {
    
    const foundTrack = this.tracks.find(track => track.trackId === newTrack.trackId)
    if(foundTrack === undefined)
        this.tracks.push({
            trackId: newTrack.trackId,
            trackName: newTrack.trackName,
            trackArtist: newTrack.trackArtist,
            albumArtUrl: newTrack.albumArtUrl,
            status: 'pending'
        })
    return this.save()
}

userSchema.methods.acceptTrack = function(trackId) {
    const track = this.tracks.find(track => track.trackId === trackId)
    if(track)
        track.status = 'accepted'

    return this.save()
}

userSchema.methods.rejectTrack = function(trackId) {
    const track = this.tracks.find(track => track.trackId === trackId)
    if(track)
        track.status = 'rejected'

    return this.save()
}

let User
try{
    User = mongoose.model('User')
}catch(error) {
    User = mongoose.model('User', userSchema)
}   

export default User