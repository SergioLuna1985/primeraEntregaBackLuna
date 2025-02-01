import {connect} from 'mongoose'

export const connectDB = async () => {
    try {
        return await connect('mongodb+srv://lunasergio:157Fbl12@cluster0.npdi6.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0')
    /* try {
        return await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) */
    console.log('Database connected')
    } catch (error) {
        console.log('Error connecting to the database', error)
    }
}   