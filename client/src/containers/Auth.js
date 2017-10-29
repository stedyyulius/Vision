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
    console.log(this.props.isCheck)
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
        {(!this.props.isCheck)
          ? <div className="title">
              <Facebook />
            </div>
          : <div>
            <div className="input form-group">
               <h6><b>Nama Gereja</b></h6>
               <input type="text" className="form-control" placeholder="Nama Gereja" id="Nama Gereja" />
               <i className="fa fa-user"></i>
             </div>
             <div className="input form-group">
                <h6><b>No Handphone</b></h6>
                <input type="text" className="form-control" placeholder="No Handphone" id="No Handphone" />
                <i className="fa fa-user"></i>
              </div>
              <div className="input form-group">
                 <h6><b>Interest</b></h6>
                 <input type="text" className="form-control" placeholder="Interest" id="Interest" />
                 <i className="fa fa-user"></i>
               </div>
               <button type="button" className="log-btn" onClick={()=> this.login()}>Submit</button>
            </div>
        }
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