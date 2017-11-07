const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const graphQLHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const fakeData = require('./fakeData')

// cors and bodyParser, as usual, for later use
app.use(cors())
app.use(bodyParser.json())

const appSchema = buildSchema(`
  type School {
    name: String!
    accreditation: String
  }

  type Student {
    id: ID!
    name: String!
    age: Int!
    parentName: String
  }

  type Query {
    school: School
    students: [Student]
    failingStudents: [Student]
    passingStudents: [Student]
  }

  input NewStudentInput {
    name: String!
    age: Int!
    score: Int!
    parentName: String
  }

  type Mutation {
    createStudent(input: NewStudentInput): Student
  }
`)

//object where data resolve
const rootData = {
  school: fakeData.school,
  students: fakeData.students,
  failingStudents: fakeData.students.filter(student => student.score < 80),
  passingStudents: fakeData.students.filter(student => student.score >= 80),
  createStudent: ({input}) => {
    const newId = Math.max(...fakeData.students.map(student => student.id)+1)
    const newStudent = {
      id: newId,
      name: input.name,
      age: input.age,
      parentName: input.parentName || 'anak sebatang kara',
      score: input.score || 0
    }
    fakeData.students.push(newStudent)

    return newStudent
  }
}

app.use('/graphql', graphQLHTTP({
  schema: appSchema,
  rootValue: rootData,
  graphiql: true,
}))

app.get('/', (req, res) => {
  res.send('Welcome!!! use /graphql to visit graphiql :D');
});

app.listen(4000, () => {
  console.log('welcome to the api');
});