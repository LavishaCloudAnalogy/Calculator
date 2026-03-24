import { useState , useEffect } from "react";
import { calculate } from "./utils/calculator";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [history,setHistory]=useState<{expression:string;result:string}[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(()=>{
    const stored=localStorage.getItem("calcHistory");
    if(stored){
        setHistory(JSON.parse(stored));
    }
  },[])

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      const res = calculate(input);
      const resString=String(res);
        setResult(resString);
      const newEntry={expression:input,result:resString};
      const newHistory=[...history,newEntry];
      setHistory(newHistory);
      localStorage.setItem("calcHistory",JSON.stringify(newHistory));
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    "(", ")", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="flex items-start">
      <div className="bg-gray-800 p-6 rounded-3xl shadow-2xl w-[340px]">
        
        <div className="mb-4 p-4 bg-black rounded-xl text-right break-words">
          <div className="text-gray-400 text-sm min-h-[20px]">{input || "0"}</div>
          <div className="text-3xl font-bold">{result}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "=") handleCalculate();
                else handleClick(btn);
              }}
              className={`p-4 rounded-2xl text-lg font-semibold transition-all duration-150
                ${btn === "="
                  ? "col-span-2 bg-green-500 hover:bg-green-400"
                  : "bg-gray-700 hover:bg-gray-600"}`}
            >
              {btn}
            </button>
          ))}

          
          <button
            onClick={handleClear}
            className="col-span-4 p-4 bg-red-500 rounded-2xl hover:bg-red-400 font-bold"
          >
            CLEAR
          </button>
        </div>
      </div>

      {showHistory && (
      <div className="ml-4 w-[200px] bg-gray-800 p-4 rounded-2xl shadow-xl max-h-[400px] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">History</h2>

        {history.slice().reverse().map((item, index) => (
          <div key={index} className="text-sm mb-1">
            {item.expression} = {item.result}
          </div>
        ))}
      </div>
    )}

  </div>

  
  <button
    onClick={() => setShowHistory((prev) => !prev)}
    className="absolute right-6 top-6 bg-blue-500 px-4 py-2 rounded-xl text-sm hover:bg-blue-400"
  >
    {showHistory ? "Hide History" : "Show History"}
  </button>
    </div>
  );
}
