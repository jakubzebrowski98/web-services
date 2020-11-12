const yup = require('yup')
const express = require('express')
const helmet = require("helmet")
const app = express()
const port = 3000 
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/soap', function (req, res) {
    res.send('Got a POST request. This is Soap')
})
app.get('/rest', function (req, res) {
    res.send('Got a POST request. This is rest')
})
app.get('/info', function (req, res) {
    var author = require('../package.json')
    res.json({'author':author.author})
    res.status(200)
})

app.get('/hello/:name', (req, res) => {
    var name = req.params.name
    var schema = yup.string().max(10).matches(/^[a-zA-Z]+$/).required()

    if(schema.isValidSync(name)){
        res.status(200)
        res.send('heelooo ' + name)
    }else{
        res.status(400)
        res.send('asdsadasd')
    }
})

let tab = [];
app.post('/store', (req, res) => {
    tab.push(req.body.input)
    res.status(201)
    res.json({
        stored_data: tab
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})