const express = require('express')
const {Project} = require('./models')
const multer = require('multer')
require('./database/mongoose')
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to the home page')
})

// CREATE
app.post('/projects', async (req, res) => {
    const project = new Project({
        ...req.body
    })
    try {
        await project.save()
        res.status(201).send(project)
    } catch (error) {
        res.status(400).send(error)
    }
})

// READ
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({})
        res.send(projects)
    } catch (error) {
        res.status(400).send(error)
    }
})

// READ
app.get('/projects/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const project = await Project.findById(_id)
        if (!project) {
            return res.status(404).send("Project not found")
        }
        res.send(project)
    } catch (error) {
        res.status(400).send(error)
    }
})

// UPDATE
app.patch('/projects/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'name']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    try {
        const project = await Project.findOne({_id: req.params.id})

        if (!project) {
            return res.status(404).send('Project not found')
        }

        updates.forEach((update) => project[update] = req.body[update])
        await project.save()
        res.send(project)

    } catch (error) {
        res.status(400).send(error)
    }
})

// DELETE
app.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({_id: req.params.id})

        if (!project) {
            return res.status(404).send('Project not found')
        }
        res.send(project)

    } catch (error) {
        res.status(400).send(error)
    }
})

// upload files
const upload= multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.jpg')){
            return cb(new Error('File must have a .jpg extension'))
        }

        cb(undefined, true)
    }
})

app.post('/projects/:id/upload', upload.single('file'), async (req, res) => {
    const _id = req.params.id
    try {
        const project = await Project.findOne({_id})
        if (!project) {
            return res.status(404).send("Project not found")
        }
        project.images = req.file.buffer
    
        await project.save()
        res.send(project)

    } catch (error) {
        res.status(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// Server listening
app.listen(port, () => {
    console.log("Server up on port", port)
})