# LLM Cost Calculator

A web-based tool to compare monthly and annual costs across 16 different Large Language Models. Calculate your LLM expenses in real-time based on your usage patterns and find the most cost-effective model for your business.

## 🎯 Project Overview

The LLM Cost Calculator helps businesses make informed decisions about which AI model to use based on their actual usage patterns and budget. Instead of guessing, you can input your expected usage and instantly see how much each model will cost monthly and annually.

**Key Benefit:** Compare all 16 models side-by-side and find potential savings through cache optimization.

## ✨ Features

- **16 LLM Models Comparison** - Compare costs across OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, and Alibaba
- **Real-time Cost Calculations** - Instant calculations in USD & INR
- **Per-User & Per-Chat Analytics** - Understand cost per user and cost per conversation
- **Cache Hit Optimization** - See savings from prompt caching (reduce token costs by up to 90%)
- **Annual Projections** - Plan long-term budgets with yearly cost forecasts
- **User Authentication** - Create accounts and save calculation history
- **Calculation History** - Track and delete previous calculations
- **Professional Dashboard** - View all models and recent calculations at a glance

## 🤖 Supported Models (16 Total)

### OpenAI (4 models)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| GPT-5 | $1.75/1M | $14.00/1M | Advanced reasoning |
| GPT-4o | $0.25/1M | $1.00/1M | General purpose |
| GPT-4o Mini | $0.075/1M | $0.30/1M | Cost-effective |
| GPT-4 Turbo | $0.03/1M | $0.06/1M | Legacy option |

### Anthropic (3 models)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| Claude Opus 4.6 | $3.00/1M | $15.00/1M | Complex tasks |
| Claude Sonnet 3.5 | $3.00/1M | $15.00/1M | Balanced |
| Claude Haiku 3.5 | $0.80/1M | $4.00/1M | Fast & cheap |

### Google (4 models)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| Gemini 2.5 Pro | $1.25/1M | $5.00/1M | Advanced AI |
| Gemini 2.5 Flash | $0.075/1M | $1.50/1M | Fast responses |
| Gemini 3.1 Flash | $0.075/1M | $0.30/1M | Ultra-fast |
| Gemini 1.5 Flash | $0.075/1M | $0.30/1M | Budget option |

### Meta (1 model)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| LLaMA 3.1 70B | $0.35/1M | $1.40/1M | Open source power |

### Mistral (2 models)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| Mistral Medium | $0.27/1M | $0.81/1M | Balanced |
| Mistral 8x7B | $0.24/1M | $0.24/1M | Cost effective |

### DeepSeek (1 model)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| DeepSeek v3 | $0.27/1M | $1.10/1M | Advanced |

### Alibaba (1 model)
| Model | Input Price | Output Price | Use Case |
|-------|-------------|--------------|----------|
| Qwen 2.5 | $0.10/1M | $0.20/1M | Budget friendly |

## 📊 How Cost Calculation Works

### Input Parameters (8 inputs)
1. **Number of Users** - Total users using the LLM
2. **Chats Per Day** - Average conversations per user daily
3. **Days Per Month** - Working days in month (e.g., 20-30)
4. **Input Words Per Chat** - Average prompt length in words
5. **Output Words Per Chat** - Average response length in words
6. **Tokens Per Word** - Conversion factor (default 1.3 tokens/word)
7. **Exchange Rate** - USD to INR conversion (e.g., 83)
8. **Cache Hit Percentage** - % of queries served from cache (0-100%)

### Calculation Steps

**Step 1: Calculate Total Monthly Chats**
```
Total Chats = Users × Chats Per Day × Days Per Month
Example: 100 users × 5 chats/day × 20 days = 10,000 chats
```

**Step 2: Calculate Token Counts**
```
Input Tokens = Input Words Per Chat × Tokens Per Word × Total Chats
Output Tokens = Output Words Per Chat × Tokens Per Word × Total Chats
Example: 200 words × 1.3 × 10,000 = 2.6M input tokens
```

**Step 3: Apply Cache Optimization**
```
Effective Token Factor = 1 - (Cache Hit % / 100)
Example: 20% cache = 80% effective tokens (20% reduction)
```

**Step 4: Calculate Model Cost**
```
Cost = ((Input Tokens × Input Price) + (Output Tokens × Output Price)) / 1,000,000
After Cache: Optimized Cost = Cost × Effective Token Factor
Example: (2.6M × $0.25 + 1.3M × $1.00) / 1M = $1.95 per model
```

**Step 5: Additional Metrics**
```
Cost Per User = Monthly Cost / Number of Users
Cost Per Chat = Monthly Cost / Total Chats
Annual Cost = Monthly Cost × 12
Annual Cost (INR) = Monthly Cost (USD) × 12 × Exchange Rate
```

### Real-World Example

**Scenario:** Tech startup with 50 users, 3 chats/day, 22 working days/month
- Input: 300 words/chat, Output: 150 words/chat
- Cache: 30% hit rate

**Calculation:**
- Total Chats = 50 × 3 × 22 = 3,300
- Input Tokens = 300 × 1.3 × 3,300 = 1.287M
- Output Tokens = 150 × 1.3 × 3,300 = 643.5K
- Cache Factor = 1 - 0.30 = 0.70

**Results (for GPT-4o):**
- Original Cost = (1.287M × $0.25 + 643.5K × $1.00) = $965.75
- After Cache = $965.75 × 0.70 = **$676.03/month**
- Annual = **$8,112.36**
- Per User = **$13.52/month**

## 🚀 Quick Start

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/llm-cost-calculator.git
cd llm-cost-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access
- Open `http://localhost:3000` in your browser
- Create an account or login
- Go to Calculator and start comparing!

## 📱 User Flow

1. **Landing Page** - View features and available models
2. **Register/Login** - Create account and authenticate
3. **Dashboard** - See model information and calculation history
4. **Calculator** - Input usage parameters and get instant cost comparison
5. **Comparison Table** - View detailed breakdowns across all models

## 🛠 Tech Stack

- **Frontend:** React 18.2 + Vite 5.4 (fast development)
- **Styling:** Tailwind CSS 3.3.6 (utility-first design)
- **Routing:** React Router v6.20 (multi-page SPA)
- **Data Visualization:** Recharts 2.10 (for future enhancements)
- **Storage:** LocalStorage (client-side data persistence)
- **State Management:** React Hooks (useState, useEffect)

## 📁 Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx       # Marketing/hero page
│   ├── LoginPage.jsx         # User authentication
│   ├── RegisterPage.jsx      # Account creation
│   ├── Dashboard.jsx         # User dashboard with history
│   └── Calculator.jsx        # Main cost calculation engine
├── components/
│   ├── Header.jsx            # Navigation header
│   ├── ComparisonTable.jsx   # Multi-tab results display
│   ├── SummaryCard.jsx       # Reusable metric cards
│   └── Logo.jsx              # Brand logo
├── App.jsx                   # Root component & routing
├── App.css                   # Global styles
└── index.css                 # Base Tailwind styles
```

## 🔑 Key Features Explained

### Cache Hit Optimization
Prompt caching (supported by GPT-4o, Claude, Gemini) allows reusing cache tokens at 90% discount.
- 20% cache hit = 20% cost reduction
- Example: $100 cost → $80 with 20% cache

### Calculation History
- All calculations saved to browser localStorage
- Unique key: timestamp
- Delete individual calculations anytime
- Up to 100+ calculations stored

### Dashboard Insights
- **Most Expensive Model** - Highest cost from your history
- **Best Model** - Lowest cost option
- **Total Calculations** - Number of comparisons made
- **Model Information Table** - All 16 models with companies and use cases

## 💡 Tips for Accurate Results

1. **Estimate word counts** from your actual use cases
2. **Research typical cache hit rates** (10-30% is common initially)
3. **Consider token variations** (some models use 1.1-1.4 tokens/word)
4. **Update exchange rate** if you track costs in INR
5. **Round usage numbers** conservatively to account for growth

## 🎨 UI Features

- Clean, professional white background design
- Blue theme with S3K brand colors
- Responsive layout (mobile, tablet, desktop)
- Real-time calculations as you type
- Color-coded cost comparisons (green = cheapest)
- Easy-to-scan data tables

## 📈 Future Enhancements

- Model-specific token ratios (different for each model)
- API integration for real-time pricing updates
- Batch cost analysis
- Cost trend charts
- Team sharing and collaboration
- Advanced filtering and sorting

## 🔐 Security

- Client-side data storage (no server)
- Email/password based authentication
- localStorage for session management
- No external API calls (prices hardcoded)

## 📄 License

[Add your license here]

## 👥 Authors

S3K Tech.ai Team

## 📧 Support

For questions or feedback, please create an issue in the repository.

---

**Last Updated:** May 2026  
**Version:** 1.0.0
