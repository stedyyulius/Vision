import { api } from '../config'
import axios from 'axios'

const isCheck = (status) =>{
  console.log(status);
  return{
    type: 'isCheck',
    payload: status
  }
}

const getRooms = () =>{
  return(dispatch)=>{
    axios.get(`${api}/room/search/offline`)
    .then(res=>{
      console.log(res);
      dispatch({
        type: 'Rooms',
        payload: res.data
      })
    })
  }
}

const gameList = () =>{
  return(dispatch)=>{
    axios.get(`${api}/room/search/online`)
    .then(res=>{
      console.log(res.data);
      dispatch({
        type: 'Games',
        payload: res.data
      })
    })
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


export{
  isCheck,
  getRooms,
  gameList,
  getOneData,
  isActivity,
  isKomsel,
  redirect  
}
