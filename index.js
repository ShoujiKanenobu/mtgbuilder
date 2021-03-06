const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000
const mtg = require('mtgsdk')
const handler = require('./deckHandler')
const db = require('./db')
const bodyParser = require("body-parser")

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.post('/updateDeck', handler.handleList)
app.post('/priceCheck', handler.searchPrice)
app.post('/saveDeck', db.saveDeck)
app.post('/loadDeck', db.loadDeck)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));