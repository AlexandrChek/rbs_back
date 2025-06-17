import express from 'express'
import cors from 'cors'
import { stars } from './constants.js'
import creatures from './creatures.js'
import { getList, getClasses, filterByClass, searchById } from './functions.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/stars', (req, res) => {
    res.status(200).json(stars)
})
app.get('/api/names_and_ids', (req, res) => getList(res, creatures))
app.get('/api/classes', (req, res) => getClasses(res, creatures))
app.get('/api/filter_by_class/:classname', (req, res) => filterByClass(req, res, creatures))
app.get('/api/creature/:id', (req, res) => searchById(req, res, creatures))

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`)
})