interface ProductProps {
    id: number;
    name: string;
    onProductClick: () => void;
    onDelete: (id: number) => void;
}

const ProductItem = ({id, name, onProductClick, onDelete} : ProductProps) => {
    return (
        <div>
            <h3 onClick={onProductClick}>{name}</h3>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default ProductItem;
