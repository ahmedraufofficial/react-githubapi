const purposeReducer = (state = "", action) => {
    switch(action.type){
        case 'PURPOSE':
            return action.payload;
        default:
            return state;
    }
}

export default purposeReducer;