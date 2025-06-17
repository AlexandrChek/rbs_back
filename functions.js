export function getList(res, creatures) {
    let names = []
    creatures.forEach(creature => {
        const { id, name } = creature
        names.push({id, name})
    })
    
    res.status(200).json(names)
}

export function getClasses(res, creatures) {
    let allClasses = []
    creatures.forEach(creature =>
        allClasses.push(creature.class)    
    )

    const classes = [...new Set(allClasses)]

    res.status(200).json(classes)
}

export function filterByClass(req, res, creatures) {
    const {classname} = req.params
    const suitables = creatures.filter(creature => creature.class === classname)
    
    res.status(200).json(suitables)
}

export function searchById(req, res, creatures) {
    const {id} = req.params
    const requiredItem = creatures.find(creature => creature.id === Number(id))
    
    res.status(200).json(requiredItem)
}