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
        <div className="form-group logo">
          <img className="icon col-md-12" src="https://i.imgur.com/L0VzO50.png" />
          {(!this.props.isCheck)
            ? <img className="sub-icon col-md-12" src="https://i.imgur.com/7N4Mnyl.png"/>
            : <img className="sub-icon col-md-12" src="https://i.imgur.com/Gj20pbL.png"/>
          }
        </div>
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
