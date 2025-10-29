'use client';

export default function FavoritesPage() {
  const favorites = [
    {
      id: 1,
      service: 'Haircut & Styling',
      provider: 'StyleStudio by Priya',
      rating: 4.8,
      reviews: 124,
      price: '₹500',
      image: '💇‍♀️'
    },
    {
      id: 2,
      service: 'Facial Treatment',
      provider: 'Glamour Spa',
      rating: 4.9,
      reviews: 89,
      price: '₹1,200',
      image: '✨'
    },
    {
      id: 3,
      service: 'Manicure & Pedicure',
      provider: 'NailArt Lounge',
      rating: 4.7,
      reviews: 67,
      price: '₹800',
      image: '💅'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark-text">
            My Favorites
          </h1>
          <p className="text-dark-grey font-body mt-1">
            Your saved beauty services and providers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <div key={fav.id} className="bg-white rounded-xl p-6 shadow-sm border border-light-grey hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{fav.image}</div>
              <button className="text-rose-500 hover:text-rose-600 text-xl">
                ❤️
              </button>
            </div>
            <h3 className="font-heading font-bold text-dark-text text-lg mb-2">
              {fav.service}
            </h3>
            <p className="text-dark-grey font-body mb-3">
              by {fav.provider}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-body text-dark-text">{fav.rating}</span>
                <span className="text-dark-grey font-body">({fav.reviews})</span>
              </div>
              <span className="font-heading font-bold text-rose-500">
                {fav.price}
              </span>
            </div>
            <button className="w-full mt-4 bg-rose-500 text-white py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors">
              Book Now
            </button>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="text-xl font-heading font-bold text-dark-text mb-2">
            No favorites yet
          </h3>
          <p className="text-dark-grey font-body">
            Save your favorite services to book them quickly later
          </p>
        </div>
      )}
    </div>
  );
}