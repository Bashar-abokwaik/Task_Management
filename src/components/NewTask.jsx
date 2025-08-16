import { useState, useRef } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");
  const modal = useRef();

  function handleTaskChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      modal.current.open();    
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <>
    <Modal ref={modal} buttonCaption="Okay">
      <h2 className="text-2xl font-bold text-stone-950">Add New Task</h2>
      <p className="text-stone-700">
        Enter the name of the new task below and click "Add Task" to save it.
      </p>
    </Modal>
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleTaskChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
    </>
  );
}
