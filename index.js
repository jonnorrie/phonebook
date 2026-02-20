require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
//app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const Person = mongoose.model('Person', personSchema)

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person
    .find({})
    .then(persons => {
    //mongoose.connection.close()
  })
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>Request received at ${new Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(contact => contact.id !== id)
  console.log(contacts)

  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  let newContact = request.body
  newContact.id = String(Math.floor(Math.random() * 100))
<<<<<<< HEAD

  const person = new Person({ // instance of Person "class"
    name: newContact.name,
    number: newContact.number,
    id: newContact.id
  })
  
  person.save().then(result => {
    console.log('New note saved!')
    //mongoose.connection.close()
  })

  response.json(person)
=======
  contacts.push(newContact)
  response.status(204).end()
>>>>>>> 23f6c42567ea3a3bcb1c0cb7ad4c3d3087b5a6ac
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)

})
