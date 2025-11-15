'use client';

import { Product } from '../types/product';
import { useProductStore } from '@/src/store/useProductStore';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const { toggleLike, removeProduct } = useProductStore();

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.action-button')) {
            router.push(`/products/${product.id}`);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Удалить карточку?')) {
            removeProduct(product.id);
        }
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleLike(product.id);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`relative min-h-80 bg-gray-100 border-2 rounded-lg flex flex-col items-center transition-all duration-300 cursor-pointer hover:shadow-lg ${
                product.isLiked ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
            }`}
        >
            <button
                onClick={handleDelete}
                className="action-button absolute top-2 right-2 text-red-500 text-xl hover:text-red-700 hover:scale-110 transition-all z-10"
            >
                ✕
            </button>

            <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-[200px] h-[150px] object-contain p-5 mt-2"
            />

            <h3 className="text-sm text-center px-2 h-10 overflow-hidden line-clamp-2 mb-2">
                {product.title}
            </h3>

            <p className="text-lg font-bold text-green-600 mt-auto pb-8">
                ${product.price}
            </p>

            <button
                onClick={handleLike}
                className={`action-button absolute bottom-2 right-2 text-2xl transition-all ${
                    product.isLiked ? 'animate-heartPop' : 'grayscale hover:grayscale-0'
                }`}
            >
                ❤️
            </button>
        </div>
    );
}
