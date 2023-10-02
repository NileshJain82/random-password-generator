import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    document.execCommand("copy");
  }, [password]);

  useEffect(() => {
    passGen();
  }, [length, numAllowed, charAllowed, passGen]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
  <h1 className="text-2xl font-semibold text-orange-300 mb-4">Password Generator</h1>

  <div className="flex items-center space-x-2 mb-4">
    <input
      type="text"
      value={password}
      ref={passwordRef}
      className="p-2 bg-gray-800 rounded text-white w-64"
      placeholder="Generated Password"
      readOnly
    />
    <button
      onClick={copyPasswordToClipboard}
      className="px-4 py-2 bg-blue-800 rounded text-white hover:bg-blue-900 focus:bg-blue-800 focus:outline-none"
    >
      Copy
    </button>
  </div>

  <div className="flex items-center space-x-4">
    <label className="text ">Length</label>
    <input
      type="range"
      min={8}
      max={30}
      value={length}
      onChange={(e) => setLength(e.target.value)}
      className="w-32"
    />
    <span className="text-gray-400">{length}</span>
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={numAllowed}
        id="numberInput"
        onChange={() => setNumAllowed(!numAllowed)}
        className="mr-2"
      />
      <label className="text-white" htmlFor="numberInput">Numbers</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={charAllowed}
        id="characterInput"
        onChange={() => setCharAllowed(!charAllowed)}
        className="mr-2"
      />
      <label className="text-white" htmlFor="characterInput">Special Characters</label>
    </div>
  </div>
</div>
  );
}

export default App;
