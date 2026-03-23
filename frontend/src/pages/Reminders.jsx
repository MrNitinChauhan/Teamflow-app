// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';

// export default function Reminders() {
//   const [reminders, setReminders] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [form, setForm] = useState({
//     taskId: '',
//     remindAt: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     fetchReminders();
//     fetchTasks();
//   }, []);

//   const fetchReminders = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const res = await API.get(`/reminders?filter={"where":{"userId":${user.id}}}`);
//       setReminders(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get('/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       await API.post('/reminders', {
//         taskId: Number(form.taskId),
//         userId: user.id,
//         remindAt: new Date(form.remindAt).toISOString(),
//         isSent: false,
//         createdAt: new Date().toISOString(),
//       });
//       alert('Reminder created!');
//       setForm({ taskId: '', remindAt: '' });
//       fetchReminders();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create reminder!');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/reminders/${id}`);
//       fetchReminders();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => navigate('/dashboard')}>Back</button>
//       <h2>Reminders</h2>

//       <h3>Create Reminder</h3>
//       <form onSubmit={handleSubmit}>
//         <select name="taskId" onChange={handleChange} value={form.taskId}>
//           <option value="">Select a task</option>
//           {tasks.map(task => (
//             <option key={task.id} value={task.id}>
//               {task.title}
//             </option>
//           ))}
//         </select>
//         <input
//           name="remindAt"
//           type="datetime-local"
//           onChange={handleChange}
//           value={form.remindAt}
//         />
//         <button type="submit">Set Reminder</button>
//       </form>

//       <hr />

//       <h3>My Reminders</h3>
//       {reminders.length === 0 ? (
//         <p>No reminders yet!</p>
//       ) : (
//         reminders.map(reminder => (
//           <div key={reminder.id}>
//             <p>Task ID: {reminder.taskId}</p>
//             <p>Remind At: {new Date(reminder.remindAt).toLocaleString()}</p>
//             <p>Status: {reminder.isSent ? 'Sent' : 'Pending'}</p>
//             <button onClick={() => handleDelete(reminder.id)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ taskId: '', remindAt: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    fetchReminders();
    fetchTasks();
  }, []);

  const fetchReminders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await API.get(`/reminders?filter={"where":{"userId":${user.id}}}`);
      setReminders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await API.post('/reminders', {
        taskId: Number(form.taskId),
        userId: user.id,
        remindAt: new Date(form.remindAt).toISOString(),
        isSent: false,
        createdAt: new Date().toISOString(),
      });
      setForm({ taskId: '', remindAt: '' });
      fetchReminders();
    } catch (err) {
      console.error(err);
      alert('Failed to create reminder!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reminder?')) return;
    try {
      await API.delete(`/reminders/${id}`);
      fetchReminders();
    } catch (err) {
      console.error(err);
    }
  };

  const getTaskTitle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    return task ? task.title : 'Unknown Task';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Teamflow</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Create Reminder */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Set a Reminder</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Task</label>
              <select
                name="taskId"
                value={form.taskId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a task...</option>
                {tasks.map(task => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remind At</label>
              <input
                name="remindAt"
                type="datetime-local"
                value={form.remindAt}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Set Reminder
            </button>
          </form>
        </div>

        {/* Reminders List */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">My Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-gray-400 text-sm">No reminders yet!</p>
          ) : (
            <div className="space-y-3">
              {reminders.map(reminder => (
                <div
                  key={reminder.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <p className="text-gray-800 font-medium text-sm">
                      {getTaskTitle(reminder.taskId)}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(reminder.remindAt).toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                      reminder.isSent
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {reminder.isSent ? 'Sent' : 'Pending'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(reminder.id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
