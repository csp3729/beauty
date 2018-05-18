export default (state = null, action) => {
    switch(action.type){
        case 'all':
            return state = 'all';
        case 'payment':
            return state = 'payment';
        case 'take':
            return state = 'take';
        case 'estimate':
            return state = 'estimate';
        case 'salesreturn':
            return state = 'salesreturn';
    }
}
