import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: '💰',
      title: 'Cost Comparison',
      desc: 'Compare pricing across 16+ LLM models instantly'
    },
    {
      icon: '📊',
      title: 'Budget Planning',
      desc: 'Calculate monthly and annual AI costs accurately'
    },
    {
      icon: '⚡',
      title: 'Optimization',
      desc: 'Discover cache savings and cost optimization strategies'
    },
    {
      icon: '💼',
      title: 'Profit Analysis',
      desc: 'Understand margins and business metrics in detail'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-10 py-3 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="S3K Tech.ai" className="w-10 h-10" />
            <div>
              <h1 className="text-s3k-dark font-bold text-lg">S3K Tech.ai</h1>
              <p className="text-gray-500 text-xs leading-none">AI Assisted, Human Governed</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-s3k-teal hover:bg-s3k-teal/90 text-white font-semibold rounded-lg transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-s3k-dark mb-4 leading-tight">
            LLM Cost
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-s3k-teal to-cyan-500">
              Intelligence Platform
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Make smarter AI purchasing decisions with real-time cost analysis and optimization
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Compare LLM costs across OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek and more. 
            Calculate true AI expenses, optimize with caching, and maximize profit margins.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-s3k-teal hover:bg-s3k-teal/90 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-md"
            >
              Start Calculating Now
            </button>
            <button
              onClick={() => document.querySelector('#features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-s3k-teal text-s3k-teal hover:bg-s3k-teal/5 font-bold rounded-lg transition"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <p className="text-3xl font-bold text-primary">16+</p>
              <p className="text-gray-700 text-sm font-medium">LLM Models</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <p className="text-3xl font-bold text-green-600">$0</p>
              <p className="text-gray-700 text-sm font-medium">No Hidden Fees</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <p className="text-3xl font-bold text-purple-600">Real-time</p>
              <p className="text-gray-700 text-sm font-medium">Calculations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-s3k-dark text-center mb-4">Powerful Features</h3>
          <p className="text-gray-600 text-center mb-16">Everything you need for AI cost intelligence</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:border-s3k-teal hover:shadow-lg transition transform hover:scale-105"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h4 className="text-s3k-dark font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-s3k-dark text-center mb-4">Supported LLM Providers</h3>
          <p className="text-gray-600 text-center mb-16">Compare all major AI models in one place</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral', 'DeepSeek', 'Alibaba', 'AWS'].map((provider, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 text-center hover:border-s3k-teal hover:shadow-md transition"
              >
                <p className="text-s3k-dark font-semibold">{provider}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-s3k-teal/10 to-cyan-500/10 border border-s3k-teal/30 p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold text-s3k-dark mb-4">Ready to optimize your AI costs?</h3>
          <p className="text-gray-600 mb-8">Start your free analysis now. No credit card required.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-s3k-teal hover:bg-s3k-teal/90 text-white font-bold rounded-lg transition shadow-md"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 text-center text-gray-600 text-sm bg-gray-50">
        <p>© 2026 S3K Tech.ai. AI Assisted, Human Governed.</p>
      </footer>
    </div>
  )
}
