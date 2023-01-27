


// console.log(Redux);
// console.log(ReduxThunk);


let ACTION = {
    ADD_ITEMS : "ADD_ITEM",
    ADD_MONY : "ADD_MONY",
}

let PRODUCT_STATE = {
    data : [],
}

let MONY_STATE = {
    bank : 0,
}

let getData = () => {
    return async (dispatch) => {
        let res = await fetch('https://fakestoreapi.com/products');
        let data = await res.json();
        console.log(data);
        dispatch({type : ACTION.ADD_ITEMS, payload:data});
    }
    
}


let productReducer = (state = PRODUCT_STATE ,action) => {
    switch(action.type){
        case  ACTION.ADD_ITEMS
        : return {
                ...state,
                data : [...state.data,...action.payload],
        } 
        default : return state;  
    }
};

let bankReducer = (state = MONY_STATE ,action) => {
    switch(action.type){
        case  ACTION.ADD_MONY
        : return {
                ...state,
                bank : state.bank + action.payload,
        } 
        default : return state;  
    }
};

let allReducers = Redux.combineReducers({
    bank : bankReducer,
    products : productReducer,
})

let store = Redux.createStore(allReducers,Redux.applyMiddleware(ReduxThunk));


// normal way to get data from api 
// getData();

store.dispatch(getData());

store.dispatch({type : ACTION.ADD_MONY , payload : 1000});

store.subscribe(() => {
  console.log('current state' , store.getState());
});

// console.log(store);



