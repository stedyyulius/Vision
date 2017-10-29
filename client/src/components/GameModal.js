import React, { Component } from 'react'
import { connect } from 'react-redux'

class GameModal extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return(
      <div className="modal" id="DetailGame" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 className="modal-title" id="myModalLabel">{this.props.onedata.name}</h4>
          </div> */}
          <div className="modal-body">
            <img className="game-modal" src={this.props.onedata.image2} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal">Play</button>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    onedata: state.onedata
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameModal)