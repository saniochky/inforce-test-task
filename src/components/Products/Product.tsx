import { useState } from 'react';
import {useAppDispatch} from '../../hooks';
import AddProduct from './AddProduct';
import Modal from '../../ui/Modal';
import {editProductThunk} from '../../store/thunks';
import {IComment} from '../../types/types';

interface ProductProps {
    id: number;
    name: string;
    image: string;
    count: number;
    width: number;
    height: number;
    weight: string;
    comments: IComment[]
}

const Product = ({id, name, image, count, width, height, weight, comments}: ProductProps) => {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);

    const openEditModal = () => setEditMode(true);
    const closeEditModal = () => setEditMode(false);

    const editProductHandler = (name: string, image: string, count: number, width: number, height: number, weight: string) => {
        const product = {
            id: id,
            name: name,
            imageUrl: image,
            count: count,
            size: {
                width: width,
                height: height,
            },
            weight: weight,
            comments: comments,
        }
        dispatch(editProductThunk(product));
    };

    return (
        <div>
            {editMode && <Modal>
                <AddProduct
                    defaultName={name}
                    defaultImage={image}
                    defaultCount={count}
                    defaultWidth={width}
                    defaultHeight={height}
                    defaultWeight={weight}
                    submitText="Edit"
                    onSubmit={editProductHandler}
                    onClose={closeEditModal}
                />
            </Modal>}
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <p>Count: {count}</p>
            <p>Width: {width}</p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Comments: {comments.length}</p>
            <button onClick={openEditModal}>Edit</button>
        </div>
    );
};

export default Product;
