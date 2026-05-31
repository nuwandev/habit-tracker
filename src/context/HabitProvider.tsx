import { isSameDay } from "date-fns";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (habitId: string, date: Date) => void;
};

type HabitProviderProps = { children: ReactNode };

const HabitContext = createContext<null | Context>(null);
export default function HabitProvider({
  children,
}: Readonly<HabitProviderProps>) {
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
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleCompletion }}>
      {children}
    </HabitContext>
  );
}

export function useHabits() {
  const habitContext = useContext(HabitContext);
  if (habitContext === null) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return habitContext;
}
