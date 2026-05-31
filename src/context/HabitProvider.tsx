import { isSameDay } from "date-fns";
import { type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = { children: ReactNode };

export default function HabitProvider({
  children,
}: Readonly<HabitProviderProps>) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

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
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleCompletion }}>
      {children}
    </HabitContext>
  );
}
