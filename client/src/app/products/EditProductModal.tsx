import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Header from '@/app/(components)/Header';

type ProductFormData = {
    productId: string;
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}

type EditProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (formData: ProductFormData) => void;
    initialData: ProductFormData;
};

const EditProductModal = ({ isOpen, onClose, onUpdate, initialData }: EditProductModalProps) => {
    const [formData, setFormData] = useState<ProductFormData>(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "stockQuantity" || name === "rating"
                    ? parseFloat(value)
                    : value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = 'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20'>
            <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                <Header name='Edit Product' />
                <form onSubmit={handleSubmit} className='mt-5'>
                    <label htmlFor="productName" className={labelCssStyles}>
                        Product Name
                    </label>
                    <input 
                        type="text" 
                        name='name'
                        placeholder='Name'
                        onChange={handleChange}
                        value={formData.name}
                        className={inputCssStyles}
                        required
                    />

                    <label htmlFor="productPrice" className={labelCssStyles}>
                        Price
                    </label>
                    <input 
                        type="number" 
                        name='price'
                        placeholder='Price'
                        onChange={handleChange}
                        value={formData.price}
                        className={inputCssStyles}
                        required
                    />

                    <label htmlFor="stockQuantity" className={labelCssStyles}>
                        Stock Quantity
                    </label>
                    <input 
                        type="number" 
                        name='stockQuantity'
                        placeholder='Stock Quantity'
                        onChange={handleChange}
                        value={formData.stockQuantity}
                        className={inputCssStyles}
                        required
                    />

                    <label htmlFor="rating" className={labelCssStyles}>
                        Rating
                    </label>
                    <input 
                        type="number" 
                        name='rating'
                        placeholder='Rating'
                        onChange={handleChange}
                        value={formData.rating}
                        className={inputCssStyles}
                        required
                    />

                    <button type='submit' className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                        Update
                    </button>

                    <button type='button' className='ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700' onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
