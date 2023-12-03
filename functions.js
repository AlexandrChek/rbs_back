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
    names.sort()
    return names
}

export function search(request) {
    const suitable = creatures.find(item => 
        item.id === Number(request)
    )
    return suitable
}