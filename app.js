const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/hospital'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected')
})

app.use(express.json())

const patientRouter = require('./routes/patient')
app.use('/patient', patientRouter)

app.listen(9000, ()=>{
    console.log('server started')
})