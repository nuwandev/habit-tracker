import { Button } from "./Button";

const HabitForm = () => {
  return (
    <form className="flex gap-2">
      <input
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        type="text"
        placeholder="Enter a new habit"
      />
      <Button>Add</Button>
    </form>
  );
};

export default HabitForm;
