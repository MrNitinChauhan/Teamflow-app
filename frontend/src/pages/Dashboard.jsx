// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedUser = localStorage.getItem('user');
//     if (!loggedUser) {
//       navigate('/login');
//       return;
//     }
//     setUser(JSON.parse(loggedUser));
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await API.get('/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h2>Welcome, {user?.name}!</h2>
//       <button onClick={handleLogout}>Logout</button>

//       <h3>Tasks</h3>
//       <button onClick={() => navigate('/tasks/create')}>+ Create Task</button>

//       {tasks.length === 0 ? (
//         <p>No tasks yet!</p>
//       ) : (
//         tasks.map(task => (
//           <div key={task.id} onClick={() => navigate(`/tasks/${task.id}`)} style={{cursor:'pointer'}}>
//             <h4>{task.title}</h4>
//             <p>{task.description}</p>
//             <p>Status: {task.status}</p>
//             <p>Due: {task.dueDate}</p>
//           </div>
//         ))
//       )}
//       <button onClick={() => navigate('/reminders')}>My Reminders</button>
//     </div>
//   );
// }


//----tailwind


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Cookie se verify karo
    API.get('/users/me', { withCredentials: true })
      .then((res) => {
        setUser(res.data); // user set karo
        fetchTasks();
      })
      .catch(() => {
        navigate('/login'); // token nahi hai toh login pe bhejo
      });
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await API.post('/users/logout', {}, { withCredentials: true });
    navigate('/login');
  };

  const statusColor = (status) => {
    if (status === 'completed') return 'bg-green-100 text-green-700';
    if (status === 'in_progress') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Teamflow</h1>
        <div className="flex gap-3 items-center">
          <span className="text-gray-600 text-sm">Hello, {user?.name}!</span>
          <button
            onClick={() => navigate('/reminders')}
            className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
          >
            Reminders
          </button>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => navigate('/tasks/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Create Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl">No tasks yet!</p>
            <p className="text-sm mt-2">Click "Create Task" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-md cursor-pointer transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{task.description}</p>
                {task.dueDate && (
                  <p className="text-xs text-gray-400 mt-2">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}