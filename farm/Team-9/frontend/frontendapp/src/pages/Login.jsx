import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAdminLoggedIn, setIsCMLLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Static user credentials
  const staticUsers = {
    'admin@example.com': {
      password: 'admin123',
      role: 'admin',
      name: 'Administrator'
    },
    'cml@example.com': {
      password: 'cml123',
      role: 'user',
      name: 'CML Staff'
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = staticUsers[form.email];
      
      if (!user || user.password !== form.password) {
        throw new Error('Invalid email or password');
      }

      // Create a mock token
      const mockToken = `mock_token_${Date.now()}_${user.role}`;
      
      // Store user data in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userData', JSON.stringify({ 
        email: form.email, 
        role: user.role,
        name: user.name 
      }));

      if (user.role === 'admin') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        setIsAdminLoggedIn(true);
        navigate('/admin/home');
      } else if (user.role === 'user') {
        localStorage.setItem('isCMLLoggedIn', 'true');
        setIsCMLLoggedIn(true);
        navigate('/cml/home');
      } else {
        throw new Error('Unknown role');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            CML Livelihood Tracker
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-sm text-center text-gray-500">
            <p>Demo credentials:</p>
            <p className="mt-1 text-xs">Email: admin@example.com / Password: admin123</p>
            <p className="text-xs">Email: cml@example.com / Password: cml123</p>
          </div>

          <div className="text-sm text-center text-gray-500">
            <p>Don't have an account? </p>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-green-600 hover:text-green-500"
            >
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;