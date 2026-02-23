require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = (error, request, repsonse, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan('tiny'));
//app.use(cors());
app.use(errorHandler);

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})


app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>Request received at ${new Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  let newContact = request.body
  newContact.id = String(Math.floor(Math.random() * 100))

  const person = new Person({ // instance of Person "class"
    name: newContact.name,
    number: newContact.number,
    id: newContact.id
  })
  
  person.save().then(result => {
    console.log('New person saved!')
    response.json(result)
  })
  .catch(error => next(error))

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)

})
