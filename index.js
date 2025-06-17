import express from 'express'
import cors from 'cors'
import { stars } from './constants.js'
import { getList, getClasses, filterByClass, searchById } from './functions.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/stars', (req, res) => {
    res.status(200).json(stars)
})
app.get('/api/names_and_ids', getList)
app.get('/api/classes', getClasses)
app.get('/api/filter_by_class/:classname', filterByClass)
app.get('/api/creature/:id', searchById)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`)
})