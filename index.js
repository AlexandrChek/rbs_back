import http from 'http'
import {getStars, search, getList} from './functions.js'

const server = http.createServer((req, res) => {
    const origin = 'http://localhost:8080'
    //'https://alexandrchek.github.io' - github account

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
                result = JSON.stringify(getStars())
            } else if(request === '/search') {
                result = JSON.stringify(getList())
            } else {
                result = JSON.stringify(search(request))
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