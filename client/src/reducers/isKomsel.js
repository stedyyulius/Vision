const initialState = true

export default (state = initialState,action) =>{
  console.log(action.payload);
    if(action.type === 'isKomsel'){
      return action.payload
    }
    else{
      return state
    }
}