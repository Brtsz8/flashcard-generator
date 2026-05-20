const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../../config/db.js')
const authMiddleware = require('./auth_middleware.js')
//google OAuth2
const { OAuth2Client } = require("google-auth-library")

const router = express.Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.get("/me", authMiddleware, async (req, res) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true
            }
        })

        res.json(user)

    } catch (err) {

        console.log(err.message)

        res.sendStatus(500)
    }
})

//register new user endpoint, /auth/register
router.post('/register', async (req,res) => { 
    const {email,username,password} = req.body

    try {
        //looking for username in database, if found -> cant register
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            //code for "conflict" here meaning username already in use
            return res.status(409).json({
                message: "Username already exists"
            })
        }

        //pass encryption
        const hashedPassword = bcrypt.hashSync(password, 8)

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                authProvider: "LOCAL"
            }
        })

        //sesion token
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})

        //sends token back
        res.status(201).json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)         //server fault 
    }
})


//login an user
router.post('/login', async (req,res) => { 
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {return res.status(404).send({ message : "USER NOT FOUND"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid) {return res.status(401).send({ message : "INVALID PASSWORD"})}

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503) //server fault 
    }
})

//update users username or password 
router.put('/update',  async (req,res) => {
    const { newUsername, newPassword } = req.body

    try{
        const dataUpdate = {}

        if (newUsername) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    username: newUsername
                }
            })

            //test needed - what will happen if we try to change username to the same username
            if (existingUser && existingUser.id !== req.id) {
                return res.status(409).json({
                    message: "Username already exists"
                })
            }

            dataUpdate.username = newUsername
        }
        if( newPassword) dataUpdate.password = bcrypt.hashSync(newPassword, 8)

        //object.keys -> returns array of keys, if empty - no update
        if(Object.keys(dataUpdate).length === 0) {
            return res.status(400).json({message: 'NO UPDATE NEEDED'})
        }   

        //updating if needed
        const updatedUser = await prisma.user.update({
            where: { id: req.userId },
            data: dataUpdate
        })

        res.json({ message: 'User updated successfully', username: updatedUser.username })
    }   catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.delete('/delete', async (req,res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.userId
            }
        })

        res.json({message: 'USER DELETED'})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post("/google", async (req,res) => {
    const { credential } = req.body
    try{
        //google token verification

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        const { email, name, picture, sub} = payload

        //we will look for user, checking if account was alredy registered
        //if that fails we will create account based on data from oauth

        //look for user 
        //using findFist insted of findUnique because findUNique doesn't support OR operator
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { providerId: sub }, //existing google account
                    { email }           //or existing local acoount with same email
                ]
            }
        })

        //if user exists localy
        //but google account is not linked 
        if (user && !user.providerId ) {
            user = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    authProvider: "GOOGLE",
                    providerId: sub,
                    avatar: picture
                }
            })
        }
        //create user if needed, via google
        if(!user){
            user = await prisma.user.create({
                data: {
                    email,
                    username: name,
                    avatar: picture,
                    authProvider: "GOOGLE",
                    providerId: sub
                }
            })
        }

        //return our token (not googles)
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    }catch (err){
        console.error(err)
        res.status(500).json({
            message: "Google Auth Failed"
        })
    }
})

router.post("/facebook", async (req,res) => {
    
    try{
        //todo
    }
    catch (err){
        console.error(err)
        res.status(500).json({
            message: "Google Auth Failed"
        })
    }

})

router.post("/github", async (req,res) => {
    
    try{
        //todo
    }
    catch (err){
        console.error(err)
        res.status(500).json({
            message: "Google Auth Failed"
        })
    }

})

module.exports = router