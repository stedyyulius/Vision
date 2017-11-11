import React, {Component} from 'react'
import { icon } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios'
import { connect } from 'react-redux'
import cookie from 'react-cookies'

import { getRooms } from '../actions/index'
import { api } from '../config'
import request from 'request'

var Activity = icon({
    iconUrl: 'https://i.imgur.com/EBgsrAe.png',
    iconSize: [70, 70],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var Me = icon({
    iconUrl: 'http://www.netanimations.net/arrowkk2.gif',
    iconSize: [130, 130],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

const startLocation = [-6.260708, 106.781617]
const vr = `http://localhost:8081/vr`

class TorchMap extends Component {
  constructor(props){
    super(props)
    this.state={
      rooms:[],
      komsel: [],
      isJoin: '',
      current: [-6.260708, 106.781617]
    }
  }

  async componentWillReceiveProps(){
    let waitRedirect = this.props.redirect !== null
    await waitRedirect
    if(this.props.redirect){
      let newCoordinate = {}
      newCoordinate.lat = +this.props.redirect.lat + 0.0006
      newCoordinate.lng = +this.props.redirect.lng - 0.0003
      this.setState({
        current: [newCoordinate.lat,newCoordinate.lng]
      })
      console.log(this.state.current);
    }
  }

  componentWillMount(){
    this.props.getRooms()
    let query = `query={events{name,date{event,join_start,join_end},location{name,lat,lng},image{standard,vr},url,_id,tipe,approved}}&Content-Type=application/json`
    axios.post(`${api}?${query}`)
    .then(res=>{
          console.log(`${api}?${query}`)
      console.log(res.data.data.events);
      this.setState({
        komsel: res.data.data.events
      })
    })
  }

  requestJoin(id,i){
    
    console.log(id);
    let data = {
      name: cookie.load('user').name,
      image: cookie.load('user').picture.data.url
    }
    console.log(data);
    axios.post(`http://localhost:4000/graphql?query=mutation{joinEvent(id:"5a0236bcd9a47651981aa458",participant:"5a01f11ff6913448d2b92337") {
      _id
      name
      descr
      tipe
      url
      _organizer
      approved
    }}`)
    .then(response=>{
    console.log(response);
    })
  }

  render(){
    return(
      <div>
        <Map center={this.state.current} zoom={17}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[startLocation[0],startLocation[1]]}
            icon={Me}>
         </Marker>
         <div className="tooltip-detail">
         {(this.props.isKomsel && this.state.komsel.length > 0)
           ?  (this.state.komsel.map((k,i)=>
              <Marker
                key={i}
                position={[+k.location.lat,+k.location.lng]}
                icon={icon({
                    iconUrl: k.image.standard,
                    iconSize: [70, 70],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                })}>
                <Popup>
                  <span>
                    <span className="tooltip-detail">{k.date.join_start}</span><br />
                    <b className="tooltip-detail">{k.name}</b> <br />
                    <img className="komsel tooltip-detail" src={k.image.standard} /> <br />
                    <hr />
                    <span className="leader">{k.organizer}</span>
                    <a className="leader">{k.url}</a>
                      {/* {(k.participant.length === 0)
                        ? (<b className="tooltip-detail">No Member Yet</b>)
                        : (k.member.map((m,index)=>
                          <div key={index}><b>{m._member.name}</b><br /></div>
                        ))
                      } */}
                    <hr />
                    {(this.state.isJoin === i)
                      ? null
                      : <div className="tooltip-detail">
                        <button className="btn btn-success"
                        onClick={()=> this.requestJoin(k._id,i)}>
                        Join
                        </button>
                        <button className="btn btn-primary" onClick={()=> window.open(`${vr}?${k._id}`)}>
                        Visit Vr
                        </button>
                        </div>
                    }
                  </span>
                </Popup>
             </Marker>
            ))
           : null
         }
       </div>
        {(this.props.rooms && this.props.isActive === true)
         ?this.props.rooms.map((m,index) => (
           <Marker
             key={index}
             position={[+m.rules.offline.location.lat,+m.rules.offline.location.lng]}
             icon={Activity}>
            <Popup>
              <span>
                <b className="tooltip-detail">{m.name}</b>
                <br />
                <span className="tooltip-detail">{m.createdDate}</span> <hr />
                <img className="activity-pic tooltip-detail" src={m.image} /><br />
                <button className="btn btn-success tooltip-detail">Join</button>
              </span>
            </Popup>
          </Marker>
        ))
        :<div></div>
      }
    </Map>
  </div>
    )
  }
}

const mapStateToProps = (state) =>{
  console.log(state.rooms);
  return{
    rooms: state.rooms,
    isActive: state.isActive,
    isKomsel: state.isKomsel,
    redirect: state.redirect
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getRooms: () => dispatch(getRooms())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TorchMap)
