import { useDispatch, useSelector } from "react-redux";
import {
  setEducation,
  setWins,
  toggleInterest,
  toggleSkill,
} from "../store/careerSlice";

export function useCareerSelections() {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.career);

  return {
    skills: selections.skills,
    interests: selections.interests,
    wins: selections.wins,
    education: selections.education,
    toggleSkill: (value) => dispatch(toggleSkill(value)),
    toggleInterest: (value) => dispatch(toggleInterest(value)),
    setWins: (value) => dispatch(setWins(value)),
    setEducation: (value) => dispatch(setEducation(value)),
  };
}
