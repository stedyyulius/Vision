const initialState = false

export default (state = initialState,action) =>{
  console.log(action.payload);
    if(action.type === 'isCheck'){
      return action.payload
    }
    else{
      return state
    }
}