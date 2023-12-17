import fs from 'fs'
const creaturesJson = fs.readFileSync('./creatures.json', 'utf-8')
const creatures = JSON.parse(creaturesJson).creatures

export function getList() {
    let names = []
    creatures.forEach(creature => {
        names.push({
            id: creature.id,
            name: creature.name
        })
    })
    return names
}

export function search(request) {
    const suitable = creatures.find(creature => 
        creature.id === Number(request)
    )
    return suitable
}

export function getClasses() {
    const allClasses = []
    creatures.forEach(creature =>
        allClasses.push(creature.class)    
    )

    const classes = [...new Set(allClasses)]

    return classes
}