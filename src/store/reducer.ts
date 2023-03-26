import {ActionTypes} from './actionTypes';
import {IProduct} from '../types/types';

export const INITIAL_STATE: IState = {
    products: [],
};

export interface IState {
    products: IProduct[];
}

export const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case ActionTypes.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case ActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload),
            };
        case ActionTypes.EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        case ActionTypes.ADD_COMMENT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.productId ?
                        {...product, comments: [...product.comments, action.payload.comment]}
                        : product
                ),
            }
        case ActionTypes.DELETE_COMMENT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ?
                        {...product, comments: [product.comments.filter(comment => comment.id !== action.payload.commentId)]}
                        : product
                ),
            }
        default:
            return state;
    }
};
