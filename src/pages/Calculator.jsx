import { useState } from 'react'
import Header from '../components/Header'
import ComparisonTable from '../components/ComparisonTable'

// LLM Models with pricing (per 1M tokens)
const LLM_MODELS = [
  // OpenAI Models
  {
    id: 1,
    company: 'OpenAI',
    model: 'GPT-5',
    inputPrice: 1.75,
    outputPrice: 14,
    useCase: 'Advanced reasoning, complex tasks'
  },
  {
    id: 2,
    company: 'OpenAI',
    model: 'GPT-4o',
    inputPrice: 0.25,
    outputPrice: 1.0,
    useCase: 'Balanced performance, general use'
  },
  {
    id: 3,
    company: 'OpenAI',
    model: 'GPT-4o Mini',
    inputPrice: 0.15,
    outputPrice: 0.6,
    useCase: 'Fast, lightweight tasks'
  },
  {
    id: 4,
    company: 'OpenAI',
    model: 'GPT-4 Turbo',
    inputPrice: 0.3,
    outputPrice: 1.2,
    useCase: 'Complex reasoning, long context'
  },

  // Anthropic Models
  {
    id: 5,
    company: 'Anthropic',
    model: 'Claude Opus 4.6',
    inputPrice: 5,
    outputPrice: 25,
    useCase: 'Most capable, complex reasoning'
  },
  {
    id: 6,
    company: 'Anthropic',
    model: 'Claude Sonnet 3.5',
    inputPrice: 3,
    outputPrice: 15,
    useCase: 'Balanced speed and intelligence'
  },
  {
    id: 7,
    company: 'Anthropic',
    model: 'Claude Haiku 3.5',
    inputPrice: 1,
    outputPrice: 5,
    useCase: 'Fast and lightweight'
  },

  // Google Models
  {
    id: 8,
    company: 'Google',
    model: 'Gemini 2.5 Pro',
    inputPrice: 1.25,
    outputPrice: 10,
    useCase: 'Advanced reasoning, multimodal'
  },
  {
    id: 9,
    company: 'Google',
    model: 'Gemini 2.5 Flash',
    inputPrice: 0.3,
    outputPrice: 1.5,
    useCase: 'General use, balanced'
  },
  {
    id: 10,
    company: 'Google',
    model: 'Gemini 3.1 Flash',
    inputPrice: 0.25,
    outputPrice: 1.5,
    useCase: 'Fast responses, general tasks'
  },
  {
    id: 11,
    company: 'Google',
    model: 'Gemini 1.5 Flash',
    inputPrice: 0.2,
    outputPrice: 0.8,
    useCase: 'Cost-effective, lightweight'
  },

  // Meta Models
  {
    id: 12,
    company: 'Meta',
    model: 'LLaMA 3.1 70B',
    inputPrice: 0.58,
    outputPrice: 0.71,
    useCase: 'Open source, cost-effective'
  },

  // Mistral Models
  {
    id: 13,
    company: 'Mistral',
    model: 'Mistral Medium',
    inputPrice: 0.4,
    outputPrice: 2,
    useCase: 'Balanced performance'
  },
  {
    id: 14,
    company: 'Mistral',
    model: 'Mistral 8x7B',
    inputPrice: 0.14,
    outputPrice: 0.42,
    useCase: 'Cost-effective, open source'
  },

  // DeepSeek Models
  {
    id: 15,
    company: 'DeepSeek',
    model: 'DeepSeek v3',
    inputPrice: 0.14,
    outputPrice: 0.28,
    useCase: 'Affordable, efficient'
  },

  // Alibaba Models
  {
    id: 16,
    company: 'Alibaba',
    model: 'Qwen 2.5',
    inputPrice: 0.1,
    outputPrice: 0.15,
    useCase: 'Budget-friendly, general use'
  },
]

export default function Calculator() {
  const [inputs, setInputs] = useState({
    users: 100,
    chatsPerDay: 5,
    daysPerMonth: 30,
    inputWordsPerChat: 100,
    outputWordsPerChat: 200,
    tokensPerWord: 1.3,
    exchangeRate: 83,
    cacheHitPercent: 0,
  })

  const [results, setResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const calculateCosts = (e) => {
    e.preventDefault()

    // ============ CORE CALCULATIONS ============
    const totalChats = inputs.users * inputs.chatsPerDay * inputs.daysPerMonth
    const inputTokensPerChat = inputs.inputWordsPerChat * inputs.tokensPerWord
    const outputTokensPerChat = inputs.outputWordsPerChat * inputs.tokensPerWord
    const totalInputTokens = totalChats * inputTokensPerChat
    const totalOutputTokens = totalChats * outputTokensPerChat

    // Convert to millions
    const monthlyInputTokensMn = totalInputTokens / 1000000
    const monthlyOutputTokensMn = totalOutputTokens / 1000000

    // Clamp cache hit percentage
    const cacheHitPercent = Math.max(0, Math.min(100, inputs.cacheHitPercent))
    const effectiveTokenFactor = 1 - (cacheHitPercent / 100)
    const effectiveInputTokensMn = monthlyInputTokensMn * effectiveTokenFactor
    const effectiveOutputTokensMn = monthlyOutputTokensMn * effectiveTokenFactor

    // ============ CALCULATE COSTS FOR EACH MODEL ============
    const modelCosts = LLM_MODELS.map(model => {
      // Original costs (without cache)
      const inputCost = monthlyInputTokensMn * model.inputPrice
      const outputCost = monthlyOutputTokensMn * model.outputPrice
      const monthlyCostUSD = inputCost + outputCost
      const monthlyCostINR = monthlyCostUSD * inputs.exchangeRate

      // Optimized costs (with cache)
      const optimizedInputCost = effectiveInputTokensMn * model.inputPrice
      const optimizedOutputCost = effectiveOutputTokensMn * model.outputPrice
      const optimizedMonthlyCostUSD = optimizedInputCost + optimizedOutputCost
      const optimizedMonthlyCostINR = optimizedMonthlyCostUSD * inputs.exchangeRate

      // Cache savings
      const cacheSavingsUSD = monthlyCostUSD - optimizedMonthlyCostUSD
      const cacheSavingsINR = monthlyCostINR - optimizedMonthlyCostINR
      const savingsPercent = monthlyCostUSD > 0 ? (cacheSavingsUSD / monthlyCostUSD) * 100 : 0

      // Per user and per chat costs (using optimized cost)
      const costPerUserUSD = inputs.users > 0 ? optimizedMonthlyCostUSD / inputs.users : 0
      const costPerUserINR = inputs.users > 0 ? optimizedMonthlyCostINR / inputs.users : 0
      const costPerChatUSD = totalChats > 0 ? optimizedMonthlyCostUSD / totalChats : 0
      const costPerChatINR = totalChats > 0 ? optimizedMonthlyCostINR / totalChats : 0

      // Annual costs
      const annualCostUSD = optimizedMonthlyCostUSD * 12
      const annualCostINR = optimizedMonthlyCostINR * 12

      // Profit calculation
      const profitINR = 0
      const profitPercent = 0

      return {
        ...model,
        // Original
        monthlyCostUSD,
        monthlyCostINR,
        inputCost,
        outputCost,
        // Optimized
        optimizedMonthlyCostUSD,
        optimizedMonthlyCostINR,
        cacheSavingsUSD,
        cacheSavingsINR,
        savingsPercent,
        // Per user/chat
        costPerUserUSD,
        costPerUserINR,
        costPerChatUSD,
        costPerChatINR,
        // Annual
        annualCostUSD,
        annualCostINR,
        // Profit
        profitINR,
        profitPercent
      }
    })

    // Find cheapest model (based on optimized cost)
    const cheapestModel = modelCosts.reduce((prev, current) =>
      prev.optimizedMonthlyCostUSD < current.optimizedMonthlyCostUSD ? prev : current
    )

    const result = {
      // Usage metrics
      totalChats,
      totalInputTokens: totalInputTokens,
      totalOutputTokens: totalOutputTokens,
      totalTokens: totalInputTokens + totalOutputTokens,
      monthlyInputTokensMn: monthlyInputTokensMn,
      monthlyOutputTokensMn: monthlyOutputTokensMn,

      // Business metrics (using cheapest model)
      monthlyCostUSD: cheapestModel.monthlyCostUSD,
      monthlyCostINR: cheapestModel.monthlyCostINR,
      costPerUserUSD: cheapestModel.costPerUserUSD,
      costPerUserINR: cheapestModel.costPerUserINR,
      costPerChatUSD: cheapestModel.costPerChatUSD,
      costPerChatINR: cheapestModel.costPerChatINR,
      annualCostUSD: cheapestModel.annualCostUSD,
      annualCostINR: cheapestModel.annualCostINR,

      // Optimization metrics
      cacheHitPercent,
      optimizedMonthlyCostUSD: cheapestModel.optimizedMonthlyCostUSD,
      optimizedMonthlyCostINR: cheapestModel.optimizedMonthlyCostINR,
      cacheSavingsUSD: cheapestModel.cacheSavingsUSD,
      cacheSavingsINR: cheapestModel.cacheSavingsINR,
      savingsPercent: cheapestModel.savingsPercent,
      effectiveInputTokensMn: effectiveInputTokensMn,
      effectiveOutputTokensMn: effectiveOutputTokensMn,

      // Profit metrics
      clientRevenueINR: 0,
      profitINR: 0,
      profitPercent: 0,

      // Model details
      modelCosts,
      cheapestModel: cheapestModel.model,
      date: new Date().toLocaleDateString()
    }

    setResults(result)

    // Save to localStorage
    const calculations = JSON.parse(localStorage.getItem('calculations') || '[]')
    calculations.push({
      ...result,
      users: inputs.users,
      totalCost: cheapestModel.optimizedMonthlyCostUSD
    })
    localStorage.setItem('calculations', JSON.stringify(calculations))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-s3k-dark mb-2">LLM Cost Calculator</h1>
          <p className="text-gray-600">Enter your usage assumptions to compare LLM costs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-s3k-dark mb-6">Usage Inputs</h2>
              
              <form onSubmit={calculateCosts} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Users
                  </label>
                  <input
                    type="number"
                    name="users"
                    value={inputs.users}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chats per User per Day
                  </label>
                  <input
                    type="number"
                    name="chatsPerDay"
                    value={inputs.chatsPerDay}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days per Month
                  </label>
                  <input
                    type="number"
                    name="daysPerMonth"
                    value={inputs.daysPerMonth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Input Words per Chat
                  </label>
                  <input
                    type="number"
                    name="inputWordsPerChat"
                    value={inputs.inputWordsPerChat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Output Words per Chat
                  </label>
                  <input
                    type="number"
                    name="outputWordsPerChat"
                    value={inputs.outputWordsPerChat}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tokens per Word
                  </label>
                  <input
                    type="number"
                    name="tokensPerWord"
                    value={inputs.tokensPerWord}
                    step="0.1"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    USD to INR Exchange Rate
                  </label>
                  <input
                    type="number"
                    name="exchangeRate"
                    value={inputs.exchangeRate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <hr className="my-4" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cache Hit Percentage (%)
                  </label>
                  <input
                    type="number"
                    name="cacheHitPercent"
                    value={inputs.cacheHitPercent}
                    min="0"
                    max="100"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">0-100: % of queries served from cache</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition mt-6"
                >
                  Calculate Costs
                </button>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* ============ SECTION 1: USAGE METRICS ============ */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <h2 className="text-lg font-bold text-s3k-dark mb-4">📊 Usage Metrics</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Total Chats</p>
                      <p className="text-2xl font-bold text-s3k-dark">{results.totalChats.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Total Tokens</p>
                      <p className="text-2xl font-bold text-s3k-dark">{(results.totalTokens / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Cheapest Model</p>
                      <p className="text-xl font-bold text-s3k-red">{results.cheapestModel}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Monthly Cost</p>
                      <p className="text-xl font-bold text-primary">${results.optimizedMonthlyCostUSD.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* ============ SECTION 2: OPTIMIZATION METRICS ============ */}
                {results.cacheHitPercent > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <h2 className="text-lg font-bold text-s3k-dark mb-4">⚡ Optimization Metrics (Cache: {results.cacheHitPercent}%)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Original Cost</p>
                        <p className="text-lg font-bold text-gray-600">${results.monthlyCostUSD.toFixed(2)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Optimized Cost</p>
                        <p className="text-lg font-bold text-s3k-teal">${results.optimizedMonthlyCostUSD.toFixed(2)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Cache Savings</p>
                        <p className="text-lg font-bold text-green-600">${results.cacheSavingsUSD.toFixed(2)}</p>
                        <p className="text-xs text-gray-600">{results.savingsPercent.toFixed(1)}% saved</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Effective Tokens</p>
                        <p className="text-lg font-bold text-s3k-dark">{(results.effectiveInputTokensMn + results.effectiveOutputTokensMn).toFixed(2)}M</p>
                        <p className="text-xs text-gray-600">vs {(results.monthlyInputTokensMn + results.monthlyOutputTokensMn).toFixed(2)}M original</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ============ COMPARISON TABLE ============ */}
                <ComparisonTable models={results.modelCosts} inputs={inputs} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">
                  Fill in the inputs and click "Calculate Costs" to see the comparison
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
