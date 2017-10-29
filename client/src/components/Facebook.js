import React, { Component } from 'react'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import cookie from 'react-cookies'

import { isCheck } from '../actions/index'

class Facebook extends Component{
  constructor(props){
    super(props)
    this.state={}
  }  
  
  next(){
    this.props.isCheck(true)   
  }
  
  responseFacebook(response) {
     console.log(response);
     cookie.save('user',response)
   }
   
  render(){
    return(
      <div onClick={()=>this.next()}>
       <FacebookLogin
          appId="244681202728125"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books,user_birthday"
          callback={(e)=>this.responseFacebook(e)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    isCheck: state.isCheck
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    isCheck: (status) => dispatch(isCheck(status))
    }
  }  

export default connect(null,mapDispatchToProps)(Facebook)