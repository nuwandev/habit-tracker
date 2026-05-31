import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import Header from "./components/Header";
import { isSameDay } from "date-fns";

const App = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (name: string) => {
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  };

  const deleteHabit = (id: string) =>
    setHabits((prev) => prev.filter((habit) => habit.id !== id));

  const toggleCompletion = (habitId: string, date: Date) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id != habitId) return h;

        const alreadyDone = h.completions.some((c) => isSameDay(c, date));
        const completions = alreadyDone
          ? h.completions.filter((c) => !isSameDay(c, date))
          : [...h.completions, date];

        return { ...h, completions };
      }),
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        deleteHabit={deleteHabit}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
};

export default App;
