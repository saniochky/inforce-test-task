import {useState, FormEvent} from 'react';

interface AddProductProps {
    defaultName?: string;
    defaultImage?: string;
    defaultCount?: number;
    defaultWidth?: number;
    defaultHeight?: number;
    defaultWeight?: string;
    submitText: string;
    onSubmit: (name: string, image: string, count: number, width: number, height: number, weight: string) => void;
    onClose: () => void;
}

const AddProduct = (
    {
        defaultName = '',
        defaultImage = '',
        defaultCount = 0,
        defaultWidth = 0,
        defaultHeight = 0,
        defaultWeight = '',
        submitText,
        onSubmit,
        onClose,
    }: AddProductProps) => {
    const [name, setName] = useState(defaultName);
    const [image, setImage] = useState(defaultImage);
    const [count, setCount] = useState(defaultCount);
    const [width, setWidth] = useState(defaultWidth);
    const [height, setHeight] = useState(defaultHeight);
    const [weight, setWeight] = useState(defaultWeight);

    let formIsValid = false;

    if (name.trim().length > 0 && image.trim().length > 0 && count > 0 && width > 0 && height > 0 && weight.trim().length > 0) {
        formIsValid = true;
    }

    const changeName = (event: FormEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const changeImage = (event: FormEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.value);
    };

    const changeCount = (event: FormEvent<HTMLInputElement>) => {
        setCount(parseInt(event.currentTarget.value, 10));
    };

    const changeWidth = (event: FormEvent<HTMLInputElement>) => {
        setWidth(parseInt(event.currentTarget.value, 10));
    };

    const changeHeight = (event: FormEvent<HTMLInputElement>) => {
        setHeight(parseInt(event.currentTarget.value, 10));
    };

    const changeWeight = (event: FormEvent<HTMLInputElement>) => {
        setWeight(event.currentTarget.value);
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(name, image, count, width, height, weight);
        onClose();
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Enter product name</label>
                <input type="text" id="name" value={name} onChange={changeName}/>
                <label htmlFor="image">Enter image URL</label>
                <input type="text" id="image" value={image} onChange={changeImage}/>
                <label htmlFor="count">Enter number of products</label>
                <input type="number" id="count" value={count} onChange={changeCount}/>
                <label htmlFor="width">Enter width</label>
                <input type="number" id="width" value={width} onChange={changeWidth}/>
                <label htmlFor="height">Enter height</label>
                <input type="number" id="height" value={height} onChange={changeHeight}/>
                <label htmlFor="weight">Enter weight</label>
                <input type="text" id="weight" value={weight} onChange={changeWeight}/>
                <div>
                    <button type="submit" disabled={!formIsValid}>{submitText}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
