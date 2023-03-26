import {Dispatch} from 'redux';
import {setProducts, addProduct, editProduct, deleteProduct, addComment, deleteComment} from './actions';
import {IComment, IProduct} from '../types/types';
import {API} from '../constants/constants';

export const getProductsThunk = () => async (dispatch: Dispatch) => {
    const response = await fetch(API, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        return;
    }
    dispatch(setProducts(data));
};

export const addProductThunk = (product: IProduct) => async (dispatch: Dispatch) => {
    const response = await fetch(API, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        return;
    }
    dispatch(addProduct(product));
    return data;
};

export const deleteProductThunk = (id: number) => async (dispatch: Dispatch) => {
    const response = await fetch(API + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        return;
    }
    dispatch(deleteProduct(id));
    return data;
};

export const editProductThunk = (product: IProduct) => async (dispatch: Dispatch) => {
    const response = await fetch(API + `/${product.id}`, {
        method: 'PATCH',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        return;
    }
    dispatch(editProduct(product));
    return data;
};

export const addCommentThunk = (productId: number, comment: IComment) => async (dispatch: Dispatch) => {
    const response = await fetch(API + `/comment/${productId}`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        return;
    }
    dispatch(addComment(productId, comment));
    return data;
}

export const deleteCommentThunk = (productId: number, commentId: number) => async (dispatch: Dispatch) => {
    const response = await fetch(API + `/comment/${productId}/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data;
    if (response.ok) {
        data = await response.json();
    } else {
        return;
    }
    dispatch(deleteComment(productId, commentId));
    return data;
}
