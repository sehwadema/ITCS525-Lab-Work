
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button({ value, onClick, isOperator = false, isTopRow = false }) {
  const { theme } = useContext(ThemeContext);

  const buttonColour =
    theme === "dark"
      ? isTopRow
        ? "bg-gray-500 text-white"
        : isOperator
          ? "bg-orange-500 text-white"
          : "bg-gray-700 text-white"
      : isTopRow
        ? "bg-gray-300 text-black"
        : isOperator
          ? "bg-orange-400 text-black"
          : "bg-gray-200 text-black";

  return (
    <button
      onClick={onClick}
      className={`${buttonColour} text-2xl rounded-full w-16 h-16 flex items-center justify-center hover:opacity-80`}
    >
      {value}
    </button>
  );
}

export default Button;
