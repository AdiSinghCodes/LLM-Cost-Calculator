import { useState } from 'react'

export default function ComparisonTable({ models, inputs }) {
  const [activeTab, setActiveTab] = useState('overview')

  // Safety check for models
  if (!models || models.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 text-center">No models to compare</p>
      </div>
    )
  }

  const cheapestModel = models.reduce((prev, current) =>
    (prev.optimizedMonthlyCostUSD || 0) < (current.optimizedMonthlyCostUSD || 0) ? prev : current
  )

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-s3k-dark mb-4">📈 Model Comparison</h2>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('detailed')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'detailed' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
        >
          Detailed Breakdown
        </button>
        {inputs?.cacheHitPercent > 0 && (
          <button
            onClick={() => setActiveTab('optimization')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'optimization' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
          >
            Optimization
          </button>
        )}
        {inputs?.clientRevenueINR > 0 && (
          <button
            onClick={() => setActiveTab('profit')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'profit' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
          >
            Profit Analysis
          </button>
        )}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Company</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Model</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Monthly USD</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Monthly INR</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Annual USD</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    model.id === cheapestModel.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-s3k-dark">{model.company}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {model.model}
                    {model.id === cheapestModel.id && (
                      <span className="ml-2 inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">
                        💰 Cheapest
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-primary">
                    ${model.optimizedMonthlyCostUSD.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-s3k-teal">
                    ₹{model.optimizedMonthlyCostINR.toFixed(0)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ${model.annualCostUSD.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{model.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: DETAILED BREAKDOWN */}
      {activeTab === 'detailed' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Model</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Cost/User</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Cost/Chat</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Monthly</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Annual</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    model.id === cheapestModel.id ? 'bg-green-50' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{model.company} - {model.model}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="text-gray-700 font-medium">${model.costPerUserUSD.toFixed(2)}</div>
                    <div className="text-gray-600 text-xs">₹{model.costPerUserINR.toFixed(0)}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="text-gray-700 font-medium">${model.costPerChatUSD.toFixed(4)}</div>
                    <div className="text-gray-600 text-xs">₹{model.costPerChatINR.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-primary">
                    ${model.optimizedMonthlyCostUSD.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-s3k-dark">
                    ${model.annualCostUSD.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: OPTIMIZATION */}
      {activeTab === 'optimization' && inputs?.cacheHitPercent > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Model</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Original Cost</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Optimized Cost</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Savings (USD)</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Savings %</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    model.id === cheapestModel.id ? 'bg-green-50' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{model.company} - {model.model}</td>
                  <td className="px-4 py-3 text-right text-gray-600">${model.monthlyCostUSD.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-s3k-teal">
                    ${model.optimizedMonthlyCostUSD.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-600">
                    ${model.cacheSavingsUSD.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">
                    {model.savingsPercent.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: PROFIT ANALYSIS */}
      {activeTab === 'profit' && inputs?.clientRevenueINR > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Model</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Monthly Cost</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Profit (INR)</th>
                <th className="px-4 py-3 text-right text-gray-700 font-semibold">Profit %</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    model.id === cheapestModel.id ? 'bg-green-50' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{model.company} - {model.model}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ₹{model.optimizedMonthlyCostINR.toFixed(0)}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${model.profitINR >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{model.profitINR.toFixed(0)}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${model.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {model.profitPercent.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          💡 <span className="font-semibold">Note:</span> All costs shown are optimized (after cache, if entered). 
          {inputs?.cacheHitPercent > 0 && ` Cache hit: ${inputs.cacheHitPercent}%`}
          {inputs?.clientRevenueINR > 0 && ` | Client revenue: ₹${inputs.clientRevenueINR.toLocaleString()}`}
        </p>
      </div>
    </div>
  )
}
