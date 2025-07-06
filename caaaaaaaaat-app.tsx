import React, { useState, useRef, useEffect } from 'react';
import { Heart, ArrowUp, Info } from 'lucide-react';

const CatApp = () => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [expandedComment, setExpandedComment] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    title: '',
    content: '',
    email: '',
    imageLink: ''
  });
  const inputRef = useRef(null);
  const listRef = useRef(null);
  
  const maxCharacters = 280;
  
  // Auto-generated cat avatars
  const catAvatars = [
    '🐱', '😺', '😸', '😹', '😻', '🙀', '😿', '😾', '🐈', '🐈‍⬛'
  ];
  
  const adComments = [
    "Check out our premium cat food! 🐟",
    "New cat toys available now! 🧸",
    "Cat health insurance - protect your furry friend! 🏥"
  ];
  
  const generateCatProfile = (index) => {
    return catAvatars[index % catAvatars.length];
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setInputValue(value);
      setCharacterCount(value.length);
    }
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Submit clicked', inputValue); // Debug log
    if (inputValue.trim()) {
      const newComment = {
        id: Date.now(),
        text: inputValue,
        avatar: generateCatProfile(comments.length),
        likes: Math.floor(Math.random() * 50),
        isLiked: false,
        timestamp: new Date(),
        author: `Cat lover ${comments.length + 1}`
      };
      
      setComments(prev => [newComment, ...prev]);
      setInputValue('');
      setCharacterCount(0);
      setInputFocused(false);
      
      // Scroll to bottom after animation
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };
  
  const handleLike = (id, isAd = false) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
        : comment
    ));
  };
  
  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('Form submitted:', submitForm);
    // Here you would typically send the data to your backend
    alert('Thank you for your submission! We\'ll review it soon.');
    setSubmitForm({ title: '', content: '', email: '', imageLink: '' });
    setShowSubmitModal(false);
  };
  
  const handleFormChange = (field, value) => {
    setSubmitForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  // Add some sample ads mixed in with comments
  const displayItems = [...comments];
  if (comments.length > 2) {
    displayItems.splice(2, 0, {
      id: 'ad-1',
      text: adComments[0],
      avatar: '🎯',
      likes: 12,
      isLiked: false,
      timestamp: new Date(),
      author: 'Sponsored',
      isAd: true
    });
  }
  
  return (
    <div className="max-w-[600px] mx-auto bg-white min-h-screen relative">
      <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet" />
      <style>
        {`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}
      </style>
      
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-normal" style={{ fontFamily: 'Gowun Batang, serif' }}>
          caaaaaaaaat
        </h1>
      </header>
      
      {/* Content Area */}
              <div className="relative bg-gray-50 mx-4 mt-6 rounded-lg overflow-hidden" style={{ aspectRatio: '600/750' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🐱</div>
            <p className="text-gray-600 text-lg">Today's featured moment</p>
          </div>
        </div>
        
        {/* Date and Editor */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {formatDate(new Date())}
          </span>
          <span className="text-xs text-gray-500">
            Edited by Luna Martinez
          </span>
        </div>
      </div>
      
      {/* Input Field */}
      <div className="p-4">
        <div className={`relative bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 ${inputFocused ? 'ring-2 ring-blue-100 border-blue-200' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              console.log('Input focused'); // Debug log
              setInputFocused(true);
            }}
            onBlur={(e) => {
              // Only blur if not clicking the send button
              if (!e.relatedTarget || !e.relatedTarget.closest('.send-button')) {
                console.log('Input blurred'); // Debug log
                setTimeout(() => setInputFocused(false), 100);
              }
            }}
            placeholder="one comment per day"
            className="w-full px-4 py-3 pr-16 rounded-lg border-none outline-none placeholder-gray-400"
            style={{ fontSize: '16px' }}
          />
          
          {inputFocused && inputValue.trim() && (
            <button
              onClick={handleSubmit}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
              className="send-button absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:bg-gray-800 cursor-pointer"
            >
              <ArrowUp size={16} />
            </button>
          )}
        </div>
        
        {characterCount > maxCharacters * 0.8 && (
          <div className="text-right mt-2 text-sm text-gray-500">
            {characterCount}/{maxCharacters}
          </div>
        )}
      </div>
      
      {/* Comments List */}
      {displayItems.length > 0 && (
        <div className="px-4 pb-4" ref={listRef}>
          {displayItems.map((item, index) => (
            <div key={item.id} className={`mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ${expandedComment === item.id ? 'shadow-md' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                  {item.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.author}</span>
                    {item.isAd && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Sponsored</span>
                    )}
                  </div>
                  
                  <p className="text-gray-800 text-sm mb-2">{item.text}</p>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(item.id, item.isAd)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors duration-200"
                    >
                      <Heart 
                        size={20} 
                        className={`transition-all duration-200 ${item.isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} 
                        style={item.isAd ? { background: 'linear-gradient(45deg, #ec4899, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: item.isLiked ? 'transparent' : 'currentColor' } : {}}
                      />
                      <span className="text-sm">{item.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => setExpandedComment(expandedComment === item.id ? null : item.id)}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {expandedComment === item.id ? 'Less' : 'More'}
                    </button>
                  </div>
                  
                  {expandedComment === item.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100 transition-all duration-300">
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>ID: {item.id}</div>
                        <div>Time: {item.timestamp.toLocaleTimeString()}</div>
                        <div>Likes: {item.likes}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Footer */}
      <footer className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 w-full">
        <div className="flex justify-between items-center max-w-[600px] mx-auto">
          <button 
            onClick={() => setShowAboutModal(true)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <Info size={16} />
            <span className="text-sm">About</span>
          </button>
          
          <button 
            onClick={() => setShowSubmitModal(true)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Submit your cat
          </button>
        </div>
      </footer>
      
      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-xl w-full max-w-[600px] p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">About caaaaaaaaat</h2>
              <button 
                onClick={() => setShowAboutModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Welcome to caaaaaaaaat, a place where cat lovers share their daily moments and connect through the universal language of feline affection.
              </p>
              <p>
                Each day brings a new featured moment, carefully curated by our community of cat enthusiasts. Share your thoughts, spread the love, and discover the joy that cats bring to our lives.
              </p>
              <p className="text-xs text-gray-500 pt-2 border-t">
                Made with 🐱 for cat lovers everywhere
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Submit Your Cat</h2>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={submitForm.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={submitForm.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none"
                  placeholder="Give your cat moment a title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  required
                  value={submitForm.content}
                  onChange={(e) => handleFormChange('content', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none resize-none"
                  placeholder="Tell us about your cat moment..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Link
                </label>
                <input
                  type="url"
                  value={submitForm.imageLink}
                  onChange={(e) => handleFormChange('imageLink', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 outline-none"
                  placeholder="https://example.com/your-cat-photo.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Add a link to your cat photo
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatApp;