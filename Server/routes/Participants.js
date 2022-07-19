const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {authenticationToken} = require('../middelware/verify');


// add a Participant 

router.post('/Participants', async (req, res, next) => {
  try {
      const Participant = await prisma.Participants.create({
        data:{
          Nom:req.body.Nom,
          Prenom:req.body.Prenom,
          EvenementID:Number(req.body.EvenementID)
        }
      })
    res.send(Participant);
    }catch(error) {
      next(error)
    }
});

// get all participants

router.get('/Participants', authenticationToken , async (req, res,next)=>{
    try {
        const allParticipants = await prisma.Participants.findMany({});
        res.send(allParticipants)
    } catch (error) {
      next(error)
    }
})


// get all participant of an event 

router.get('/Participants/:id', authenticationToken , async (req,res,next)=>{
  try {
    const eventID = Number(req.params.id);
    const eventParticipants = await prisma.participants.findMany({
        where:{
          EvenementID:eventID
        }
    })
    res.send(eventParticipants)
  } catch (error) {
    next(error)
  }
})



// update a participant

router.put('/Participants/:id', authenticationToken , async (req,res,next)=>{
  try {
    const id = req.params.id
    const updatedParticipant = await prisma.Participants.update({
      where:{IdPart:Number(id)},
      data:{
        Nom:req.body.Nom,
        Prenom:req.body.Prenom,
        EvenementID:Number(req.body.EvenementID)
      }
    })
    res.send(updatedParticipant);
  } catch (error) {
    next(error)
  }
})



// delete a participant 

router.delete('/Participants/:id', authenticationToken , async ( res, req )=>{
      const id = req.params.id;
      try {
          const deletedParticipant = await prisma.Participants.delete({
          where:{IdPart:Number(id)}
        })
        res.send(deletedParticipant);
      }catch (error) {
      next(error)
    }
})



module.exports = router;
