import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-5xl font-bold mb-6">Магазин товаров</h1>
            <p className="text-xl text-gray-600 mb-8">
                Просматривайте, создавайте и управляйте товарами
            </p>
            <Link
                href="/products"
                className="inline-block px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition"
            >
                Перейти к товарам
            </Link>
        </div>
    );
}
