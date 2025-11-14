'use client';

import { useProductStore } from '@/store/useProductStore';

export default function ProductFilters() {
    const { filter, setFilter, searchQuery, setSearchQuery, products, removeProduct } = useProductStore();

    const handleDeleteAll = () => {
        if (products.length === 0) return;

        if (confirm('Удалить все карточки?')) {
            products.forEach((product) => {
                setTimeout(() => removeProduct(product.id), 50);
            });
        }
    };

    return (
        <div className="flex gap-3 mb-5">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Название карточки"
                className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />

            <button
                onClick={() => setFilter('favorites')}
                className={`px-5 py-2 rounded text-white transition ${
                    filter === 'favorites' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                Избранное
            </button>

            <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded text-white transition ${
                    filter === 'all' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                Показать все
            </button>

            <button
                onClick={handleDeleteAll}
                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                Удалить все
            </button>
        </div>
    );
}
