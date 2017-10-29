const initialState = null

export default (state = initialState,action) =>{
    if(action.type === 'Redirect'){
      return action.payload
    }
    else{
      return state
    }
}