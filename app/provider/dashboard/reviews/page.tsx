'use client';

// Force dynamic rendering - no static generation at build time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  service_quality: number;
  professionalism: number;
  value_for_money: number;
  is_approved: boolean;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  pendingApproval: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    pendingApproval: 0
  });
  
  // Initialize Supabase client only on client side
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData: Review[]) => {
    const approvedReviews = reviewsData.filter(review => review.is_approved);
    const averageRating = approvedReviews.length > 0 
      ? approvedReviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / approvedReviews.length 
      : 0;
    
    setStats({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: approvedReviews.length,
      pendingApproval: reviewsData.filter(review => !review.is_approved).length
    });
  };

  const toggleReviewApproval = async (reviewId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: !currentStatus })
        .eq('id', reviewId);

      if (error) throw error;
      
      // Refresh data
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;
      
      // Refresh data
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Average Rating</h3>
          <div className="flex items-center mt-2">
            <span className="text-3xl font-bold text-gray-900">{stats.averageRating}</span>
            <span className="text-yellow-400 ml-2 text-xl">⭐</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total Reviews</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReviews}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Pending Approval</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">{stats.pendingApproval}</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reviews.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-lg">No reviews yet</p>
              <p className="text-gray-400 mt-2">Customer reviews will appear here</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      {review.profiles?.avatar_url ? (
                        <img 
                          src={review.profiles.avatar_url} 
                          alt={review.profiles.full_name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="text-gray-600 font-semibold">
                          {review.profiles?.full_name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.profiles?.full_name || 'Anonymous'}
                      </h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                        <span className="text-gray-500 ml-2">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleReviewApproval(review.id, review.is_approved)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        review.is_approved
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      }`}
                    >
                      {review.is_approved ? 'Approved' : 'Approve'}
                    </button>
                    
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {review.comment && (
                  <p className="mt-3 text-gray-700 pl-13">{review.comment}</p>
                )}
                
                {/* Detailed Ratings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pl-13">
                  <div className="text-sm">
                    <span className="text-gray-600">Service Quality: </span>
                    <span className="font-semibold">{review.service_quality}/5</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Professionalism: </span>
                    <span className="font-semibold">{review.professionalism}/5</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Value for Money: </span>
                    <span className="font-semibold">{review.value_for_money}/5</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}