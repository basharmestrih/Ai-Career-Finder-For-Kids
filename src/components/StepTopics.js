import Chip from './Chip';
import { useCareerSelections } from '../hooks/useCareerSelections';

const topics = [
  "Coding",
  "Web Design",
  "Game Making",
  "AI",
  "Cyber Safety",
  "Data Work",

  "Drawing",
  "Graphic Design",
  "Video Editing",
  "Animation",
  "Photography",
  "Fashion",

  "Medicine",
  "Nursing",
  "Dental Care",
  "Mental Health",

  "Teaching",
  "Coaching",

  "Business",
  "Selling",
  "Marketing",
  "Money Management",

  "Content Making",
  "YouTube",
  "Social Media",

  "Engineering",
  "Building",
  "Machines",

  "Cooking",
  "Baking",

  "Sports",
  "Fitness",

  "Writing",
  "Acting",
  "Music"
];

const StepTopics = () => {
  const { interests: selected, toggleInterest } = useCareerSelections();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">What sparks your curiosity?</h3>
        <p className="text-sm text-slate-500">Choose a mix of industries and topics you enjoy exploring.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Chip
            key={topic}
            label={topic}
            selected={selected.includes(topic)}
            onClick={() => toggleInterest(topic)}
          />
        ))}
      </div>
    </div>
  );
};

export default StepTopics;
