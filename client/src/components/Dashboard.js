import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import geodist from 'geodist'

import AddGame from '../components/AddGame'

import { gameList, getOneData, redirect, getRepos } from '../actions/index'
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
    let query = `query={events{name,date{event,join_start,join_end},location{name,lat,lng},image{standard,vr},url,tipe,approved}}&Content-Type=application/json`
    axios.get(`${api}?${query}`)
    .then(res=>{
      for(let i = 0; i < res.data.data.events.length; i++){
        res.data.data.events[i].distance = geodist(
          {lat: res.data.data.events[i].location.lat, lon: res.data.data.events[i].location.lng},
          {lat: -6.260708, lon: 106.781617},
          {exact: true, unit: 'meters'});
      }
      this.setState({
        komsel: res.data.data.events
      })
    })
    this.props.getRepos('stedyyulius')
  }

  visitRepo(url){
    window.open(url)
  }

  render(){
    return(
      <div className="list-group">
        <AddGame />
        {(!this.props.isKomsel && this.props.isActive)
          ?  <div>
              <p data-toggle="modal" data-target="#AddGame" className="create list-group-item">
                Create Event
                <img className="pull-right" src="https://i.imgur.com/9WhmPjF.png" />
              </p>
              {(this.props.repos)
                ? (this.props.repos.map((r,i)=>
                    <div className="col-md-12 list-group-item" key={i}>
                      <div className="col-md-4">
                      <img className="game-icon" src={r.owner.avatar_url} alt="game-icon"/>
                      </div>
                      <div className="col-md-8">
                        <div className="row">
                          <p className="game-name col-md-8">{r.name}</p>
                          <p className="pull-right col-md-4">{r.language}</p>
                        </div>
                        <p className="game-descr">{r.description}</p>
                        <a className="game-descr" onClick={()=>this.visitRepo(r.html_url)}>{r.html_url}</a>
                        <p className="pushed_at">{new Date(r.pushed_at).toString().slice(0,11)}</p>
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
                      <img className="game-icon" src={k.image.standard} alt="game-icon"/>
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
    repos: state.repos,
    isKomsel: state.isKomsel,
    isActive: state.isActive
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    gameList: () => dispatch(gameList()),
    getOneData: (data) => dispatch(getOneData(data)),
    redirect: (lat,lng) => dispatch(redirect(lat,lng)),
    getRepos: (username) => dispatch(getRepos(username))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
