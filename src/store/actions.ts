import {IComment, IProduct} from '../types/types';
import {ActionTypes} from './actionTypes';

export const setProducts = (products: Array<IProduct>) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    };
};

export const addProduct = (product: IProduct) => {
    return {
        type: ActionTypes.ADD_PRODUCT,
        payload: product,
    };
};

export const deleteProduct = (id: number) => {
    return {
        type: ActionTypes.DELETE_PRODUCT,
        payload: id,
    };
};

export const editProduct = (product: IProduct) => {
    return {
        type: ActionTypes.EDIT_PRODUCT,
        payload: product,
    };
};

export const addComment = (productId: number, comment: IComment) => {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload: {
            productId: productId,
            comment: comment,
        },
    };
};

export const deleteComment = (productId: number, commentId: number) => {
    return {
        type: ActionTypes.DELETE_COMMENT,
        payload: {
            productId: productId,
            comment: commentId,
        },
    };
};
