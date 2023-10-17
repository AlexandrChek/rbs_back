import fs from 'fs'
import {stars} from './constants.js'
const creaturesJson = fs.readFileSync('./creatures.json', 'utf-8')
const creatures = JSON.parse(creaturesJson).creatures

export function getStars() {
    let result = []
    stars.forEach(star => {
        let starItem = creatures.find(item => item.id === star.id)
        starItem.cover = star.cover
        result.push(starItem)
    })
    return result
}

export function search(request) {
    const suitable = creatures.find(item => 
        item.name.toLowerCase() === request.toLowerCase()
    )
    return suitable
}

export function getList() {
    let names = []
    creatures.forEach(creature => {
        names.push(creature.name)
    })
    names.sort()
    return names
}