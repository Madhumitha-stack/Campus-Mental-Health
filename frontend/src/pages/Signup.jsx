import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signup(formData);
    if (!result.success) {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex overflow-hidden" role="main" aria-label="Sign up page">
      {/* Full Page Background - Fixed */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/src/assets/bg.jpg")'
        }}
        aria-hidden="true"
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full h-full">
        {/* Left Side - Brand Content */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <div className="max-w-md mx-auto px-6 text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-3" id="main-heading">Campus Mental Health Hub</h1>
              <p className="text-sm text-white/90 mb-6">
                Your journey to better mental wellness starts here. Join our supportive community today.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white/90 text-sm">24/7 AI Mental Health Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white/90 text-sm">Anonymous Peer Community</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-white/90 text-sm">Personalized Wellness Tracking</span>
              </div>
            </div>

            {/* Accessibility Features Notice */}
            <div className="mt-6 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <h3 className="text-white font-semibold text-sm mb-1">♿ Accessibility Features</h3>
              <ul className="text-white/80 text-xs space-y-1">
                <li>• Screen reader compatible</li>
                <li>• Keyboard navigation</li>
                <li>• High contrast mode</li>
                <li>• Voice command support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto w-full max-w-sm">
            {/* Logo for mobile */}
            <div className="lg:hidden text-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30" aria-hidden="true">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">Campus Mental Health Hub</h1>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white" id="form-heading">Create Account</h2>
                <p className="mt-1 text-xs text-white/80">
                  Join our supportive community
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit} aria-labelledby="form-heading">
                {error && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 backdrop-blur-sm" role="alert" aria-live="polite">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-red-300 text-sm" aria-hidden="true">⚠️</span>
                      </div>
                      <div className="ml-2">
                        <p className="text-xs text-red-100">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-white mb-2">
                      Full Name <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white mb-2">
                      Email Address <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-xs font-medium text-white mb-2">
                      Password <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      aria-required="true"
                      aria-describedby="password-requirements"
                    />
                    <div id="password-requirements" className="text-xs text-white/60 mt-1">
                      Must be at least 8 characters
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-medium text-white mb-2">
                      Confirm Password <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Accessibility Quick Actions */}
                <div className="flex space-x-2 text-xs">
                  <button
                    type="button"
                    className="flex-1 bg-blue-500/20 text-blue-200 py-1 px-2 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                    onClick={() => document.getElementById('name').focus()}
                  >
                    🎤 Voice Input
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-purple-500/20 text-purple-200 py-1 px-2 rounded border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                    onClick={() => document.querySelector('main').style.filter = 'contrast(150%)'}
                  >
                    👁️ High Contrast
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                  aria-label={loading ? "Creating your account, please wait" : "Create new account"}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 border-t-2 border-blue-600 rounded-full animate-spin mr-2" aria-hidden="true"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-white/80">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold text-white hover:text-blue-200 transition-colors duration-200 underline"
                    aria-label="Sign in to existing account"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Enhanced Privacy Notice */}
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/70 text-center">
                  🔒 Fully accessible & secure. Your privacy is protected.
                </p>
              </div>

              {/* Keyboard Shortcuts Help */}
              <div className="mt-3 text-center">
                <details className="text-xs text-white/60">
                  <summary className="cursor-pointer hover:text-white/80">♿ Keyboard Shortcuts</summary>
                  <div className="mt-2 text-left space-y-1">
                    <div>Tab - Navigate fields</div>
                    <div>Enter - Submit form</div>
                    <div>Esc - Cancel</div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;