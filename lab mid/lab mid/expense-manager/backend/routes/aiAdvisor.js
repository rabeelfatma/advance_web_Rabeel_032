// routes/aiAdvisor.js
const express = require("express");
const router = express.Router();

router.post("/ai-advice", async (req, res) => {
  const {
    totalIncome,
    totalExpense,
    balance,
    savingsRate,
    budgetLimit,
    budgetUsedPercent,
    categoryBreakdown,
    totalTransactions,
  } = req.body;

  const prompt = `You are a professional financial advisor. Analyze the following financial data and give 4-5 short, actionable, specific advice tips in JSON array format.

Financial Summary:
- Total Income: Rs.${totalIncome}
- Total Expenses: Rs.${totalExpense}
- Balance: Rs.${balance}
- Savings Rate: ${savingsRate}%
- Budget Limit: Rs.${budgetLimit}
- Budget Used: ${budgetUsedPercent}%
- Expense by Category: ${categoryBreakdown || "No categorized expenses"}
- Total Transactions: ${totalTransactions}

Return ONLY a JSON array (no markdown, no explanation) like this:
[
  {"icon": "📊", "title": "Short title", "tip": "One clear actionable tip based on the data above"},
  {"icon": "💡", "title": "Short title", "tip": "Another specific tip"}
]

Rules:
- Be specific with numbers from the data
- Each tip must be actionable
- Keep each tip under 20 words
- Use relevant emojis as icons`;

  try {
    console.log("OPENROUTER KEY LOADED:", !!process.env.OPENROUTER_API_KEY);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error status:", response.status);
      console.error("OpenRouter API error body:", JSON.stringify(data, null, 2));
      return res.status(500).json({ error: "AI API failed", detail: data });
    }

    const text = data.choices?.[0]?.message?.content || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const advice = JSON.parse(clean);

    res.json({ advice });
  } catch (err) {
    console.error("AI Advisor error:", err.message);
    console.error(err);
    res.status(500).json({ error: "Failed to get AI advice", detail: err.message });
  }
});

module.exports = router;