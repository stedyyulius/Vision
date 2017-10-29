const initialState = false

export default (state = initialState,action) =>{
    if(action.type === 'Rooms'){
      return action.payload
    }
    else{
      return state
    }
}