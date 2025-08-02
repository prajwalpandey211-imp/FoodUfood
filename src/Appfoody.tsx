import React, { useState } from "react";
import "./App.css";

const mealOptions = ["Breakfast", "Lunch", "Tea", "Snacks"];

function App() {
  const [name, setName] = useState("");
  const [meal, setMeal] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [available, setAvailable] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send data to backend or store it
    setSubmitted(true);
  };

  return (
    <div className="app-container">
      <h1>Office Food & Beverage Voting</h1>
      {!submitted ? (
        <form className="user-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Select Meal:
            <select
              value={meal}
              required
              onChange={(e) => setMeal(e.target.value)}
            >
              <option value="">--Select--</option>
              {mealOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label>
            Suggest a Dish/Drink:
            <input
              type="text"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Optional"
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            I am available for this meal
          </label>
          <label>
            Feedback:
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Any feedback? (Optional)"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="thank-you">
          <h2>Thank you for your response!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
