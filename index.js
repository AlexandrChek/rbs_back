import http from 'http'
import {getStars, search} from './functions.js'

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

    if(req.method === 'GET') {
        const result = JSON.stringify(getStars())
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin
        })
        res.end(result)
    }

    if(req.method === 'POST') {
        let request = ''
        req.on('data', chank => request += chank)
        req.on('end', () => {
            const result = JSON.stringify(search(request))
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