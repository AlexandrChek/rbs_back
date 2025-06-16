import fs from 'fs'
const creaturesJson = fs.readFileSync('./creatures.json', 'utf-8')
const creatures = JSON.parse(creaturesJson).creatures

export function getList(req, res) {
    let names = []
    creatures.forEach(creature => {
        const { id, name } = creature
        names.push({id, name})
    })
    
    res.status(200).json(names)
}

export function getClasses(req, res) {
    let allClasses = []
    creatures.forEach(creature =>
        allClasses.push(creature.class)    
    )

    const classes = [...new Set(allClasses)]

    res.status(200).json(classes)
}

export function filterByClass(req, res) {
    const {classname} = req.params
    const suitables = creatures.filter(creature => creature.class === classname)
    
    res.status(200).json(suitables)
}

export function searchById(req, res) {
    const {id} = req.params
    const requiredItem = creatures.find(creature => creature.id === Number(id))
    
    res.status(200).json(requiredItem)
}