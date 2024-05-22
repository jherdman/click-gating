import { useState } from "react";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [shouldOpen, setShouldOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setShouldOpen(!shouldOpen)}>
        Toggle
      </button>
      <Modal shouldOpen={shouldOpen} />
    </>
  );
}

export default App;
