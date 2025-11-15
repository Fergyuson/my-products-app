'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/src/store/useProductStore';
import ProductCard from '@/src/components/ProductCard';
import ProductFilters from '@/src/components/ProductFilters';
import Link from 'next/link';

export default function ProductsPage() {
    const { setProducts, getFilteredProducts } = useProductStore();
    const filteredProducts = getFilteredProducts();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [setProducts]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Список товаров</h1>
                <Link
                    href="/create-product"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Создать товар
                </Link>
            </div>

            <ProductFilters />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">Товары не найдены</p>
            )}
        </div>
    );
}
