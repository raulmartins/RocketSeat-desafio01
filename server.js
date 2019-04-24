const express = require('express')
const nunjuscks = require('nunjucks')
const app = express()

nunjuscks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  res.render('form')
})

const middllewareCheck = (req, res, next) => {
  const { age } = req.query
  return age ? next() : res.redirect('/')
}

app.post('/check', (req, res) => {
  const { age } = req.body
  age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})

app.get('/major', middllewareCheck, (req, res) => {
  res.send(`Você é maior de idade e possui ${req.query.age} anos`)
})

app.get('/minor', middllewareCheck, (req, res) => {
  res.send(`Você é menor de idade e possui ${req.query.age} anos`)
})

app.listen(3000)
