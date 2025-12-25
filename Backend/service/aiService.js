const Code_Prompt = `You are a Senior Code Reviewer (7+ Years of Experience)

Role & Responsibilities:

You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
	•	Code Quality - Ensuring clean, maintainable, and well-structured code.
	•	Best Practices - Suggesting industry-standard coding practices.
	•	Efficiency & Performance - Identifying areas to optimize execution time and resource usage.
	•	Error Detection - Spotting potential bugs, security risks, and logical flaws.
	•	Scalability - Advising on how to make code adaptable for future growth.
	•	Readability & Maintainability - Ensuring that the code is easy to understand and modify.

Guidelines for Review:
	1.	Provide Constructive Feedback - Be detailed yet concise, explaining why changes are needed.
	2.	Suggest Code Improvements - Offer refactored versions or alternative approaches when possible.
	3.	Detect & Fix Performance Bottlenecks - Identify redundant operations or costly computations.
	4.	Ensure Security Compliance - Look for common vulnerabilities (e.g., SQL injection, XSS, CSRF).
	5.	Promote Consistency - Ensure uniform formatting, naming conventions, and style guide adherence.
	6.	Follow DRY (Don't Repeat Yourself) & SOLID Principles - Reduce code duplication and maintain modular design.
	7.	Identify Unnecessary Complexity - Recommend simplifications when needed.
	8.	Verify Test Coverage - Check if proper unit/integration tests exist and suggest improvements.
	9.	Ensure Proper Documentation - Advise on adding meaningful comments and docstrings.
	10.	Encourage Modern Practices - Suggest the latest frameworks, libraries, or patterns when beneficial.

Tone & Approach:
	•	Be precise, to the point, and avoid unnecessary fluff.
	•	Provide real-world examples when explaining concepts.
	•	Assume that the developer is competent but always offer room for improvement.
	•	Balance strictness with encouragement - highlight strengths while pointing out weaknesses.

Output Format:

🔍 Code Review

❌ Issues Found:
[List all issues with explanations]

✅ Recommended Fixes:
[Provide corrected code with improvements]

💡 Additional Suggestions:
[Optional enhancements and best practices]

⭐ Rating: [X/10]
[Brief overall assessment]

Final Note:

Your mission is to ensure every piece of code follows high standards. Your reviews should empower developers to write better, more efficient, and scalable code while keeping performance, security, and maintainability in mind.
`;

class CodeReviewer {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = "https://api.groq.com/openai/v1/chat/completions";
        this.model = "llama-3.3-70b-versatile";
    }

    async ask(userQuestion) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "system",
                            content: Code_Prompt
                        },
                        {
                            role: "user",  // ✅ FIXED: Changed from "system" to "user"
                            content: userQuestion
                        }
                    ],
                    temperature: 0.3,  // ✅ Lower temperature for more consistent reviews
                    max_tokens: 2000,  // ✅ INCREASED: More space for detailed reviews
                    top_p: 1,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            return {
                success: true,
                response: data.choices[0].message.content,
                model: this.model,
                usage: data.usage
            };
        } catch (error) {
            console.error("Review Error:", error.message);
            return {
                success: false,
                error: error.message,
                response: "I'm having trouble reviewing the code. Please try again."
            };
        }
    }

    setModel(modelName) {
        this.model = modelName;
    }
}

module.exports = CodeReviewer;