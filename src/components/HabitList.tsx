import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
  subDays,
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
  toggleCompletion: (id: string, date: Date) => void;
};

const HabitList = ({
  habits,
  deleteHabit,
  toggleCompletion,
}: HabitListProps) => {
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
        <HabitItem
          key={habit.id}
          deleteHabit={deleteHabit}
          habit={habit}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </div>
  );
};

type HabitItemProps = {
  habit: Habit;
  deleteHabit: (id: string) => void;
  toggleCompletion: (id: string, date: Date) => void;
};

function HabitItem({
  habit,
  deleteHabit,
  toggleCompletion,
}: Readonly<HabitItemProps>) {
  const visibleDays = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streak = getStreak(habit.completions);

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex item-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          {streak !== 0 && (
            <span className="text-sm text-amber-500">🔥 {streak}</span>
          )}
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
            onClick={() => toggleCompletion(habit.id, day)}
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

function getStreak(completions: Date[]) {
  let streak = 0;
  let today = new Date();

  while (completions.some((c) => isSameDay(c, today))) {
    streak++;
    today = subDays(today, 1);
  }

  return streak;
}

export default HabitList;
