import { api } from '../config'
import axios from 'axios'
import { request, GraphQLClient } from 'graphql-request'

const isCheck = (status) =>{
  console.log(status);
  return{
    type: 'isCheck',
    payload: status
  }
}

const getRooms = () =>{
let query = `events(approved:1, tipe:"meetup"){name, location{name},tipe, approved}`
  return(dispatch)=>{
    let client = new GraphQLClient(api, { headers: {} })
    client.request(query,).then(data =>{
      console.log(data);
      dispatch({
        type: "Rooms",
        payload: data
      })
    }
    )
  }
}

const gameList = () =>{
  let query = `events(approved:1, tipe:"hackathon"){name, location{name},tipe, approved}`
  return(dispatch)=>{
    let client = new GraphQLClient(api, { headers: {} })
    client.request(query,).then(data =>{
      console.log(data);
      dispatch({
        type: "Games",
        payload: data
      })
    }
    )
  }
}

const getOneData = (data) =>{
  return{
    type: 'OneData',
    payload: data
  }
}

const isActivity = (status) =>{
  return{
    type: 'isActivity',
    payload: status
  }
}

const isKomsel = (status) =>{
  return{
    type: 'isKomsel',
    payload: status
  }
}

const redirect = (lat,lng) =>{
  let coordinates = {}
  coordinates.lat = lat
  coordinates.lng = lng
  return{
    type: 'Redirect',
    payload: coordinates
  }
}

const getRepos = (username) =>{
  return(dispatch)=>{
    axios.get(`https://api.github.com/users/${username}/repos?sort=created`)
    .then(res=>{
      dispatch({
        type: 'Repos',
        payload: res.data.slice(0,3)
      })
    })
  }
}


export{
  isCheck,
  getRooms,
  gameList,
  getOneData,
  isActivity,
  isKomsel,
  redirect,
  getRepos
}
