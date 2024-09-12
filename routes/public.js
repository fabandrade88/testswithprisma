import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()


//Cadastrar novo usuario

router.post('/cadastrar', async (req, res) => {
    try{
        const user = req.body
        const userDB = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })
        res.status(201).json(userDB)
    } catch (err) { res.status(500).json({message:"Erro no Servidor, tente novamente"})}
})

//Criar Notas

router.post('/notes', async (req, res) => {
    try {
        const notes = req.body
        const notesEmail = "test26@email.com"

        const user = await prisma.user.findUnique({
            where: { email: notesEmail} // Assuming you pass the email as 'login'
        })

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' })
        }
        
        const notesDB = await prisma.note.create({
            data: {
                title: notes.title,
                description: notes.description,
                rating: notes.rating,
                user: { connect: { id: user.id} },
            }
        })

        res.status(201).json(notesDB)
    } catch (err) { 
        console.error(err); // Log the error for debugging
        res.status(500).json({message: "Erro no servidor"})}
    
//comparar usuarios

})


//Criar Tags

export default router