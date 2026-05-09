import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SummaryCard from '../components/SummaryCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const [calculations, setCalculations] = useState([])
  const [bestModel, setBestModel] = useState(null)
  const [mostExpensiveModel, setMostExpensiveModel] = useState(null)

  // All 16 LLM Models with use cases
  const LLM_MODELS = [
    { company: 'OpenAI', model: 'GPT-5', useCase: 'Advanced reasoning, complex tasks' },
    { company: 'OpenAI', model: 'GPT-4o', useCase: 'Balanced performance, general use' },
    { company: 'OpenAI', model: 'GPT-4o Mini', useCase: 'Fast, lightweight tasks' },
    { company: 'OpenAI', model: 'GPT-4 Turbo', useCase: 'Complex reasoning, long context' },
    { company: 'Anthropic', model: 'Claude Opus 4.6', useCase: 'Most capable, complex reasoning' },
    { company: 'Anthropic', model: 'Claude Sonnet 3.5', useCase: 'Balanced speed and intelligence' },
    { company: 'Anthropic', model: 'Claude Haiku 3.5', useCase: 'Fast and lightweight' },
    { company: 'Google', model: 'Gemini 2.5 Pro', useCase: 'Advanced reasoning, multimodal' },
    { company: 'Google', model: 'Gemini 2.5 Flash', useCase: 'General use, balanced' },
    { company: 'Google', model: 'Gemini 3.1 Flash', useCase: 'Fast responses, general tasks' },
    { company: 'Google', model: 'Gemini 1.5 Flash', useCase: 'Cost-effective, lightweight' },
    { company: 'Meta', model: 'LLaMA 3.1 70B', useCase: 'Open source, cost-effective' },
    { company: 'Mistral', model: 'Mistral Medium', useCase: 'Balanced performance' },
    { company: 'Mistral', model: 'Mistral 8x7B', useCase: 'Cost-effective, open source' },
    { company: 'DeepSeek', model: 'DeepSeek v3', useCase: 'Affordable, efficient' },
    { company: 'Alibaba', model: 'Qwen 2.5', useCase: 'Budget-friendly, general use' },
  ]

  useEffect(() => {
    // Load calculations from localStorage
    const saved = localStorage.getItem('calculations')
    if (saved) {
      const data = JSON.parse(saved)
      setCalculations(data)
      
      // Calculate summary
      if (data.length > 0) {
        const latest = data[data.length - 1]
        setBestModel(latest.cheapestModel || 'N/A')
        
        // Find most expensive model
        if (latest.modelCosts && latest.modelCosts.length > 0) {
          const expensive = latest.modelCosts.reduce((prev, current) =>
            (prev.optimizedMonthlyCostUSD || 0) > (current.optimizedMonthlyCostUSD || 0) ? prev : current
          )
          setMostExpensiveModel(expensive.model || 'N/A')
        }
      }
    }
  }, [])

  const handleDeleteCalculation = (indexToDelete) => {
    const reversed = calculations.slice().reverse()
    const actualIndex = calculations.length - 1 - indexToDelete
    const updated = calculations.filter((_, idx) => idx !== actualIndex)
    setCalculations(updated)
    localStorage.setItem('calculations', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-s3k-dark mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your LLM Cost Calculator</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Most Expensive Model"
            value={mostExpensiveModel}
            subtitle="Premium Option"
            icon="💎"
          />
          <SummaryCard
            title="Best Model"
            value={bestModel}
            subtitle="Most Cost-Effective"
            icon="⭐"
          />
          <SummaryCard
            title="Total Calculations"
            value={calculations.length}
            subtitle="Total Analyses Run"
            icon="📊"
          />
        </div>

        {/* LLM Models Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-s3k-dark mb-4">📚 Available LLM Models & Use Cases</h2>
          <p className="text-gray-600 text-sm mb-4">Explore all 16 models and their best use cases</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Company</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Model Name</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-semibold">Best Use Case</th>
                </tr>
              </thead>
              <tbody>
                {LLM_MODELS.map((item, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-s3k-dark">{item.company}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{item.model}</td>
                    <td className="px-4 py-3 text-gray-600">{item.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Calculations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-s3k-dark mb-4">Recent Calculations</h2>
          {calculations.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No calculations yet. <a href="/calculator" className="text-primary font-semibold">Start calculating</a>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Date</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Users</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Total Cost (USD)</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Best Model</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.slice().reverse().map((calc, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{calc.date || 'N/A'}</td>
                      <td className="px-4 py-3">{calc.users || 'N/A'}</td>
                      <td className="px-4 py-3">${(calc.totalCost || 0).toFixed(2)}</td>
                      <td className="px-4 py-3">{calc.cheapestModel || 'N/A'}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteCalculation(idx)}
                          className="text-red-500 hover:text-red-700 font-semibold transition"
                          title="Delete this calculation"
                        >
                          ✕ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
