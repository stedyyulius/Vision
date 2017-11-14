import React, { Component } from 'react';
import cookie from 'react-cookies'
import brand from '../logotorch.png'
import { connect } from 'react-redux'

import TorchMap from '../components/TorchMap'
import Dashboard from '../components/Dashboard'

import '../App.css';

import { isActivity, isKomsel } from '../actions/index'

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      meetup: true,
      hackhaton: true
    }
  }

  componentWillMount(){
    if(!cookie.load('user')){
      window.location = '/login'
    }
  }

  logout(){
    cookie.remove('user')
    window.location = '/login'
  }


  hackhaton(){
    if(this.state.hackhaton === false){
      this.setState({
        hackhaton: true
      })
      this.props.isKomsel(true)
    } else{
      this.setState({
        hackhaton: false
      })
      this.props.isKomsel(false)
    }
  }

  meetup(){
    if(this.state.meetup === false){
      this.setState({
        meetup: true
      })
      this.props.isActivity(true)
    } else{
      this.setState({
        meetup: false
      })
      this.props.isActivity(false)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-9">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header col-md-1">
                <img className="logo" src="https://cdn3.iconfinder.com/data/icons/ui-9/512/eyes-512.png" alt="Vision" />
              </div>
              <div className="navbar-collapse collapse col-md-11">
                <ul className="nav navbar-nav pull-left">
                {(this.state.hackhaton === true)
                  ? <li><a onClick={()=> this.hackhaton()}><span className="navtext">Hide Events</span></a></li>
                  : <li><a onClick={()=> this.hackhaton()}><span className="navtext">Show Events</span></a></li>
                  }
                  {/* {(this.state.meetup === true)
                  ? <li><a onClick={()=> this.meetup()}><span className="navtext">Clear Meetup</span></a></li>
                  : <li><a onClick={()=> this.meetup()}><span className="navtext">Show Meetup</span></a></li>
                  } */}
                  <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown"><span className="navtext">Achievement</span></a>
                    <ul className="dropdown-menu">
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> New Member<span className="w3-margin-left w3-badge w3-red"> 1</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Score Game Player (Monthly)<span className="w3-margin-left w3-badge w3-red"> 2</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> 1st Activity at Meetup<span className="w3-margin-left w3-badge w3-red"> 3</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Member in Meetup (Monthly)<span className="w3-margin-left w3-badge w3-red"> 3</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Join Event<span className="w3-margin-left w3-badge w3-red"> 3</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Activity with Other Meetup<span className="w3-margin-left w3-badge w3-red"> 4</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Member in Meetup (Annual)<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Score Game Player (Annual)<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Multiply Meetup<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Stability Meetup<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> New Member Each Month<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown"><span className="navtext">Rewards</span></a>
                    <ul className="dropdown-menu">
                      <li><a><img src="http://www.poundland.co.uk/wordpress/poundland/wp-content/uploads/2015/07/Burger-King-Carousel.jpg" alt="TORCH" className="rewards" alt="Cinque Terre" /></a></li>
                      <li><a><img src="http://www.anomariano.com/wp-content/uploads/2015/12/Diskon-40-di-McD.jpg" alt="TORCH" className="rewards" alt="Cinque Terre" /></a></li>
                      <li><a><img src="https://www.static-src.com/siva/asset//11_2016/air-asia-gift-voucher-microsite.jpg" alt="TORCH" className="rewards" alt="Cinque Terre" /></a></li>
                    </ul>
                  </li>
                  <div className="pull-right">
                    <li><img src={cookie.load('user').picture.data.url} className="img-circle" alt="Cinque Terre" /></li>
                    <li><a><span className="navtext">{cookie.load('user').name}</span></a></li>
                    <li><a onClick={()=> this.logout()}><span className="navtext">Logout</span></a></li>
                  </div>
                </ul>

              </div>
            </div>
          </nav>
          <TorchMap />
          </div>
          <div className="col-md-3">
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{

  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    isActivity: (status) => dispatch(isActivity(status)),
    isKomsel: (status) => dispatch(isKomsel(status))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
