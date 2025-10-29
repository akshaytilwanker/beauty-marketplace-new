'use client';

import { useState, useEffect } from 'react';

interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
}

interface ScheduledPost {
  id: number;
  content: string;
  scheduleDate: string;
  scheduleTime: string;
  scheduledFor: string;
  status: string;
  createdAt: string;
}

interface Analytics {
  totalPosts: number;
  engagementRate: string;
  bestTime: string;
  followersGrowth: string;
}

export default function SocialMediaPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: '',
    facebook: '',
    youtube: '',
    twitter: ''
  });

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [newPost, setNewPost] = useState({
    content: '',
    scheduleDate: '',
    scheduleTime: ''
  });

  const [analytics, setAnalytics] = useState<Analytics>({
    totalPosts: 0,
    engagementRate: '0%',
    bestTime: 'Not enough data',
    followersGrowth: '+0'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    const savedPosts = localStorage.getItem('scheduledPosts');
    const savedAnalytics = localStorage.getItem('socialAnalytics');

    if (savedLinks) setSocialLinks(JSON.parse(savedLinks));
    if (savedPosts) setScheduledPosts(JSON.parse(savedPosts));
    if (savedAnalytics) setAnalytics(JSON.parse(savedAnalytics));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('scheduledPosts', JSON.stringify(scheduledPosts));
  }, [scheduledPosts]);

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handlePostChange = (field: string, value: string) => {
    setNewPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const schedulePost = () => {
    if (!newPost.content || !newPost.scheduleDate || !newPost.scheduleTime) {
      alert('Please fill all fields');
      return;
    }

    const post: ScheduledPost = {
      id: Date.now(),
      content: newPost.content,
      scheduleDate: newPost.scheduleDate,
      scheduleTime: newPost.scheduleTime,
      scheduledFor: `${newPost.scheduleDate}T${newPost.scheduleTime}`,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    setScheduledPosts(prev => [post, ...prev]);
    setNewPost({ content: '', scheduleDate: '', scheduleTime: '' });
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      totalPosts: prev.totalPosts + 1
    }));

    alert('Post scheduled successfully!');
  };

  const deleteScheduledPost = (id: number) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
  };

  const shareToSocialMedia = (platform: keyof SocialLinks) => {
    const text = `Check out ${socialLinks[platform] || 'our social media'}!`;
    
    const shareUrls = {
      instagram: 'https://instagram.com',
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(socialLinks.facebook || window.location.href)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      youtube: 'https://youtube.com'
    };

    window.open(shareUrls[platform], '_blank');
  };

  const shareBusinessProfile = () => {
    const profileText = `Check out my beauty business! Services available at...`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Beauty Business',
        text: profileText,
        url: window.location.href
      });
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText(profileText);
      alert('Profile text copied to clipboard! Share it on your social media.');
    }
  };

  const socialPlatforms = [
    {
      name: 'Instagram',
      key: 'instagram' as keyof SocialLinks,
      icon: '📷',
      placeholder: 'https://instagram.com/yourusername',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Facebook',
      key: 'facebook' as keyof SocialLinks,
      icon: '👥',
      placeholder: 'https://facebook.com/yourpagename',
      color: 'bg-gradient-to-r from-blue-500 to-blue-700'
    },
    {
      name: 'YouTube',
      key: 'youtube' as keyof SocialLinks,
      icon: '🎥',
      placeholder: 'https://youtube.com/c/yourchannel',
      color: 'bg-gradient-to-r from-red-500 to-red-700'
    },
    {
      name: 'Twitter',
      key: 'twitter' as keyof SocialLinks,
      icon: '🐦',
      placeholder: 'https://twitter.com/yourusername',
      color: 'bg-gradient-to-r from-blue-400 to-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-dark-text">
          Social Media Manager
        </h1>
        <p className="text-dark-grey font-body mt-1">
          Manage your social presence and engage with customers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Social Media Links */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Social Media Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map(platform => (
                <div key={platform.key} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-white`}>
                      <span className="text-xl">{platform.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-dark-text">
                        {platform.name}
                      </h3>
                      <p className="text-dark-grey font-body text-sm">
                        Add your {platform.name} link
                      </p>
                    </div>
                  </div>
                  
                  <input
                    type="url"
                    value={socialLinks[platform.key]}
                    onChange={(e) => handleSocialLinkChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => shareToSocialMedia(platform.key)}
                      className="flex-1 bg-rose-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-rose-600 transition-colors"
                    >
                      Share
                    </button>
                    {socialLinks[platform.key] && (
                      <a
                        href={socialLinks[platform.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-500 text-white px-4 py-2 rounded text-sm font-body hover:bg-gray-600 transition-colors text-center"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Post Scheduling */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
              Schedule Posts
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-dark-text font-body font-medium mb-2">
                  Post Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => handlePostChange('content', e.target.value)}
                  rows={3}
                  placeholder="Share your latest offers, new services, or beauty tips..."
                  className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={newPost.scheduleDate}
                    onChange={(e) => handlePostChange('scheduleDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-dark-text font-body font-medium mb-2">
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    value={newPost.scheduleTime}
                    onChange={(e) => handlePostChange('scheduleTime', e.target.value)}
                    className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button
                onClick={schedulePost}
                className="bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors"
              >
                Schedule Post
              </button>
            </div>

            {/* Scheduled Posts List */}
            {scheduledPosts.length > 0 && (
              <div className="mt-6">
                <h3 className="font-heading font-semibold text-dark-text mb-4">
                  Scheduled Posts ({scheduledPosts.length})
                </h3>
                <div className="space-y-3">
                  {scheduledPosts.map(post => (
                    <div key={post.id} className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-body text-dark-text">{post.content}</p>
                          <p className="text-dark-grey font-body text-sm mt-1">
                            Scheduled for: {new Date(post.scheduledFor).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteScheduledPost(post.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Share */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">
              Quick Share
            </h3>
            <button
              onClick={shareBusinessProfile}
              className="w-full bg-gradient-to-r from-purple-500 to-rose-500 text-white px-4 py-3 rounded-lg font-body font-medium hover:from-purple-600 hover:to-rose-600 transition-colors"
            >
              📢 Share Business Profile
            </button>
            <p className="text-dark-grey font-body text-sm mt-2 text-center">
              Share your business on social media
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">
              Social Analytics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Total Posts</span>
                <span className="font-heading font-bold text-rose-500">{analytics.totalPosts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Engagement Rate</span>
                <span className="font-heading font-bold text-green-500">{analytics.engagementRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Best Time to Post</span>
                <span className="font-heading font-bold text-blue-500">{analytics.bestTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-dark-grey font-body">Followers Growth</span>
                <span className="font-heading font-bold text-purple-500">{analytics.followersGrowth}</span>
              </div>
            </div>
          </div>

          {/* Social Tips */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
            <h3 className="font-heading font-bold text-dark-text mb-4">
              Social Media Tips
            </h3>
            <ul className="space-y-2 text-dark-grey font-body text-sm">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">💡</span>
                Post during business hours (10AM-2PM)
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">💡</span>
                Share before/after photos
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">💡</span>
                Use relevant hashtags
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">💡</span>
                Engage with comments
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">💡</span>
                Share client testimonials
              </li>
            </ul>
          </div>

          {/* Cost Savings */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="font-heading font-bold text-lg mb-2">💰 Zero Cost</h3>
            <p className="font-body text-sm">
              All social media features included at no extra cost
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}