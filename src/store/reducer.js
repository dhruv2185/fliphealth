import { configureStore } from "@reduxjs/toolkit";
const initialState = {
    authenticated: false,
    accountType: null,
    accountAddress: null,
    profile: {}
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                authenticated: true,
                ...action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                authenticated: false,
                accountType: null,
                accountAddress: null,
                profile: null
            }
        case "UPDATE":
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}
export default configureStore({ reducer: reducer });