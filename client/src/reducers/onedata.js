const initialState = {
  name: 'Loading',
  image2: 'Loading'
}

export default (state = initialState,action) =>{
    if(action.type === 'OneData'){
      return action.payload
    }
    else{
      return state
    }
}