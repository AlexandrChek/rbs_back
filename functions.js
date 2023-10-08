import fs from 'fs'
import {stars} from './constants.js'
const creaturesJson = fs.readFileSync('./creatures.json', 'utf-8')
const creatures = JSON.parse(creaturesJson).creatures

export function getStars() {
    let result = []
    stars.forEach(star => {
        let starItem = creatures.filter(creature => creature.name == star)
        result.push(starItem[0])
    })
    return result
}

export function search(request) {
    let suitables = creatures.filter(creature => {
        creature.name.toLowerCase().includes(request.toLowerCase())
    })

    if(request.trim().includes(' ')) {
        let suitableNames = []

        if(suitables.length) {
            suitables.forEach(creature => {
                suitableNames.push(creature.name.toLowerCase())
            })
        }

        const words = request.trim().replaceAll(',', '').toLowerCase().split(' ')
        words.forEach(word => {
            let partlySuitable = creatures.filter(creature => {
                creature.name.toLowerCase().includes(word) && !suitableNames.includes(creature.name.toLowerCase())
            })

            if(partlySuitable.length) {
                partlySuitable.forEach(creature => {
                    suitableNames.push(creature.name.toLowerCase())
                })
                suitables = [...suitables, ...partlySuitable]
            }
        })
    }

    return suitables
}