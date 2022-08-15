import {createStore} from 'redux';


const initialState = {
    loading: false,
    name: 'arga fauzianto',
    address: 'tangerang'
}

const reducer = (state = initialState, action) => {
    if(action.type === 'SET_LOADING') {
        return {
            ...state,
            loading: action.value
        }
    }
}

const store = createStore(reducer)

export default store;