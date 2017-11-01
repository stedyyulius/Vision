const initialState = null

export default (state = initialState,action) =>{
  console.log(action.payload);
    if(action.type === 'Repos'){
      return action.payload
    }
    else{
      return state
    }
}
