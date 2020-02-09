const bodyParser = require('body-parser')
const app = require('express')()

const sse = require('./sse-io')

app.use(bodyParser.json())

app.get('/stream/:id', (req, res) => {
    sse.stream(req.params.id,res)
});


app.get('/push', (req, res) => {
    sse.push(req.body.id,req.body.content)
    res.json({})
});

app.listen(2000)