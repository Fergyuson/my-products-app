'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/src/store/useProductStore';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { products, toggleLike } = useProductStore();

    const product = products.find((p) => p.id === Number(params.id));

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-xl">Товар не найден</p>
                <button
                    onClick={() => router.push('/products')}
                    className="mt-4 mx-auto block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Вернуться к списку
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button
                onClick={() => router.push('/products')}
                className="mb-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                ← Назад к списку
            </button>

            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-96 object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                        <p className="text-2xl font-bold text-green-600 mb-4">
                            ${product.price}
                        </p>

                        <p className="text-gray-700 mb-4">{product.description}</p>

                        <p className="text-sm text-gray-500 mb-2">
                            Категория: <span className="font-medium">{product.category}</span>
                        </p>

                        {product.rating && (
                            <p className="text-sm text-gray-500 mb-4">
                                Рейтинг: <span className="font-medium">{product.rating.rate}</span> ({product.rating.count} отзывов)
                            </p>
                        )}

                        <button
                            onClick={() => toggleLike(product.id)}
                            className={`px-8 py-3 rounded text-white font-medium transition ${
                                product.isLiked ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-500 hover:bg-gray-600'
                            }`}
                        >
                            {product.isLiked ? '❤️ В избранном' : '🤍 Добавить в избранное'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
