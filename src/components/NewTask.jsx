import { useState } from "react";
import Modal from "./Modal";

export default function NewTask({ onAdd }) {
  // State for input value
  const [enteredTask, setEnteredTask] = useState("");

  // Controls modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // Handle input change
  function handleTaskChange(event) {
    setEnteredTask(event.target.value);
  }

  // Handle add task button click
  function handleAddTask() {
    // Validate input
    if (enteredTask.trim() === "") {
      setModalOpen(true); // Show error modal
      return;
    }

    // Add task
    onAdd(enteredTask);

    // Reset input
    setEnteredTask("");
  }

  return (
    <>
      {/* Error Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        buttonCaption="Okay"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Task</h2>
        <p className="text-stone-600 mb-4">
          Please enter a valid task name before adding it.
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          value={enteredTask}
          onChange={handleTaskChange}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </>
  );
}
