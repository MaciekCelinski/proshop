import axios from 'axios'
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from "../constants/productConstants.js";

// we can do this another arrow async syntax thanks to react-thunk
export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

        const {data} = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
	} catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            // error.response will give a generic message
            // if we have our message we should check error.response.data.message
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};
