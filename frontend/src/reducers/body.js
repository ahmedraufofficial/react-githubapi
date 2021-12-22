const bodyReducer = (state = "", action) => {
    switch(action.type){
        case 'BODY':
            return action.payload;
        default:
             return state;
    }
}

export default bodyReducer;