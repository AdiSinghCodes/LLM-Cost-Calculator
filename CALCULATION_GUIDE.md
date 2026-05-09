# LLM Cost Calculator - Complete Calculation Guide

## Overview
The LLM Cost Calculator is a SaaS tool that helps businesses compare costs across 16 different Large Language Models (LLMs) from 8 providers. It takes usage patterns and business metrics as inputs and calculates comprehensive cost analysis, including optimization opportunities and profit margins.

---

## 📥 INPUT PARAMETERS (9 Total Inputs)

### **Section 1: Usage Inputs** (First 7 inputs)

#### 1. **Number of Users**
- **What it means**: Total number of users accessing your AI system
- **Example**: 100 users
- **Impact**: Used to calculate per-user costs and total chats
- **Formula dependency**: Total Chats = Users × Chats Per Day × Days Per Month

#### 2. **Chats per User per Day**
- **What it means**: Average number of chat interactions each user has daily
- **Example**: 5 chats per day
- **Impact**: Multiplied with users and days to get total monthly chats
- **Formula dependency**: Total Chats = Users × Chats Per Day × Days Per Month

#### 3. **Days per Month**
- **What it means**: Number of working/active days per month
- **Example**: 30 days
- **Impact**: Scales daily usage to monthly metrics
- **Formula dependency**: Total Chats = Users × Chats Per Day × Days Per Month

#### 4. **Input Words per Chat**
- **What it means**: Average number of words users send as prompts/questions in each chat
- **Example**: 100 words
- **Impact**: Determines input token consumption
- **Formula dependency**: Input Tokens = Input Words × Tokens Per Word

#### 5. **Output Words per Chat**
- **What it means**: Average number of words the LLM generates as responses for each chat
- **Example**: 200 words
- **Impact**: Determines output token consumption
- **Formula dependency**: Output Tokens = Output Words × Tokens Per Word

#### 6. **Tokens per Word**
- **What it means**: Conversion ratio from words to tokens (LLMs price by tokens, not words)
- **Standard value**: 1.3 (1 word ≈ 1.3 tokens on average)
- **Impact**: Converts word counts to token counts for cost calculation
- **Example**: 100 words × 1.3 = 130 tokens
- **Formula dependency**: Total Tokens = (Input Words + Output Words) × Tokens Per Word × Total Chats

#### 7. **USD to INR Exchange Rate**
- **What it means**: Currency conversion rate for displaying costs in Indian Rupees
- **Example**: 83 (1 USD = ₹83)
- **Impact**: Converts all USD costs to INR for local currency viewing
- **Formula dependency**: Cost in INR = Cost in USD × Exchange Rate

---

### **Section 2: Optimization Inputs** (Last 2 inputs - Optional)

#### 8. **Cache Hit Percentage (%)**
- **What it means**: Percentage of LLM queries that can be served from cache instead of making new API calls
- **Range**: 0-100%
- **Example**: 20% (meaning 20% of chats are repetitive and can be cached)
- **Impact**: Dramatically reduces costs for cached queries
- **Why caching saves money**: 
  - Cached responses don't require processing, so you pay 90% LESS on input tokens
  - Example: If cache hit is 20%, effective tokens = 80% of original
- **Formula dependency**: Effective Token Factor = 1 - (Cache Hit % / 100)
- **Important**: Only shows if > 0%

#### 9. **Client Monthly Revenue (INR)** 
- **What it means**: Total monthly revenue your business generates from AI-powered services
- **Example**: ₹100,000
- **Impact**: Used to calculate profit margins
- **Formula dependency**: Profit = Revenue - LLM Costs
- **Important**: Optional, only shows profit analysis if > 0

---

## 🧮 CALCULATION STEPS

### **Step 1: Calculate Monthly Usage Metrics**

```
Total Chats per Month = Users × Chats Per Day × Days Per Month
Example: 100 users × 5 chats/day × 30 days = 15,000 chats/month

Input Tokens per Chat = Input Words × Tokens Per Word
Example: 100 words × 1.3 = 130 tokens/chat

Output Tokens per Chat = Output Words × Tokens Per Word
Example: 200 words × 1.3 = 260 tokens/chat

Total Monthly Input Tokens = Total Chats × Input Tokens per Chat
Example: 15,000 × 130 = 1,950,000 tokens

Total Monthly Output Tokens = Total Chats × Output Tokens per Chat
Example: 15,000 × 260 = 3,900,000 tokens

Total Monthly Tokens = Input + Output
Example: 1,950,000 + 3,900,000 = 5,850,000 tokens
```

### **Step 2: Convert Tokens to Millions (for LLM pricing)**

LLM pricing is always per 1 Million tokens, so we convert:

```
Monthly Input Tokens (Millions) = 1,950,000 / 1,000,000 = 1.95M
Monthly Output Tokens (Millions) = 3,900,000 / 1,000,000 = 3.9M
```

### **Step 3: Apply Cache Factor (if applicable)**

If cache hit % > 0, calculate effective tokens after caching:

```
Cache Hit % = 20%
Effective Token Factor = 1 - (20 / 100) = 0.8
(This means only 80% of tokens are actually processed)

Effective Input Tokens = 1.95M × 0.8 = 1.56M
Effective Output Tokens = 3.9M × 0.8 = 3.12M
```

### **Step 4: Calculate Costs for Each of 16 LLM Models**

For each model, we have pricing data (example for OpenAI GPT-4o):
- Input Price: $0.15 per 1M tokens
- Output Price: $0.60 per 1M tokens

**Without caching (original cost):**
```
Input Cost = Input Tokens (M) × Input Price
           = 1.95M × $0.15 = $0.2925

Output Cost = Output Tokens (M) × Output Price
            = 3.9M × $0.60 = $2.34

Monthly Cost (USD) = $0.2925 + $2.34 = $2.6325 ≈ $2.63
```

**With caching (optimized cost):**
```
Input Cost (Optimized) = 1.56M × $0.15 = $0.234
Output Cost (Optimized) = 3.12M × $0.60 = $1.872

Monthly Cost (Optimized USD) = $0.234 + $1.872 = $2.106 ≈ $2.11
```

**Cache Savings Calculation:**
```
Savings USD = $2.63 - $2.11 = $0.52
Savings % = ($0.52 / $2.63) × 100 = 19.8% (approximately the cache hit %)
```

### **Step 5: Calculate Business Metrics (for the cheapest model)**

**Identify Cheapest Model:**
- Compare all 16 models' optimized monthly costs
- Calculate separate metrics for each model
- Display all 16 in comparison table

**Per-User Costs:**
```
Cost Per User (USD) = Monthly Cost / Number of Users
                    = $2.11 / 100 = $0.0211 per user

Cost Per User (INR) = $0.0211 × 83 = ₹1.75 per user
```

**Per-Chat Costs:**
```
Cost Per Chat (USD) = Monthly Cost / Total Chats
                    = $2.11 / 15,000 = $0.000141 per chat

Cost Per Chat (INR) = $0.000141 × 83 = ₹0.0117 per chat
```

**Annual Costs:**
```
Annual Cost (USD) = Monthly Cost × 12
                  = $2.11 × 12 = $25.32

Annual Cost (INR) = ₹25.32 × 83 = ₹2,101.56 (converted directly)
```

### **Step 6: Calculate Profit Margins (if revenue provided)**

```
Profit (INR) = Client Monthly Revenue - Optimized Monthly Cost
             = ₹100,000 - (₹2.11 × 83) = ₹100,000 - ₹175 = ₹99,825

Profit % = (Profit / Revenue) × 100
         = (₹99,825 / ₹100,000) × 100 = 99.825%
```

---

## 📊 OUTPUT DISPLAY SECTIONS

The dashboard shows calculated results in **3 main sections** after clicking "Calculate":

### **SECTION 1: 📊 Usage Metrics**
Displays basic calculated metrics:
- **Total Chats**: 15,000 (calculated from users, chats/day, days)
- **Total Tokens**: 5.85M (input + output tokens)
- **Cheapest Model**: GPT-4o Mini (or whichever is cheapest)
- **Monthly Cost**: $2.11 (basic summary of cheapest model)

---

### **SECTION 2: 💼 Business Metrics**
Displays per-user and business-level metrics for the cheapest model:
- **Cost Per User**: $0.0211 (USD) / ₹1.75 (INR)
- **Cost Per Chat**: $0.000141 (USD) / ₹0.0117 (INR)
- **Annual Cost**: $25.32 (USD) / ₹2,101.56 (INR)
- **Profit Margin %**: 99.825% (only if revenue provided and > 0)

---

### **SECTION 3: ⚡ Optimization Metrics** (Shows only if Cache Hit % > 0)
Shows savings from caching strategy:
- **Original Cost**: $2.63 (cost without caching optimization)
- **Optimized Cost**: $2.11 (cost after applying cache hit %)
- **Cache Savings**: $0.52 (actual dollars saved)
- **Savings %**: 19.8% (percentage saved)
- **Effective Tokens**: 4.68M (tokens actually charged after caching)
- **Original Tokens**: 5.85M (tokens before caching)

---

## 📈 COMPARISON TABLE (4 Tabs)

After calculations, displays all 16 LLM models across 4 comparison tabs:

### **Tab 1: Overview**
Compares all 16 models at a glance:
- Model name and company
- Monthly cost (USD & INR)
- Annual cost (USD)
- Use case description
- **Highlights**: Cheapest model is highlighted in green

**Example Output:**
```
OpenAI GPT-4o Mini     | $0.63 | ₹52    | $7.56   | Fast, lightweight
Anthropic Claude Opus  | $15.2 | ₹1,292 | $182.40 | Most capable
Google Gemini 1.5      | $0.45 | ₹37    | $5.40   | Cost-effective
... (13 more models)
```

---

### **Tab 2: Detailed Breakdown**
Shows per-unit economics:
- Company + Model name
- Cost Per User (USD & INR)
- Cost Per Chat (USD & INR)
- Monthly cost
- Annual cost

**Use Case**: Understand how much each individual user or chat costs

**Example:**
```
OpenAI GPT-4o          | $0.0063/user | $0.000042/chat | $0.63/month | $7.56/year
DeepSeek v3            | $0.0054/user | $0.000036/chat | $0.54/month | $6.48/year
...
```

---

### **Tab 3: Optimization Tab** (appears only if Cache Hit % > 0)
Shows caching savings for each model:
- Model name
- Original Cost (without caching)
- Optimized Cost (with caching)
- Savings in USD
- Savings % (same as cache hit %)

**Use Case**: See which models benefit most from caching strategy

**Example (for 20% cache hit):**
```
OpenAI GPT-4o          | $0.79  | $0.63  | $0.16  | 20.0%
Anthropic Opus         | $19.0  | $15.2  | $3.8   | 20.0%
...
```

---

### **Tab 4: Profit Analysis Tab** (appears only if Revenue > 0)
Shows profitability with each model:
- Model name
- Monthly Cost
- Profit in INR (Revenue - Cost)
- Profit %

**Use Case**: Determine which model choice maximizes profit margins

**Example (for ₹100,000 revenue):**
```
OpenAI GPT-4o          | ₹52   | ₹99,948 | 99.95%
Anthropic Opus         | ₹1,292| ₹98,708 | 98.71%
DeepSeek v3            | ₹11   | ₹99,989 | 99.99% ← Most profitable
...
```

---

## 🔑 KEY FORMULAS SUMMARY

| Metric | Formula |
|--------|---------|
| Total Chats | Users × Chats/Day × Days/Month |
| Input Tokens | Input Words × Tokens/Word × Total Chats |
| Output Tokens | Output Words × Tokens/Word × Total Chats |
| Effective Tokens | Total Tokens × (1 - Cache Hit %/100) |
| Cost (Original) | (Input Tokens / 1M × Input Price) + (Output Tokens / 1M × Output Price) |
| Cost (Optimized) | (Effective Input Tokens / 1M × Input Price) + (Effective Output Tokens / 1M × Output Price) |
| Cost Per User | Monthly Cost / Users |
| Cost Per Chat | Monthly Cost / Total Chats |
| Annual Cost | Monthly Cost × 12 |
| Cache Savings | Original Cost - Optimized Cost |
| Profit | Revenue - Optimized Cost |
| Profit % | (Profit / Revenue) × 100 |
| Cost in INR | Cost in USD × Exchange Rate |

---

## 💡 16 LLM MODELS COMPARED

| # | Company | Model | Use Case | Input Price | Output Price |
|---|---------|-------|----------|------------|--------------|
| 1 | OpenAI | GPT-5 | Advanced reasoning | $1.75 / 1M | $14.00 / 1M |
| 2 | OpenAI | GPT-4o | Balanced performance | $0.25 / 1M | $1.00 / 1M |
| 3 | OpenAI | GPT-4o Mini | Fast, lightweight | $0.15 / 1M | $0.60 / 1M |
| 4 | OpenAI | GPT-4 Turbo | Complex reasoning | $0.30 / 1M | $1.20 / 1M |
| 5 | Anthropic | Claude Opus 4.6 | Most capable | $5.00 / 1M | $25.00 / 1M |
| 6 | Anthropic | Claude Sonnet 3.5 | Balanced | $3.00 / 1M | $15.00 / 1M |
| 7 | Anthropic | Claude Haiku 3.5 | Fast, lightweight | $1.00 / 1M | $5.00 / 1M |
| 8 | Google | Gemini 2.5 Pro | Advanced, multimodal | $1.25 / 1M | $10.00 / 1M |
| 9 | Google | Gemini 2.5 Flash | Balanced general use | $0.30 / 1M | $1.50 / 1M |
| 10 | Google | Gemini 3.1 Flash | Fast general tasks | $0.25 / 1M | $1.50 / 1M |
| 11 | Google | Gemini 1.5 Flash | Cost-effective | $0.20 / 1M | $0.80 / 1M |
| 12 | Meta | LLaMA 3.1 70B | Open source | $0.58 / 1M | $0.71 / 1M |
| 13 | Mistral | Mistral Medium | Balanced | $0.40 / 1M | $2.00 / 1M |
| 14 | Mistral | Mistral 8x7B | Cost-effective | $0.14 / 1M | $0.42 / 1M |
| 15 | DeepSeek | DeepSeek v3 | Affordable, efficient | $0.14 / 1M | $0.28 / 1M |
| 16 | Alibaba | Qwen 2.5 | Budget-friendly | $0.10 / 1M | $0.15 / 1M |

---

## 🎯 REAL-WORLD EXAMPLE

**Scenario**: E-commerce company with AI chatbot

**Inputs:**
```
Users: 1,000
Chats per Day: 3
Days per Month: 25
Input Words: 50 (average question)
Output Words: 150 (average response)
Tokens per Word: 1.3
Exchange Rate: 83
Cache Hit: 30%
Monthly Revenue: ₹500,000
```

**Calculations:**
```
Total Chats = 1,000 × 3 × 25 = 75,000 chats/month

Input Tokens per Chat = 50 × 1.3 = 65 tokens
Output Tokens per Chat = 150 × 1.3 = 195 tokens

Total Input Tokens = 75,000 × 65 = 4,875,000 → 4.875M
Total Output Tokens = 75,000 × 195 = 14,625,000 → 14.625M

Effective Factor = 1 - 0.30 = 0.70
Effective Input = 4.875M × 0.70 = 3.41M
Effective Output = 14.625M × 0.70 = 10.24M
```

**For DeepSeek v3** (cheapest option):
```
Input Cost = 3.41M × $0.14 = $0.477
Output Cost = 10.24M × $0.28 = $2.867
Monthly Cost = $3.344 ≈ $3.34

Original (no cache) = 4.875M × $0.14 + 14.625M × $0.28 = $4.777
Cache Savings = $4.777 - $3.344 = $1.433 (30% saved)

Cost Per User = $3.34 / 1,000 = $0.00334 per user/month
Cost Per Chat = $3.34 / 75,000 = $0.0000445 per chat
Annual Cost = $3.34 × 12 = $40.08

Revenue = ₹500,000 (given)
Cost in INR = $3.34 × 83 = ₹277.22
Profit = ₹500,000 - ₹277.22 = ₹499,722.78
Profit % = (₹499,722.78 / ₹500,000) × 100 = 99.94%
```

**Dashboard Output:**
- ✓ Usage Metrics: 75,000 chats, 19.5M tokens, DeepSeek v3 recommended, $3.34/month
- ✓ Business Metrics: $0.00334/user, $0.0000445/chat, $40.08/year, 99.94% profit
- ✓ Optimization: Original $4.78 → Optimized $3.34 (saves $1.43, 30%)
- ✓ Comparison Table: Shows all 16 models, DeepSeek highlighted as cheapest

---

## 🔍 HOW MODELS ARE COMPARED

1. **All 16 models are calculated** with the exact same usage metrics
2. **Same token count** applied to each model (differences in pricing only)
3. **Cheapest model identified** by comparing optimized monthly costs
4. **Model comparison table** shows side-by-side comparison
5. **Summary metrics** use the cheapest model for business decisions
6. **Optional tabs** show optimization and profit analysis for all 16

---

## 💾 DATA STORAGE

All calculation results are saved to browser's **localStorage** for:
- View calculation history in Dashboard
- Track calculations over time
- Persist data across sessions
- Analyze trends in usage/costs

---

This completes the entire calculation workflow! The tool is designed to help businesses make data-driven decisions about which LLM to use based on their specific usage patterns and business requirements.
