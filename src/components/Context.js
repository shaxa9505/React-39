import {createContext, useReducer} from "react";
import { Reducer } from "./Reducer";


export const ShopContext = createContext();

const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false
}


export const ContextProvider = ({children}) => {

    const [value, dispatch] = useReducer(Reducer, initialState);

    value.addToBasket = (itemID) => {
        dispatch({type: "ADD_TO_BASKET", payload: itemID})
    }

    value.handleBasketShow = () => {
        dispatch({type: "TOGGLE_BASKET"})
    }

    value.removeFromBasket = (itemID) => {
        dispatch({type: "REMOVE_FROM", payload: {id: itemID}})
    }

    value.incrementQuantity = (itemID) => {
        dispatch({type: "INCREMENT_QUANTITY", payload: {id: itemID}})
    }

    value.decrementQuantity = (itemID) => {
        dispatch({type: "DECREMENT_QUANTITY", payload: {id: itemID}})
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
            
        </ShopContext.Provider>
    )
}