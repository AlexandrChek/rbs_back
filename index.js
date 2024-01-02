import http from 'http'
import {stars} from './constants.js'
import {searchById, getList, getClasses, filterByClass} from './functions.js'

const server = http.createServer((req, res) => {
    const origin = req.headers.origin

    if(req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        })
        res.end()
        return
    }

    if(req.method === 'POST') {
        let request = ''
        req.on('data', chank => request += chank)

        req.on('end', () => {
            let result = ''

            if(request === '/stars') {
                result = JSON.stringify(stars)
            } else if(request === '/search') {
                result = JSON.stringify(getList())
            } else if(request === 'getClasses') {
                result = JSON.stringify(getClasses())
            } else if(request.startsWith('filterByClass')) {
                result = JSON.stringify(filterByClass(request))
            } else {
                result = JSON.stringify(searchById(request))
            }

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin
            })
            res.end(result)
        })
    }
})

server.listen(3000, 'localhost', () => {
    console.log('The server is on')
})