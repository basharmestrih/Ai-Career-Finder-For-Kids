const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function requestCareerSuggestion({ prompt, selections }) {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing REACT_APP_GROQ_API_KEY environment variable.");
  }

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
 
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Career request failed.");
  }

  return data;
}
