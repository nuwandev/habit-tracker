import HabitForm from "./components/HabitForm";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm />
    </div>
  );
};

export default App;
