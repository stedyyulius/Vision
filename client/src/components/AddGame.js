import React from 'react'
import axios from 'axios'
import Countries from 'countries-cities'
import GoogleMapReact from 'google-map-react'
import geocoder from 'geocoder'
import cookie from 'react-cookies'
import { connect } from 'react-redux'

import { api } from '../config'
import { getRooms } from '../actions/index'

class AddGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      access: null,
      category: null,
      cities: [],
      lat: -6.260708,
      lng: 106.781617,
      zoom: 17,
    }
  }

  componentWillMount () {
    let cities = Countries.getCities('indonesia')
    this.setState({
      cities:cities
    })
  }

  getDot(e){
    this.setState({
      lat: e.lat,
      lng: e.lng
    })
  }

  getLocation(loc){
  geocoder.geocode(loc,(err,data)=>{
    if(typeof data !== "undefined" && data.status === 'OK'){
      this.setState({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      })
    } else {
      return (<h6>no result found</h6>)
    }
  })
  }

  createActivity(){
    let query = `
      mutation {
        createEvent(
          input:{
            tipe:"${this.state.isOnline}",
            name:"${this.state.name}",
            image_standard:"${this.state.image}",
            image_vr:["https://firebasestorage.googleapis.com/v0/b/grayfox-dfa44.appspot.com/o/room360%2FIMG_1972.JPG?alt=media&token=22e402c1-1151-41d3-a01d-1538d2135b45"],
            location_lat:"${this.state.lat}",
            location_lng:"${this.state.lng}",
            location_name:"${this.state.location}",
            url:"${this.state.url}",
            date_join_start:"2017-11-12",
            date_join_end:"2017-11-12",
            date_event:"2017-11-12",
            descr:"${this.state.descr}",
            _organizer:"5a01f11ff6913448d2b92337"
          }){_id}
      }`

    axios.post(`${api}`,{
      query: query,
      'Content-Type': 'application/json'
    })
    .then(res=>{
      this.props.getRooms()
      console.log(res);
    })
  }

  render () {
    return (
<div className="modal fade" id="AddGame" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      <h4 className="modal-title" id="myModalLabel">Create Event</h4>
    </div>
    <div className="modal-body">
      <form>
        <div className="form-group">
          <select defaultValue="Select Event Type" onChange={(e)=>this.setState({isOnline: e.target.value})} style={{width:'100%',padding:'15px',color:'gray'}}>
            <option disabled>Select Event Type</option>
            <option value={"meetup"}>Meetup</option>
            <option value={"hackathon"}>Hackhaton</option>
          </select>
        </div>
<div className="form-group">
  <label htmlFor="exampleInputEmail1">Event Name</label>
  <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Activity Name"
  onChange={(e)=> this.setState({name: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="exampleInputEmail1">Description</label>
  <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Description"
  onChange={(e)=> this.setState({descr: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="exampleInputEmail1">Url</label>
  <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Url"
  onChange={(e)=> this.setState({url: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="exampleInputEmail1">Address</label>
  <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Address"
  onChange={(e)=> this.setState({location: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="exampleInputPassword1">Image</label>
  <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Image"
  onChange={(e)=> this.setState({image: e.target.value})} />
</div>

<div className="form-group">
  <GoogleMapReact
    resetBoundsOnResize
      style={{width:50, height:250,margin:10}}
      center={{lat: this.state.lat, lng: this.state.lng}}
      zoom={this.state.zoom}
      onClick={(e)=> this.getDot(e)}
    >
     <input
       type='text'
       onChange={(e)=> this.getLocation(e.target.value)}
       />
     <img
       style={{width:20,height:20}}
       lat={this.state.lat}
       lng={this.state.lng}
       src='https://i.imgur.com/EBgsrAe.png'
       alt="icon-activity"
     />
   </GoogleMapReact>
</div>
</form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.createActivity()}>Create</button>
    </div>
  </div>
</div>
</div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getRooms: () => dispatch(getRooms())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGame)
