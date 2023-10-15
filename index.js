import http from 'http'
import {getStars, search, getList} from './functions.js'

const server = http.createServer((req, res) => {
    const origin = 'http://localhost:8080'
    //'https://alexandrchek.github.io' - github account

    const myHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin
    }

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
        let result = ''
        if(req.url === '/stars') {
            result = JSON.stringify(getStars())
        }
        if(req.url === '/search') {
            result = JSON.stringify(getList())
        }
        res.writeHead(200, myHeaders)
        res.end(result)
    }

    if(req.method === 'POST') {
        let request = ''
        req.on('data', chank => request += chank)
        req.on('end', () => {
            const result = JSON.stringify(search(request))
            res.writeHead(200, myHeaders)
            res.end(result)
        })
    }
})

server.listen(3000, 'localhost', () => {
    console.log('The server is on')
})