'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { Product } from '@/types/product';

export default function CreateProductPage() {
    const router = useRouter();
    const { addProduct } = useProductStore();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim() || formData.title.length < 3) {
            newErrors.title = 'Название должно быть минимум 3 символа';
        }
        if (!formData.price || Number(formData.price) <= 0) {
            newErrors.price = 'Цена должна быть больше 0';
        }
        if (!formData.description.trim() || formData.description.length < 10) {
            newErrors.description = 'Описание должно быть минимум 10 символов';
        }
        if (!formData.category.trim()) {
            newErrors.category = 'Категория обязательна';
        }
        if (!formData.image.trim()) {
            newErrors.image = 'URL изображения обязателен';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        const newProduct: Product = {
            id: Date.now(),
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            image: formData.image,
            isLiked: false,
            isCustom: true,
        };

        addProduct(newProduct);
        router.push('/products');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Создание товара</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Название товара *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Цена *</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Описание *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Категория *</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">URL изображения *</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium"
                    >
                        Создать товар
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/products')}
                        className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}
