
import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import Button from "./Button";

export default function App() {
  const [input, setInput] = useState("0");
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);

  // Fetch calculation history from FastAPI
  const fetchHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  // Fetch history when the component mounts
  useEffect(() => {
    fetchHistory();
  }, []);

  // Switch between light and dark themes
  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "dark" ? "light" : "dark"
    );
  };

  // Handle calculator button clicks
  const handleClick = async (value) => {
    if (value === "AC") {
      setInput("0");

      try {
        await fetch("http://127.0.0.1:8000/history", {
          method: "DELETE",
        });

        await fetchHistory();
      } catch (error) {
        console.error("Failed to clear history:", error);
      }

    } else if (value === "±") {
      setInput(String(Number(input) * -1));
    } else if (value === "⌫") {
        setInput(input.length === 1 ? "0" : input.slice(0, -1));
      } else if (value === "=") {
      try {
        const expr = input
          .replaceAll("÷", "/")
          .replaceAll("×", "*")
          .replaceAll("−", "-");

        const response = await fetch(
          "http://127.0.0.1:8000/calculate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ expr }),
          }
        );

        const data = await response.json();

        if (data.ok) {
          setInput(String(data.result));
          await fetchHistory();
        } else {
          setInput("Error");
        }
      } catch (error) {
        console.error("Calculation failed:", error);
        setInput("Error");
      }

    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  // Calculator button layout
  const topRow = ["⌫", "AC", "%", "÷"];

  const rows = [
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="],
  ];

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          theme === "dark" ? "bg-gray-100" : "bg-amber-100"
        }`}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`mb-4 px-4 py-2 rounded-full ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Calculator */}
        <div
          className={`rounded-3xl p-4 shadow-2xl w-80 ${
            theme === "dark" ? "bg-black" : "bg-white"
          }`}
        >
          {/* Display */}
          <div
            className={`text-right text-5xl font-light p-4 mb-2 break-all ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {input}
          </div>

          {/* Top Row */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            {topRow.map((btn) => (
              <Button
                key={btn}
                value={btn}
                onClick={() => handleClick(btn)}
                isTopRow={btn !== "÷"}
                isOperator={btn === "÷"}
              />
            ))}
          </div>

          {/* Number and Operator Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-3 mb-3"
            >
              {row.map((btn) => {
                const isOperator = [
                  "÷",
                  "×",
                  "−",
                  "+",
                  "=",
                ].includes(btn);

                return (
                  <Button
                    key={btn}
                    value={btn}
                    onClick={() => handleClick(btn)}
                    isOperator={isOperator}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
