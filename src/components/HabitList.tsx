import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { Button } from "./Button";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitListProps = {
  habits: Habit[];
  deleteHabit: (id: string) => void;
};

const HabitList = ({ habits, deleteHabit }: HabitListProps) => {
  if (habits.length === 0) {
    return (
      <div className="text-center text-zinc-500">
        No habits yet. Add one above!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem key={habit.id} deleteHabit={deleteHabit} habit={habit} />
      ))}
    </div>
  );
};

type HabitItemProps = {
  habit: Habit;
  deleteHabit: (id: string) => void;
};

function HabitItem({ habit, deleteHabit }: Readonly<HabitItemProps>) {
  const visibleDays = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex item-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-500">🔥 3</span>
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          className="text-sm"
          variant="ghost-destructive"
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDays.map((day) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs p-3"
            key={day.toISOString()}
            disabled={isFuture(day)}
            variant={
              habit.completions.some((d) => isSameDay(d, day))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(day, "EEE")}</span>
            <span>{format(day, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default HabitList;
