const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {authenticationToken} = require('../middelware/verify');


// create an event

router.post('/evenments', authenticationToken, async (req,res,next)=>{
    try {
        const event = await prisma.Evenements.create({
            data:
            { 
                Titre:req.body.Titre,
                ImgPath:req.body.ImgPath,
                Date:req.body.Date,
                Contenu:req.body.Contenu,
                Form:Boolean(Number(req.body.Form)) 
            }
        })
        res.send({rep:'Posté avec succès'})
    } catch (error) {
        next(error)
    }
})


// get all events

router.get('/evenments', async (req, res) => {
    try {
        const events = await prisma.Evenements.findMany({})   
        res.send(events);
    }catch (error) {
        res.send(error)
    }    
});



// delete an existant event

router.delete('/evenments/:id', authenticationToken , async (req, res,next)=>{
    const evenetID = req.params.id;
    try {
        const ToDeleteEVent = await prisma.Evenements.delete({
            where:{IdEv:Number(evenetID)}
        })
            res.send('evenet is deleted');
        
    } catch (error) {
        next(error)
    }
})

// update an event

router.put('/evenments/:id', authenticationToken , async ( req,res )=>{
    const toUpdateID = req.params.id;
    try {
        const toUpdateEVent = await prisma.Evenements.update({
            where:{IdEv:toUpdateID},
            data:req.body
        })
    } catch (error) {
        next(error)
    }
})  


module.exports = router;


