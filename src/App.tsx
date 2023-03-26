import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import ProductList from './components/Products/ProductList';
import Product from './components/Products/Product';
import AddProduct from './components/Products/AddProduct';
import Modal from './ui/Modal';
import {getProductsThunk, addProductThunk} from './store/thunks';
import {IProduct} from './types/types';
import './App.css';

function App() {
    const dispatch = useAppDispatch();
    const [listViewMode, setListViewMode] = useState(true);
    const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
    const [clickedProductId, setClickedProductId] = useState(-Infinity);
    const products: IProduct[] = useAppSelector((state: any) => state.products);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);

    const openAddProductModal = () => setAddProductModalIsOpen(true);
    const closeAddProductModal = () => setAddProductModalIsOpen(false);

    const addProductHandler = (name: string, image: string, count: number, width: number, height: number, weight: string) => {
        const product = {
            id: Math.round(Math.random() * 100000000),
            name: name,
            imageUrl: image,
            count: count,
            size: {
                width: width,
                height: height,
            },
            weight: weight,
            comments: [],
        }
        dispatch(addProductThunk(product));
    };

    const changeViewMode = (id?: number) => {
        if (!id) {
            setListViewMode(true);
        } else {
            setClickedProductId(id);
            setListViewMode(false);
        }
    };

    const getProductDetails = () => {
        const clickedProduct = products.find(product => product.id === clickedProductId);
        return <Product
            id={clickedProductId}
            name={clickedProduct!.name}
            image={clickedProduct!.imageUrl}
            count={clickedProduct!.count}
            width={clickedProduct!.size.width}
            height={clickedProduct!.size.height}
            weight={clickedProduct!.weight}
            comments={clickedProduct!.comments}
        />;
    };

    return (
        <div>
            {addProductModalIsOpen && <Modal onClose={closeAddProductModal}>
                <AddProduct
                    submitText="Add Product"
                    onSubmit={addProductHandler}
                    onClose={closeAddProductModal}
                />
            </Modal>}
            {listViewMode && <>
                <button onClick={openAddProductModal}>Add Product</button>
                <ProductList products={products} onProductClick={changeViewMode}/>
            </>}
            {!listViewMode && <>
                <button onClick={() => changeViewMode()}>Back to List View</button>
                {getProductDetails()}
            </>}
        </div>
    );
}

export default App;
