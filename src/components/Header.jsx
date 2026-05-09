import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80" onClick={() => navigate('/dashboard')}>
            <img 
              src="/logo.jpeg" 
              alt="S3K Tech.ai Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-s3k-dark">LLM Cost Calculator</h1>
              <p className="text-xs text-gray-600">S3K Tech.ai</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-primary font-medium text-sm transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/calculator')}
                className="text-gray-600 hover:text-primary font-medium text-sm transition"
              >
                Calculator
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
              {user && (
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-s3k-dark">{user.email}</p>
                  <p className="text-xs text-gray-600">Logged in</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-s3k-red hover:bg-s3k-red/90 rounded-lg transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
