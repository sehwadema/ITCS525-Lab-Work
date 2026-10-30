import {useState} from 'react'

function App() {
  const [input, setInput] = useState("0");

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("0");

    } else if (value === "%") {
      // Convert the displayed number into a percentage
      setInput(String(Number(input) / 100));

    } else if (value === "±") {
      // Change a positive number to negative, or vice versa
      setInput(String(Number(input) * -1));

    } else if (value === "⌫") {
      if (input === "Error") {
        setInput("0");
        return;
      } else {
        setInput(input.length === 1 ? "0" : input.slice(0, -1));
      }

    } else if (value === "=") {
      try {
        const expr = input
          .replaceAll("÷", "/")
          .replaceAll("x", "*")
          .replaceAll("-", "-");

        setInput(eval(expr).toString());

      } catch {
        setInput("Error");
      }

    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  return (
    <div className="min-h-screen bg-amber-100 flex flex-col items-center justify-center">
      <div className="w-80 min-h-100 bg-black rounded-4xl shadow-2xl">
        <div className="text-right text-white text-4xl p-8">
          {input}
        </div>
         <div className="grid grid-cols-4 gap-2 m-3">
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("⌫")} >
            ⌫
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("AC")} >
            AC
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("%")} >
            %
          </button>
          <button className="aspect-square rounded-full bg-orange-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("÷")} >
            ÷
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("7")} >
            7
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("8")} >
            8
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("9")} >  
            9   
          </button>
          <button className="aspect-square rounded-full bg-orange-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("x")} >
            x
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("4")} >
            4
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("5")} >
            5
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("6")} >
            6
          </button>
          <button className="aspect-square rounded-full bg-orange-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("-")} >
            -
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("1")} > 
          1
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("2")} > 
            2
          </button> 
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("3")} >
            3
          </button>
          <button className="aspect-square rounded-full bg-orange-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("+")} >
            +
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("±")} >
            ±
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("0")} >
            0
          </button>
          <button className="aspect-square rounded-full bg-gray-500 text-white text-xl hover:opacity-80" onClick={() => handleClick(".")} >
            .
          </button>
          <button className="aspect-square rounded-full bg-orange-500 text-white text-xl hover:opacity-80" onClick={() => handleClick("=")} >
            =
          </button> 

        </div>
      </div>
    </div>
  )
}

export default App