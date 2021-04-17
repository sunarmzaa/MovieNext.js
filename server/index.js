const next = require('next')
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const filePath = './data.json'

const fs = require('fs')
const moviesData = require(filePath)

var cors = require('cors')

app.prepare().then(() => {

    const server = express();
    //user
    server.use(cors())
    server.use(bodyParser.json())
    // we are handling all of the request comming to our server

    server.get('/api/v1/movies', (req, res) => {
        return res.json(moviesData)
    })

    server.get('/api/v1/movies/:id', (req, res) => {
        const { id } = req.params

        const movieIndex = moviesData.findIndex(m => m.id === id)
        const movie = moviesData[movieIndex]

        return res.json(movie)
    })

    server.post('/api/v1/movies', (req, res) => {
        const movie = req.body
        moviesData.push(movie)

        const pathToFile = path.join(__dirname, filePath)
        const stringifiedData = JSON.stringify(moviesData, null, 2)

        fs.writeFile(pathToFile, stringifiedData, (err) => {
            if (err) {
                return res.status(422).send(err)
            }
            return res.json('Movie has been sucesssfully added')
        })

        // return res.json({ ...movie, createdTime: 'today' })
    })

    server.delete('/api/v1/movies/:id', (req, res) => {
        const { id } = req.params
        const movieIndex = moviesData.findIndex(m => m.id === id)
        moviesData.splice(movieIndex, 1)

        const pathToFile = path.join(__dirname, filePath)
        const stringifiedData = JSON.stringify(moviesData, null, 2)

        fs.writeFile(pathToFile, stringifiedData, (err) => {
            if (err) {
                return res.status(422).send(err)
            }
            return res.json('Movie has been sucesssfully added')
        })
    })

    server.patch('/api/v1/movies/:id', (req, res) => {
        const { id } = req.params
        const movie = req.body
        const movieIndex = moviesData.findIndex(m => m.id === id)

        moviesData[movieIndex] = movie

        const pathToFile = path.join(__dirname, filePath)
        const stringifiedData = JSON.stringify(moviesData, null, 2)
        fs.writeFile(pathToFile, stringifiedData, (err) => {
            if (err) {
                return res.status(422).send(err)
            }
            return res.json(movie)
        })
    })

    // server.get('*', (req, res) => {
    //     // next.js is handling requests and providing pages where we are navigating to
    //     return handle(req, res)
    //     //return res.json({ message: 'Hello Friends' })
    // })

    // server.post('*', (req, res) => {
    //     // next.js is handling requests and providing pages where we are navigating to
    //     return handle(req, res)
    //     //return res.json({ message: 'Hello Friends' })
    // })

    const PORT = process.env.PORT || 3000;

    server.use(handle).listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on port ' + PORT)
    })
})