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
I am a kid under 18 years old. I have the following profile:

Skills:
${skills.length ? skills.map((skill) => `- ${skill}`).join("\n") : "- None selected yet"}

Interests:
${interests.length ? interests.map((interest) => `- ${interest}`).join("\n") : "- None selected yet"}

Wins / Achievements:
${wins?.trim() || "No wins provided yet"}

Education level:
${education || "No education level selected yet"}

I want helpful and realistic career suggestions that I can actually start learning today.

Return a JSON array of EXACTLY 4 careers.

Each career MUST include:

- "career": Clear and simple career name
- "whyItFits": 2–3 sentences explaining WHY it matches my personality, skills, and interests
- "roadmap": An array of 4–6 simple, practical steps a beginner kid can follow (clear and actionable)
- "CoursesNames": An array of 2–3 REAL courses/tutorials
  Each course MUST include:
    - "name": Real course/video title
    - "platform": A famous learning platform

- "advice": Friendly, practical advice for a beginner

Return only the JSON array.
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
  CoursesNames: Array.isArray(career?.CoursesNames)
    ? career.CoursesNames.map(normalizeCourse)
    : [],
  advice: career?.advice || "",
});

const parseCareerContent = (response) => {
  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No career content returned from the assistant.");
  }

  const parsed = JSON.parse(content);

  if (!Array.isArray(parsed)) {
    throw new Error("Career response is not a valid array.");
  }

  return parsed.slice(0, 4).map(normalizeCareer);
};


export const findCareer = createAsyncThunk(
  "career/findCareer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const careerState = getState().career;
      const selections = {
        skills: careerState.skills,
        interests: careerState.interests,
        wins: careerState.wins,
        education: careerState.education,
      };
      const prompt = buildCareerPrompt(selections);
      const response = await requestCareerSuggestion({ prompt, selections });
      const careers = parseCareerContent(response);

      return {
        careers,
        prompt,
        response,
      };
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
