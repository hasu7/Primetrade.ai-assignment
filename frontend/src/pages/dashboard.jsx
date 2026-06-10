import { useEffect, useState } from "react";
import API from "../services/api";
import { getUserRole } from "../utils/auth";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const role = getUserRole();

  // FETCH TASKS
  useEffect(() => {
    let ignore = false;

    const loadTasks = async () => {
      try {
        const res = await API.get("/tasks");

        if (!ignore) {
          setTasks(res.data?.tasks || []);
        }

      } catch (err) {
        console.log(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  // CREATE TASK
  const createTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/tasks", { title });

      setTasks((prev) => [...prev, res.data.task]);
      setTitle("");

    } catch (err) {
      console.log(err);
    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (id, status) => {
    try {
      const newStatus = status === "completed" ? "pending" : "completed";

      const res = await API.put(`/tasks/${id}`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data.task : t))
      );

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((t) => t._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Role: {role}
      </p>

      {/* CREATE */}
      <div className="flex gap-2 mb-4">

        <input
          className="border p-2 w-full rounded"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>

      </div>

      {/* TASKS */}
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="space-y-2">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="border p-3 rounded flex justify-between items-center"
            >

              <div
                className="cursor-pointer"
                onClick={() =>
                  toggleStatus(task._id, task.status)
                }
              >
                <h2 className="font-semibold">
                  {task.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {task.status}
                </p>
              </div>

              {role === "admin" && (
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;