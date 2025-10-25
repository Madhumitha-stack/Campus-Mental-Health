import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [highContrast, setHighContrast] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(email, password);
        if (!result.success) {
            setError(result.error || 'Login failed');
        }
        setLoading(false);
    };

    const handleGoogleSignIn = () => {
        // Add Google authentication logic here
        console.log('Google sign in clicked');
        // You can integrate Firebase Auth or other OAuth providers here
    };

    const toggleHighContrast = () => {
        setHighContrast(!highContrast);
        document.body.classList.toggle('high-contrast-mode');
    };

    const handleVoiceInput = (field) => {
        // Voice input simulation - in real app, integrate with Web Speech API
        alert(`Voice input activated for ${field}. Please allow microphone access.`);
    };

    return (
        <div className={`h-screen flex overflow-hidden ${highContrast ? 'high-contrast' : ''}`} role="main" aria-label="Login page">
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

            {/* Accessibility Quick Actions Bar */}
            <div className="fixed top-4 right-4 z-20 flex space-x-2">
                <button
                    onClick={toggleHighContrast}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                    aria-label="Toggle high contrast mode"
                >
                    {highContrast ? '👁️ Normal View' : '👁️ High Contrast'}
                </button>
                <button
                    onClick={() => handleVoiceInput('all fields')}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-colors"
                    aria-label="Activate voice input"
                >
                    🎤 Voice Input
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10 flex w-full h-full">
                {/* Left Side - Brand Content */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
                    <div className="max-w-md mx-auto px-8 text-white">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30" aria-hidden="true">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-3" id="main-heading">Welcome Back</h1>
                            <p className="text-sm text-white/90 mb-6">
                                Continue your mental wellness journey. Access your personalized support and resources.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                                <span className="text-white/90 text-sm">Access your wellness history</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                                <span className="text-white/90 text-sm">Connect with your support network</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center" aria-hidden="true">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                                <span className="text-white/90 text-sm">Track your progress</span>
                            </div>
                        </div>

                        {/* Accessibility Features Section */}
                        <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                            <h3 className="text-white font-semibold text-sm mb-2">♿ Accessibility Features</h3>
                            <ul className="text-white/80 text-xs space-y-1">
                                <li>• Screen reader compatible</li>
                                <li>• Keyboard navigation</li>
                                <li>• High contrast mode</li>
                                <li>• Voice command support</li>
                                <li>• Large click targets</li>
                                <li>• Focus indicators</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-12">
                    <div className="mx-auto w-full max-w-sm">
                        {/* Logo for mobile */}
                        <div className="lg:hidden text-center mb-6">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30" aria-hidden="true">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold text-white">Campus Mental Health Hub</h1>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-6">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h1 className="text-xl font-bold text-white mb-1" id="form-heading">Welcomes You</h1>
                                <p className="text-xs text-white/60">Press Tab to navigate, Enter to submit</p>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit} aria-labelledby="form-heading">
                                {error && (
                                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 backdrop-blur-sm" role="alert" aria-live="assertive">
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

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-medium text-white mb-2">
                                        Email Address <span className="text-red-400" aria-hidden="true">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm pr-10"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            aria-required="true"
                                            aria-describedby="email-help"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleVoiceInput('email')}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                            aria-label="Voice input for email"
                                        >
                                            🎤
                                        </button>
                                    </div>
                                    <div id="email-help" className="text-xs text-white/60 mt-1">
                                        Enter your registered email address
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-xs font-medium text-white mb-2">
                                        Password <span className="text-red-400" aria-hidden="true">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm pr-10"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            aria-required="true"
                                            aria-describedby="password-help"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleVoiceInput('password')}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                            aria-label="Voice input for password"
                                        >
                                            🎤
                                        </button>
                                    </div>
                                    <div id="password-help" className="text-xs text-white/60 mt-1">
                                        Enter your secure password
                                    </div>
                                </div>

                                {/* Remember Me and Sign Up */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 bg-white/5 border-white/20 rounded focus:ring-2 focus:ring-blue-400 text-blue-600"
                                            aria-describedby="remember-help"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-xs text-white/80">
                                            Remember this device
                                        </label>
                                    </div>

                                    <div className="text-xs">
                                        <Link
                                            to="/signup"
                                            className="font-medium text-white hover:text-blue-200 transition-colors duration-200 underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent rounded"
                                            aria-label="Create a new account"
                                        >
                                            Create an account
                                        </Link>
                                    </div>
                                </div>
                                <div id="remember-help" className="text-xs text-white/60">
                                    Stay logged in on this device for faster access
                                </div>

                                {/* Sign In Button */}
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 min-h-[42px]"
                                        aria-label={loading ? "Signing in, please wait" : "Sign in to your account"}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-3 h-3 border-t-2 border-blue-600 rounded-full animate-spin mr-2" aria-hidden="true"></div>
                                                SIGNING IN...
                                            </div>
                                        ) : (
                                            'SIGN IN'
                                        )}
                                    </button>

                                    {/* Divider */}
                                    <div className="relative my-4" aria-hidden="true">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/20"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-2 bg-transparent text-white/70">or continue with</span>
                                        </div>
                                    </div>

                                    {/* Google Sign In Button */}
                                    <button
                                        onClick={handleGoogleSignIn}
                                        className="w-full flex items-center justify-center px-3 py-2 bg-white text-gray-700 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500/20 min-h-[42px]"
                                        aria-label="Sign in with Google account"
                                    >
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        SIGN IN WITH GOOGLE
                                    </button>
                                </div>
                            </form>

                            {/* Enhanced Privacy Notice */}
                            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-xs text-white/70 text-center">
                                    🔒 Fully accessible & secure. Your privacy is protected.
                                </p>
                            </div>

                            {/* Keyboard Navigation Help */}
                            <details className="mt-3 text-center">
                                <summary className="cursor-pointer text-xs text-white/60 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1">
                                    ♿ Keyboard Shortcuts Help
                                </summary>
                                <div className="mt-2 text-left text-xs text-white/60 space-y-1 p-2 bg-white/5 rounded">
                                    <div><strong>Tab</strong> - Navigate between fields</div>
                                    <div><strong>Shift + Tab</strong> - Navigate backwards</div>
                                    <div><strong>Enter</strong> - Submit form or activate buttons</div>
                                    <div><strong>Space</strong> - Toggle checkboxes</div>
                                    <div><strong>Escape</strong> - Close dialogs or cancel</div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skip to main content link for screen readers */}
            <a href="#main-heading" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-30">
                Skip to main content
            </a>
        </div>
    );
};

export default Login;