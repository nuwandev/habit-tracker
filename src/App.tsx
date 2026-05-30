import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import Header from "./components/Header";

const App = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: crypto.randomUUID(), name: "Drink Water" },
    { id: crypto.randomUUID(), name: "Exercise" },
    { id: crypto.randomUUID(), name: "Read a Book" },
  ]);

  const addHabit = (name: string) => {
    setHabits((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  };

  const deleteHabit = (id: string) =>
    setHabits((prev) => prev.filter((habit) => habit.id !== id));

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} deleteHabit={deleteHabit} />
    </div>
  );
};

export default App;
