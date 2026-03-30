import { useSelector } from "react-redux";
import { buildCareerPrompt } from "../store/careerSlice";

export function useCareerPrompt() {
  const { skills, interests, wins, education } = useSelector((state) => state.career);

  return buildCareerPrompt({
    skills,
    interests,
    wins,
    education,
  });
}
