const initialState = null

export default (state = initialState,action) =>{
  console.log(action.payload);
    if(action.type === 'Redirect'){
      return action.payload
    }
    else{
      return state
    }
}