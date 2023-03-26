import {useState} from 'react';
import {useAppDispatch} from '../../hooks';
import ProductItem from './ProductItem';
import Modal from '../../ui/Modal';
import {deleteProductThunk} from '../../store/thunks';
import {IProduct} from '../../types/types';

interface ProductListProps {
    products: IProduct[];
    onProductClick: (id: number) => void;
}

const ProductList = ({products, onProductClick}: ProductListProps) => {
    const dispatch = useAppDispatch();
    const [deleteProductModalIsOpen, setDeleteProductModalIsOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(0);

    const handleDeleteProduct = () => {
        dispatch(deleteProductThunk(selectedProductId));
        setDeleteProductModalIsOpen(false);
    };

    return (
        <div>
            {deleteProductModalIsOpen && <Modal onClose={() => setDeleteProductModalIsOpen(false)}>
                <h1>Are you sure you want to delete this product?</h1>
                <button onClick={() => handleDeleteProduct()}>Yes</button>
                <button onClick={() => setDeleteProductModalIsOpen(false)}>No</button>
            </Modal>}
            <ul>
                {products.map(product => {
                    return <li key={product.id}>
                        <ProductItem
                            id={product.id}
                            name={product.name}
                            onProductClick={() => onProductClick(product.id)}
                            onDelete={() => {setDeleteProductModalIsOpen(true); setSelectedProductId(product.id)}}
                        />
                    </li>;
                })}
            </ul>
        </div>
    );
};

export default ProductList;
