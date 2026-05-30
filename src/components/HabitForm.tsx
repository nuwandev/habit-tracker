import { useState } from "react";
import { Button } from "./Button";

type HabitFormProps = {
  addHabit: (name: string) => void;
};

const HabitForm = ({ addHabit }: HabitFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") return;
    setName("");
    addHabit(name);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        type="text"
        placeholder="Enter a new habit"
      />
      <Button
        className="rounded-lg px-4 py-2 font-medium"
        disabled={name.trim() === ""}
      >
        Add
      </Button>
    </form>
  );
};

export default HabitForm;
