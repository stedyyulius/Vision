import React, { Component } from 'react'
import Facebook from '../components/Facebook'
import { connect } from 'react-redux'
import cookie from 'react-cookies'

import '../styles/Auth.css'

class Auth extends Component{
  constructor(props){
    super(props)
    this.state={}
  }

  componentDidMount(){
  }

  login(){
    window.location = '/'
  }

  render(){
    return(
      <div className="body">
        <div className="login-form">
            <img className="icon" src="http://cliparting.com/wp-content/uploads/2016/06/Eye-clip-art-black-and-white-free-clipart-images.png" />
            <p className="title">Meetup and Hackhaton Searher App</p>
        <div className="title">
          <Facebook />
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    isCheck: state.isCheck
  }
}


export default connect(mapStateToProps,null)(Auth)
