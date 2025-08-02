import React, { useState, useEffect } from "react";

const snacks = [
  { name: "Samosa", icon: "🥟", price: 20 },
  { name: "Dosa", icon: "🥞", price: 40 },
  { name: "Kachori", icon: "🥠", price: 20 },
  { name: "Idli", icon: "🍚", price: 30 },
  { name: "Vada Pav", icon: "🍔", price: 25 },
  { name: "Dhokla", icon: "🟨", price: 30 },
  { name: "Bhel", icon: "🥗", price: 25 },
  { name: "Burger", icon: "🍔", price: 50 },
  { name: "Pizza", icon: "🍕", price: 80 },
];

const fullMeals = [
  { name: "Biryani", icon: "🍛", price: 90 },
  { name: "Veg Thali", icon: "🍽️", price: 120 },
  { name: "Khichdi", icon: "🥣", price: 60 },
  { name: "Puri Bhaji", icon: "🍲", price: 50 },
];

const drinks = [
  { name: "Apple Juice", icon: "🍎", price: 30 },
  { name: "Pineapple Juice", icon: "🍍", price: 30 },
  { name: "Watermelon Juice", icon: "🍉", price: 30 },
  { name: "Mango Juice", icon: "🥭", price: 35 },
  { name: "Orange Juice", icon: "🍊", price: 30 },
  { name: "Mosambi Juice", icon: "🍋", price: 30 },
];

const upiOptions = [
  { name: "GPay", value: "gpay" },
  { name: "Paytm", value: "paytm" },
  { name: "PhonePe", value: "phonepe" },
];

function App() {
  const [name, setName] = useState("");
  const [canteen, setCanteen] = useState("");
  const [snack, setSnack] = useState("");
  const [drink, setDrink] = useState("");
  const [meal, setMeal] = useState("");
  const [upi, setUpi] = useState("");
  const [feed, setFeed] = useState("");
  const [minutes, setMinutes] = useState(15);
  const [timer, setTimer] = useState<number | null>(null);
  const [tomorrowSuggestion, setTomorrowSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [orderNumber, setOrderNumber] = useState(1);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer !== null && timer > 0) {
      interval = setInterval(() => setTimer((t) => (t ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const getPrice = () => {
    let total = 0;
    if (snack) total += snacks.find(s => s.name === snack)?.price || 0;
    if (drink) total += drinks.find(d => d.name === drink)?.price || 0;
    if (meal) total += fullMeals.find(m => m.name === meal)?.price || 0;
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimer(minutes * 60);
    setHistory([
      {
        orderNumber,
        name,
        canteen,
        snack,
        drink,
        meal,
        upi,
        feed,
        minutes,
        tomorrowSuggestion,
        price: getPrice(),
        time: new Date().toLocaleString(),
      },
      ...history,
    ]);
    setOrderNumber(orderNumber + 1);
  };

  const resetForm = () => {
    setName("");
    setCanteen("");
    setSnack("");
    setDrink("");
    setMeal("");
    setUpi("");
    setFeed("");
    setMinutes(15);
    setTomorrowSuggestion("");
    setSubmitted(false);
    setTimer(null);
  };

  // Format timer as mm:ss
  const formatTimer = (t: number) =>
    `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        background: "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)",
        padding: 0,
        margin: 0,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div style={{ textAlign: "center", fontSize: "2rem", marginBottom: 10, paddingTop: 20 }}>
        🪨🍎🍊🍋🍉🍍🥭🍚🍕🍔🥟🥞🥗🟨🥣🍽️🍛🍲🪨
      </div>
      <h1 style={{ textAlign: "center" }}>
        <span style={{ color: "#2ecc40" }}>food</span>
        <span style={{ color: "#ff851b" }}>U</span>
        <span style={{ color: "#0074d9" }}>food</span>
      </h1>
      <div style={{
        maxWidth: 520,
        margin: "40px auto",
        padding: 24,
        background: "#eaffea",
        borderRadius: 16,
        boxShadow: "0 4px 24px #0002"
      }}>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", marginBottom: 12 }}
              />
            </label>
            <label>
              Select Canteen:
              <select
                value={canteen}
                required
                onChange={(e) => setCanteen(e.target.value)}
                style={{ width: "100%", marginBottom: 12 }}
              >
                <option value="">--Select--</option>
                <option value="jadhav">Jadhav Caterers (1st floor)</option>
                <option value="pune">Pune Meals (2nd floor)</option>
                <option value="freshia">FRESHIA, Ayush Canteen (3rd floor)</option>
              </select>
            </label>
            <label>
              Snack:
              <select
                value={snack}
                onChange={(e) => setSnack(e.target.value)}
                style={{ width: "100%", marginBottom: 12 }}
              >
                <option value="">--Select--</option>
                {snacks.map(s => (
                  <option key={s.name} value={s.name}>
                    {s.icon} {s.name} (₹{s.price})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Drink:
              <select
                value={drink}
                onChange={(e) => setDrink(e.target.value)}
                style={{ width: "100%", marginBottom: 12 }}
              >
                <option value="">--Select--</option>
                {drinks.map(d => (
                  <option key={d.name} value={d.name}>
                    {d.icon} {d.name} (₹{d.price})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Full Meal:
              <select
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                style={{ width: "100%", marginBottom: 12 }}
              >
                <option value="">--Select--</option>
                {fullMeals.map(m => (
                  <option key={m.name} value={m.name}>
                    {m.icon} {m.name} (₹{m.price})
                  </option>
                ))}
              </select>
            </label>
            <div style={{ fontWeight: "bold", marginBottom: 12 }}>
              Total Price: <span style={{ color: "#27ae60" }}>₹{getPrice()}</span>
            </div>
            <label>
              UPI Payment:
              <select
                value={upi}
                required
                onChange={(e) => setUpi(e.target.value)}
                style={{ width: "100%", marginBottom: 12 }}
              >
                <option value="">--Select--</option>
                {upiOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.name}</option>
                ))}
              </select>
            </label>
            <label>
              Feed:
              <textarea
                value={feed}
                onChange={(e) => setFeed(e.target.value)}
                placeholder="Your feedback or suggestions"
                style={{ width: "100%", marginBottom: 12 }}
              />
            </label>
            <label>
              I will be available in
              <input
                type="number"
                min={1}
                max={60}
                value={minutes}
                onChange={e => setMinutes(Number(e.target.value))}
                style={{ width: 60, margin: "0 8px" }}
              />
              minutes, prepare my meal!
            </label>
            <label>
              Tomorrow's meal suggestion:
              <input
                type="text"
                value={tomorrowSuggestion}
                onChange={(e) => setTomorrowSuggestion(e.target.value)}
                placeholder="Suggest for tomorrow"
                style={{ width: "100%", marginBottom: 12 }}
              />
            </label>
            <button type="submit" style={{ width: "100%", background: "#2ecc40", color: "#fff", fontWeight: "bold" }}>Submit</button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Thank you, {name}!</h2>
            <h3 style={{ color: "#ff851b" }}>Your Order Number: #{orderNumber}</h3>
            <p style={{ fontWeight: "bold", color: "#0074d9" }}>
              Your meal will be ready in {minutes} minutes!
            </p>
            {timer !== null && timer > 0 && (
              <div style={{ fontWeight: "bold", color: "#0074d9", margin: "12px 0" }}>
                ⏳ Time left: {formatTimer(timer)} minutes
              </div>
            )}
            <p>Scan the QR code below to pay:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay"
              alt="UPI QR"
              style={{ margin: "16px 0", borderRadius: 12, border: "4px solid #2ecc40" }}
            />
            <div>
              <img
                src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                alt="Enjoy"
                style={{ width: 120, borderRadius: 12, margin: "12px 0" }}
              />
            </div>
            <div style={{ marginTop: 16, color: "#2ecc40", fontWeight: "bold" }}>
              Enjoy your meal! 🥗🍕🍉
            </div>
            <button onClick={resetForm} style={{ marginTop: 20, background: "#ff851b", color: "#fff", border: "none", borderRadius: 8, padding: "8px 24px", fontWeight: "bold", cursor: "pointer" }}>
              New Order
            </button>
          </div>
        )}
      </div>
      <div style={{
        maxWidth: 520,
        margin: "20px auto",
        padding: 16,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001"
      }}>
        <h3 style={{ color: "#2ecc40", marginBottom: 8 }}>Previous Meal Records</h3>
        {history.length === 0 ? (
          <div style={{ color: "#888" }}>No records yet.</div>
        ) : (
          <ul style={{ paddingLeft: 16 }}>
            {history.map((rec, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <b>#{rec.orderNumber}</b> <b>{rec.name}</b> ({rec.canteen}) - {rec.snack && `${rec.snack}, `}{rec.drink && `${rec.drink}, `}{rec.meal && `${rec.meal}, `}
                ₹{rec.price} | <span style={{ color: "#0074d9" }}>{rec.time}</span>
                {rec.tomorrowSuggestion && (
                  <div style={{ fontSize: "0.95em", color: "#888" }}>Tomorrow: {rec.tomorrowSuggestion}</div>
                )}
                {rec.feed && (
                  <div style={{ fontSize: "0.95em", color: "#888" }}>Feed: {rec.feed}</div>
                )}
                {rec.minutes && (
                  <div style={{ fontSize: "0.95em", color: "#888" }}>Arrived in: {rec.minutes} min</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Right-side emoji column */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          fontSize: "2rem",
          gap: "1.2rem",
          userSelect: "none",
        }}
      >
        <span>🍊</span>
        <span>🥭</span>
        <span>🍉</span>
        <span>🍎</span>
        <span>🍍</span>
        <span>🍓</span>
        <span>🍑</span>
        <span>💧</span>
        <span>💦</span>
        <span style={{ fontSize: "2.5rem" }}>🧃</span>
      </div>
    </div>
  );
}

export default App;