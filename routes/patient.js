const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')

router.get('/', async(req, res)=> {
    try{
        const findPatients = await Patient.find()
        res.json(findPatients)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.get('/:id', async(req, res)=> {
    try{
        const findPatient = await Patient.findById(req.params.id)
        res.json(findPatient)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.post('/', async(req, res)=>{

        const patient = new Patient({
            patientId: req.body.patientId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            email: req.body.email,
            dob: req.body.dob,
            phoneNumber: req.body.phoneNumber
        })
    try{
        const postPatient = await patient.save()
        res.json(postPatient)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.patch('/:id', async (req, res) => {
    try{
        const updatePatient = await Patient.findById(req.params.id)
        updatePatient.phoneNumber = req.body.phoneNumber
        const updateResponse = await updatePatient.save()
        res.json(updateResponse)
    }catch(err){
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const deletedPatient = await Patient.remove({_id: req.params.id})
        res.json(deletedPatient)
    }catch(err){
        res.send('Error' + err)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const updatePatient = await Patient.findById(req.params.id)
        const patient = new Patient({
            id: req.params.id,
            patientId: req.body.patientId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            email: req.body.email,
            dob: req.body.dob,
            phoneNumber: req.body.phoneNumber
        })
        Patient.updateOne({ id: req.params.id }, req.body).then(result => {
            res.json({ message: "Update successful!" });
          });
        //res.json(updateResponse)
    } catch(err){
        res.send('Error' + err).status(500)
    }
})


module.exports = router