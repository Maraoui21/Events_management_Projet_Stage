const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {authenticationToken} = require('../middelware/verify')
const bcrypt = require('bcrypt');


// get all users
router.get('/', authenticationToken , async (req,res,next)=>{
    const UncodedUser = req.user;
    Role = UncodedUser && UncodedUser.UserRole;
    if(Role == 'admin'){
        try {
            const users = await prisma.users.findMany({})
            res.send(users)
        } catch (error) {
            next(error)
        }
    }else{
        res.send('YOU ARE NOT ADMIN')
    }
})

// create a user

router.post('/', authenticationToken, async (req,res,next)=>{
    const UncodedUser = req.user;
    Role = UncodedUser && UncodedUser.UserRole;
    if(Role == 'admin'){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        try {
            const user = await prisma.users.create({
                data:{
                    Nom:req.body.Nom,
                    Prenom:req.body.Prenom,
                    Password:hashedPassword
                }
            })
            
            res.send(user)
    
        } catch (error) {
            next(error)
        }
    }else{
        res.send('YOU ARE NOT ADMIN')
    }
})

// delete a user

router.delete('/:id' ,authenticationToken, async (req,res,next)=>{
    const UncodedUser = req.user;
    Role = UncodedUser && UncodedUser.UserRole;
    if(Role == 'admin'){
        const id = req.params.id
    try {
        const user = await prisma.users.delete({
            where:{
                IdUser:Number(id)
            }
        })
        res.send(user)
    } catch (error) {
        next(error)
        }
    }
    else{
        res.send('YOU ARE NOT ADMIN')
    }
})

// update a user 
router.put('/:id',authenticationToken, async (req,res , next)=>{
    const UncodedUser = req.user;
    Role = UncodedUser && UncodedUser.UserRole;
    if(Role == 'admin'){
        const id = req.params.id
    try {
        const user = await prisma.users.update({
            where:{
                IdUser:Number(id)
            },data:req.body
        })
        res.send(user)
    } catch (error) {
        next(error)
    }}else{
        res.send('YOU ARE NOT ADMIN')
    }
})

module.exports = router