import React, { useState } from "react";
import "./App.css";

const canteens = [
  { name: "Jadhav Caterers (1st floor)", value: "jadhav" },
  { name: "Pune Meals (2nd floor)", value: "pune" },
  { name: "FRESHIA, Ayush Canteen (3rd floor)", value: "freshia" },
];

const snacks = [
  { name: "Samosa", icon: "🥟" },
  { name: "Dosa", icon: "🥞" },
  { name: "Kachori", icon: "🥠" },
  { name: "Idli", icon: "🍚" },
  { name: "Vada Pav", icon: "🍔" },
  { name: "Dhokla", icon: "🟨" },
  { name: "Bhel", icon: "🥗" },
  { name: "Burger", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
];

const fullMeals = [
  { name: "Biryani", icon: "🍛" },
  { name: "Veg Thali", icon: "🍽️" },
  { name: "Khichdi", icon: "🥣" },
  { name: "Puri Bhaji", icon: "🍲" },
];

const drinks = [
  { name: "Apple Juice", icon: "🍎" },
  { name: "Pineapple Juice", icon: "🍍" },
  { name: "Watermelon Juice", icon: "🍉" },
  { name: "Mango Juice", icon: "🥭" },
  { name: "Orange Juice", icon: "🍊" },
  { name: "Mosambi Juice", icon: "🍋" },
];

function StarRating({ rating, setRating }: { rating: number; setRating: (n: number) => void }) {
  return (
    <div className="star-rating">
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star filled" : "star"}
          onClick={() => setRating(star)}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >★</span>
      ))}
    </div>
  );
}

function App() {
  const [canteen, setCanteen] = useState("");
  const [snack, setSnack] = useState("");
  const [drink, setDrink] = useState("");
  const [meal, setMeal] = useState("");
  const [comingSoon, setComingSoon] = useState(false);
  const [timer, setTimer] = useState(10);
  const [star, setStar] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Timer logic
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (comingSoon && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    if (timer === 0) setComingSoon(false);
    return () => clearInterval(interval);
  }, [comingSoon, timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="stone-age-bg">
      <div className="app-container stone-age">
        <h1>🍖 Stone Age Canteen Voting 🍗</h1>
        {!submitted ? (
          <form className="user-form" onSubmit={handleSubmit}>
            <label>
              Select Canteen:
              <select value={canteen} required onChange={e => setCanteen(e.target.value)}>
                <option value="">--Select--</option>
                {canteens.map(c => (
                  <option key={c.value} value={c.value}>{c.name}</option>
                ))}
              </select>
            </label>
            <label>
              Available Snack:
              <select value={snack} onChange={e => setSnack(e.target.value)}>
                <option value="">--Select--</option>
                {snacks.map(s => (
                  <option key={s.name} value={s.name}>{s.icon} {s.name}</option>
                ))}
              </select>
            </label>
            <label>
              Available Drink:
              <select value={drink} onChange={e => setDrink(e.target.value)}>
                <option value="">--Select--</option>
                {drinks.map(d => (
                  <option key={d.name} value={d.name}>{d.icon} {d.name}</option>
                ))}
              </select>
            </label>
            <label>
              Available Full Meal:
              <select value={meal} onChange={e => setMeal(e.target.value)}>
                <option value="">--Select--</option>
                {fullMeals.map(m => (
                  <option key={m.name} value={m.name}>{m.icon} {m.name}</option>
                ))}
              </select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={comingSoon}
                onChange={e => {
                  setComingSoon(e.target.checked);
                  setTimer(10);
                }}
              />
              I am coming in 10 mins, prepare my meal!
            </label>
            {comingSoon && (
              <div className="timer">
                ⏳ Arriving in: <b>{timer}</b> seconds
              </div>
            )}
            <label>
              Suggest a Dish/Drink:
              <input
                type="text"
                value={suggestion}
                onChange={e => setSuggestion(e.target.value)}
                placeholder="Optional"
              />
            </label>
            <label>
              Rate your experience:
              <StarRating rating={star} setRating={setStar} />
            </label>
            <label>
              Feedback:
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Any feedback? (Optional)"
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div className="thank-you">
            <h2>Thank you for your response!</h2>
            <p>Enjoy your meal! 🦴</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;