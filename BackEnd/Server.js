// stop 2:56m
const app = require('./app')

const dotenv =require( 'dotenv')
const connectDatabase =require( './config/database')
const cloudinary =require( 'cloudinary')


// Handling Uncaught Excaption 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to Uncaught Excaption`)
    process.exit(1)
})


// config
dotenv.config({path:"Backend/config/config.env"}) // to show PORT that in config.env file

// connecting to db
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key:  process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
})

const PORT = process.env.PORT || 4001
app.listen(PORT,() => {
    console.log(`server is working on port ${PORT}`)
})


// Unhandled Promise Rejection 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to unhandled Promise Rejection`)
    server.close(() => {
        process.exit(1)
    })
})