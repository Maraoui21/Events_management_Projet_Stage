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
        res.send({rep:'Posté avec succès',ev:event});
    } catch (error) {
        next(error)
    }
})


// get all events

router.get('/evenments', async (req, res , next) => {
    try {
        const events = await prisma.Evenements.findMany({})   
        res.send(events);
    }catch (error) {
        next(error)
    }    
});

// get unique article with id

router.get('/evenments/:id',async (req,res,next)=>{
    try {
        const id = req.params.id
        const event = await prisma.Evenements.findUnique({
            where:
            {
                IdEv:Number(id)
            }
        })
        res.send(event)

    } catch (error) {
        next(error)
    }
})




// delete an existant event

router.delete('/evenments/:id', authenticationToken , async (req, res,next)=>{
    const evenetID = req.params.id;
    try {
            const ToDeleteEVent = await prisma.Evenements.delete({
                where:{IdEv:Number(evenetID)}
            })

            res.send({rep:"L'événement est supprimé"})
        
    } catch (error) {
        // next(error)
        res.send({err:'ce événement contient des participants'});
    }
})

// update an event

router.put('/evenments/:id', authenticationToken , async ( req,res )=>{
    const toUpdateID = req.params.id;
    try {
        const toUpdateEVent = await prisma.Evenements.update({
            where:{IdEv:Number(toUpdateID)},
            data:
            { 
                Titre:req.body.Titre,
                ImgPath:req.body.ImgPath,
                Date:req.body.Date,
                Contenu:req.body.Contenu,
                Form:Boolean(Number(req.body.Form)) 
            }
        })
        res.send({rep:"L'événement est modifié"})
    } catch (error) {
        next(error)
        res.send({err:'erreur de modification'})
    }
})  


module.exports = router;


