const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function requestCareerSuggestion({ prompt, selections }) {
  const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing REACT_APP_OPENROUTER_API_KEY environment variable.");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      metadata: {
        feature: "career-finder",
        selections,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Career request failed.");
  }

  return data;
}
