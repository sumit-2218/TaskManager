import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasksByUser, createTask, deleteTask, updateTask } from "../services/taskService";

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      getTasksByUser(user.id).then((res) => {
        setTasks(res.data);
      });
    }
  }, []);

  const handleAddTask = () => {
    const newTask = {
      title: title,
      description: description,
      status: status,
      user: { id: user.id }
    };

    if (editingTaskId) {
      updateTask(editingTaskId, newTask).then((res) => {
        setTasks(tasks.map((t) => (t.id === editingTaskId ? res.data : t)));
        setEditingTaskId(null);
        setTitle("");
        setDescription("");
        setStatus("PENDING");
      });
    } else {
      createTask(newTask).then((res) => {
        setTasks([...tasks, res.data]);
        setTitle("");
        setDescription("");
        setStatus("PENDING");
      });
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "PENDING");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>
          Task Dashboard {user?.name ? `- Welcome ${user.name}` : ""}
        </h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "5px",
            background: "#333",
            color: "white",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <button
          onClick={handleAddTask}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer"
          }}
        >
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
        {editingTaskId && (
          <button
            onClick={() => {
              setEditingTaskId(null);
              setTitle("");
              setDescription("");
              setStatus("PENDING");
            }}
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              background: "#999",
              color: "white",
              cursor: "pointer"
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              background: "white",
              transition: "transform 0.15s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>{task.title}</h3>
            <p style={{ margin: "4px 0" }}>{task.description}</p>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
                background:
                  task.status === "COMPLETED"
                    ? "#4CAF50"
                    : task.status === "IN_PROGRESS"
                    ? "#FF9800"
                    : "#9E9E9E"
              }}
            >
              {task.status}
            </span>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEditTask(task)}
                style={{
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "4px",
                  background: "#2196F3",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "4px",
                  background: "#f44336",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskDashboard;