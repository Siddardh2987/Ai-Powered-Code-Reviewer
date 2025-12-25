const Aibot = require("../service/aiService");
const chatbot = new Aibot(process.env.GROQ_API_KEY);
const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required',
        reply: 'Please enter a message.'
      });
    }
    //console.log("📹 Incoming message:", message);
    const result = await chatbot.ask(message);
    if (!result.success) {
      console.error("❌ Chatbot error:", result.error);
      return res.status(500).json({ 
        error: result.error,
        reply: result.response 
      });
    }
    res.json({ 
      reply: result.response,
      model: result.model,
      tokensUsed: result.usage?.total_tokens
    });
  } catch (error) {
    console.error("❌ Chat error:", error.message);
    console.error("Stack trace:", error.stack);
    if (error.name === 'AbortError') {
      return res.status(408).json({
        error: 'Request timeout',
        reply: "The request took too long. Please try again."
      });
    }
    res.status(500).json({
      error: 'Failed to process message',
      reply: "I'm having trouble connecting right now. Please try again later."
    });
  }
};
module.exports = { handleChatMessage };