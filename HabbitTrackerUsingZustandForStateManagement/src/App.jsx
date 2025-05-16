import { useState } from "react";
import "./App.css";
import { useUserHabit } from "./store/store";

function App() {
  const { habbits, setHabbit } = useUserHabit();
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && frequency) {
      setHabbit(name, frequency);
      setName(""); // reset input
      setFrequency("daily");
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button type="submit">Add Habit</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>Your Habits</h3>
      {habbits.length === 0 ? (
        <p>No habits added yet.</p>
      ) : (
        <ul>
          {habbits.map((habit) => (
            <li key={habit.id}>
              <strong>{habit.name}</strong> – {habit.frequency} <br />
              Created at: {new Date(Number(habit.createdAt)).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
