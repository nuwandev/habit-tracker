import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  startOfWeek,
} from "date-fns";
import { Button } from "./Button";

const HabitList = () => {
  const habits = [
    { id: 1, name: "Drink Water" },
    { id: 2, name: "Exercise" },
    { id: 3, name: "Read a Book" },
  ];

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
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

type HabitItemProps = {
  habit: {
    id: number;
    name: string;
  };
};

function HabitItem({ habit }: Readonly<HabitItemProps>) {
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
        <Button className="text-sm" variant="ghost-destructive">
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDays.map((day) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={day.toISOString()}
            disabled={isFuture(day)}
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
