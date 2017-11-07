const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const graphQLHTTP = require('express-graphql')
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID

} = require('graphql')

const fakeData = require('./fakeData')

// cors and bodyParser, as usual, for later use
app.use(cors())
app.use(bodyParser.json())

const SchoolType = new GraphQLObjectType({
  name: 'School',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (school) => school.name.toUpperCase()
    },
    accreditation: {type: new GraphQLNonNull(GraphQLString)}
  }
})

//single student
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    score: { type: new GraphQLNonNull(GraphQLInt)},
    parentName: {type: GraphQLString}
  }
})

const appQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    school: {
      type: SchoolType,
      resolve: (root) => new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(fakeData.school);
        }, 2000)
      }),
      // resolve: async (root)=> await setTimeout(() => {return fakeData.school}, 1000)
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve: ()=> fakeData.students
    },
    student: {
      type: StudentType,
      args: {
        id: {name:'id', type: GraphQLInt}
      },
      resolve: (root, args) => new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(fakeData.students.filter(student => student.id === args.id)[0]);
        }, 1000)
      })
    }
  }
})

const StudentInputType = new GraphQLInputObjectType({
  name: 'StudentInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    score: { type: new GraphQLNonNull(GraphQLInt)},
    parentName: {type: GraphQLString}
  }
})

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStudent: {
      type: StudentType,
      args: {
        input: {
          name: 'input',
          type: StudentInputType
        }
      },
      resolve: (obj, args) => {
        const { input } = args
        const newId = Math.max(...fakeData.students.map(student => student.id)) + 1
        const newStudent = {
          id: newId,
          name: input.name,
          age: input.age,
          parentName: input.parentName,
          score: input.score,
        }
        fakeData.students.push(newStudent)
        return newStudent
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query : appQuery,
  mutation : MutationType
})

app.use('/graphql', graphQLHTTP({
  schema: appSchema,
  graphiql: true,
}))

app.get('/', (req, res) => {
  res.send('Welcome!!! use /graphql to visit graphiql :D');
});

app.listen(4000, () => {
  console.log('welcome to the api');
});