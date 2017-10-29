import React, { Component } from 'react';
import AddGame from '../components/AddGame'
import { connect } from 'react-redux'
import axios from 'axios'
import geodist from 'geodist'

import GameModal from './GameModal'

import { gameList, getOneData, redirect } from '../actions/index'
import { api } from '../config'

import '../styles/Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      komsel: []
    }
  }
  componentDidMount(){
    this.props.gameList()
    axios.get(`${api}/komsel`)
    .then(res=>{
      console.log(res);
      for(let i = 0; i < res.data.length; i++){
        res.data[i].distance = geodist(
          {lat: res.data[i].location.lat, lon: res.data[i].location.lng},
          {lat: -6.260708, lon: 106.781617},
          {exact: true, unit: 'meters'});
      }
      this.setState({
        komsel: res.data
      })
    })
  }

  render(){
    return(
      <div className="list-group">
        <AddGame />
        <GameModal />
        {(!this.props.isKomsel && this.props.isActive)
          ?  <div>
              <p data-toggle="modal" data-target="#AddGame" className="create list-group-item">
                Create Event
                <img className="pull-right" src="https://i.imgur.com/9WhmPjF.png" />
              </p>
              {(this.props.games)
                ? (this.props.games.map((g,i)=>
                    <div className="col-md-12 list-group-item" key={i} data-toggle="modal" data-target="#DetailGame"
                      onClick={()=> this.props.getOneData(g)}>
                      <div className="col-md-4">
                      <img className="game-icon" src={g.image} alt="game-icon"/>
                      </div>
                      <div className="col-md-8">
                      <p className="game-name">{g.name}</p>
                      <p className="game-descr">{g.descr}</p>
                      </div>
                    </div>
                  ))
                : null
              }
              </div>
          :   <div>
              <p className="create list-group-item">
                Hackhaton
              </p>
              {(this.state.komsel)
                ? (this.state.komsel.map((k,i)=>
                    <div className="col-md-12 list-group-item" key={i} onClick={()=> this.props.redirect(k.location.lat,k.location.lng)}>
                      <div className="col-md-4">
                      <img className="game-icon" src={k.map_image} alt="game-icon"/>
                      </div>
                      <div className="col-md-8">
                      <p className="game-name">{k.name}</p>
                      <p className="distance">{k.distance.toString().split('.')[0]} meters</p>
                      </div>
                    </div>
                  ))
                : null
              }
              </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  console.log(state);
  return{
    games: state.games,
    isKomsel: state.isKomsel,
    isActive: state.isActive
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    gameList: () => dispatch(gameList()),
    getOneData: (data) => dispatch(getOneData(data)),
    redirect: (lat,lng) => dispatch(redirect(lat,lng))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
