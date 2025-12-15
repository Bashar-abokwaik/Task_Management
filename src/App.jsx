import { useState } from "react";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  // State to manage projects, selected project, and tasks
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    project: [],
    tasks: [],
  });

  // Handle adding a new task
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const TaskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: TaskId,
      }; // Create new task object
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      }; // Update state with new task
    });
  }

  // Handle deleting a task
  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  // Handle project selection
  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  // Handle canceling adding a new project
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    }); // undefined indicates no project selected
  }

  // Handle starting to add a new project
  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  } // null indicates adding a new project

  // Handle adding a new project
  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: projectId,
        project: [...prevState.project, newProject],
      }; // Update state with new project
    });
  }

  // Handle deleting the selected project
  function handleDeleteProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        project: prevState.project.filter(
          (project) => project.id !== projectId
        ), // Remove project
        tasks: prevState.tasks.filter((task) => task.projectId !== projectId), // Remove associated tasks
      };
    });
  }

  // Find the selected project based on selectedProjectId
  const selectedProject = projectsState.project.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={() => handleDeleteProject(selectedProject.id)}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancle={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.project}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
