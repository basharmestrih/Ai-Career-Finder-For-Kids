import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestCareerSuggestion } from "../services/careerService";

const MAX_MULTI_SELECT = 5;

const initialState = {
  skills: [],
  interests: [],
  wins: "",
  education: "",
  loading: false,
  error: null,
  result: null,
  careers: [],
  prompt: "",
  view: "form",
};

const resetSelections = (state) => {
  state.skills = [];
  state.interests = [];
  state.wins = "";
  state.education = "";
};

const toggleListItem = (list, value) => {
  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  }

  if (list.length >= MAX_MULTI_SELECT) {
    return list;
  }

  return [...list, value];
};

export const buildCareerPrompt = ({ skills, interests, wins, education }) =>
`
You are an AI career assistant inside an app for kids (under 18).

User data:
Skills: ${skills.length ? skills.join(", ") : "None"}
Interests: ${interests.length ? interests.join(", ") : "None"}
Wins: ${wins?.trim() || "None"}
Education: ${education || "None"}

TASK:
Return EXACTLY 4 careers.

OUTPUT FORMAT (MUST FOLLOW STRICTLY):
Return ONLY valid JSON:
{
  "careers": [
    {
      "career": "string",
      "whyItFits": "string",
      "roadmap": ["string", "string", "string", "string"],
      "youtubeCourses": ["string", "string"],
      "advice": "string"
    }
  ]
}

STRICT RULES:
- MUST return exactly 4 objects in "careers"
- EACH career MUST contain ALL fields:
  career, whyItFits, roadmap, youtubeCourses, advice
- NO missing fields allowed
- NO empty arrays
- NO null values
- roadmap MUST have 4–6 steps
- youtubeCourses MUST have 2–3 items

CONTENT RULES:
- Each career must be fully complete and independent
- Do NOT skip any field even if unsure
- If you are missing info, invent safe beginner-friendly content
- Each career must feel different in tone:
  1 practical
  2 motivational
  3 question-based
  4 direct

FINAL CHECK BEFORE RESPONDING:
- Are there exactly 4 careers?
- Does each career have ALL fields filled?
- Are arrays not empty?
- Is JSON valid?

If ANY rule fails → regenerate output completely.
`.trim();


const normalizeCourse = (course) => {
  if (typeof course === "string") {
    return {
      name: course,
      platform: "",
    };
  }

  return {
    name: course?.name || "Course",
    platform: course?.link || "",
  };
};

const normalizeCareer = (career) => ({
  career: career?.career || "Career Match",
  whyItFits: career?.whyItFits || "",
  roadmap: Array.isArray(career?.roadmap) ? career.roadmap : [],
  youtubeCourses: Array.isArray(career?.youtubeCourses)
    ? career.youtubeCourses.map(normalizeCourse)
    : [],
  advice: career?.advice || "",
});


  const safeJsonParse = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn("JSON parse failed, trying to fix...", err);

    let fixed = text
      .replace(/,\s*}/g, "}") // remove trailing commas
      .replace(/,\s*]/g, "]");

    try {
      return JSON.parse(fixed);
    } catch (err2) {
      throw new Error(err2);
    }
  }
};

const extractJsonArray = (content) => {
  const trimmedContent = content.trim();

  if (trimmedContent.startsWith("```")) {
    const codeBlockMatch = trimmedContent.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);

    if (codeBlockMatch?.[1]) {
      return codeBlockMatch[1].trim();
    }
  }

  return trimmedContent;
};

const parseCareerContent = (response) => {
  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No career content returned from the assistant.");
    
  }




  const parsed = safeJsonParse(extractJsonArray(content));

  const careers = Array.isArray(parsed) ? parsed : parsed?.careers;

  if (!Array.isArray(careers)) {
    throw new Error("Career response is not a valid careers array.");
  }

  return careers.slice(0, 4).map(normalizeCareer);
};


export const findCareer = createAsyncThunk(
  "career/findCareer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const careerState = getState().career;

      const prompt = buildCareerPrompt({
        skills: careerState.skills,
        interests: careerState.interests,
        wins: careerState.wins,
        education: careerState.education,
      });

      // 🔥 retry logic
      let response;
      let attempts = 0;

      while (attempts < 2) {
        try {
          response = await requestCareerSuggestion({ prompt });
          const careers = parseCareerContent(response);

          return { careers, prompt, response };
        } catch (err) {
          attempts++;
          if (attempts >= 2) throw err;
        }
      }
    } catch (error) {
      return rejectWithValue(error.message || "Unable to find a career right now.");
    }
  }
);

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    toggleSkill(state, action) {
      state.skills = toggleListItem(state.skills, action.payload);
    },
    toggleInterest(state, action) {
      state.interests = toggleListItem(state.interests, action.payload);
    },
    setWins(state, action) {
      state.wins = action.payload;
    },
    setEducation(state, action) {
      state.education = action.payload;
    },
    clearCareerResult(state) {
      state.result = null;
      state.careers = [];
      state.error = null;
      state.view = "form";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findCareer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.view = "form";
        resetSelections(state);
      })
      .addCase(findCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = action.payload.careers;
        state.result = action.payload.response;
        state.prompt = action.payload.prompt;
        state.view = "results";
      })
      .addCase(findCareer.rejected, (state, action) => {
        state.loading = false;
        state.careers = [];
        state.error = action.payload || "Unable to find a career right now.";
        state.view = "form";
      });
  },
});

export const {
  toggleSkill,
  toggleInterest,
  setWins,
  setEducation,
  clearCareerResult,
} = careerSlice.actions;

export default careerSlice.reducer;
