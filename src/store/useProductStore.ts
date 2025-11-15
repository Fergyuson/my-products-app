import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductStore {
    products: Product[];
    filter: 'all' | 'favorites';
    searchQuery: string;
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
    toggleLike: (id: number) => void;
    updateProduct: (id: number, data: Partial<Product>) => void;
    setFilter: (filter: 'all' | 'favorites') => void;
    setSearchQuery: (query: string) => void;
    getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    filter: 'all',
    searchQuery: '',

    setProducts: (products) =>
        set({ products: products.map(p => ({ ...p, isLiked: false })) }),

    addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

    removeProduct: (id) =>
        set((state) => ({ products: state.products.filter(p => p.id !== id) })),

    toggleLike: (id) =>
        set((state) => ({
            products: state.products.map(p =>
                p.id === id ? { ...p, isLiked: !p.isLiked } : p
            ),
        })),

    updateProduct: (id, data) =>
        set((state) => ({
            products: state.products.map(p =>
                p.id === id ? { ...p, ...data } : p
            ),
        })),

    setFilter: (filter) => set({ filter }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    getFilteredProducts: () => {
        const { products, filter, searchQuery } = get();
        let filtered = products;

        if (filter === 'favorites') {
            filtered = filtered.filter(p => p.isLiked);
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    },
}));
