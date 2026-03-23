// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../services/api';

// export default function TaskDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState('');

//   useEffect(() => {
//     fetchTask();
//     fetchComments();
//   }, []);

//   const fetchTask = async () => {
//     try {
//       const res = await API.get(`/tasks/${id}`);
//       setTask(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await API.get(`/comments?filter={"where":{"taskId":${id}}}`);
//       setComments(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       await API.post('/comments', {
//         content: comment,
//         taskId: Number(id),
//         userId: user.id,
//         createdAt: new Date().toISOString(),
//       });
//       setComment('');
//       fetchComments();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add comment!');
//     }
//   };

//   const handleDeleteTask = async () => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleStatusChange = async (e) => {
//     try {
//       await API.patch(`/tasks/${id}`, { status: e.target.value });
//       fetchTask();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!task) return <p>Loading...</p>;

//   return (
//     <div>
//       <button onClick={() => navigate('/dashboard')}>Back</button>

//       <h2>{task.title}</h2>
//       <p>{task.description}</p>
//       <p>Due: {task.dueDate}</p>

//       <select value={task.status} onChange={handleStatusChange}>
//         <option value="pending">Pending</option>
//         <option value="in_progress">In Progress</option>
//         <option value="completed">Completed</option>
//       </select>

//       <button onClick={handleDeleteTask}>Delete Task</button>

//       <hr />

//       <h3>Comments</h3>
//       {comments.length === 0 ? (
//         <p>No comments yet!</p>
//       ) : (
//         comments.map(c => (
//           <div key={c.id}>
//             <p>{c.content}</p>
//             <small>{c.createdAt}</small>
//           </div>
//         ))
//       )}

//       <form onSubmit={handleAddComment}>
//         <input
//           placeholder="Add a comment..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <button type="submit">Add Comment</button>
//       </form>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchTask();
    fetchComments();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments?filter={"where":{"taskId":${id}}}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await API.post('/comments', {
        content: comment,
        taskId: Number(id),
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      setComment('');
      fetchComments();
    } catch (err) {
      console.error(err);
      alert('Failed to add comment!');
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await API.patch(`/tasks/${id}`, { status: e.target.value });
      fetchTask();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = (status) => {
    if (status === 'completed') return 'bg-green-100 text-green-700';
    if (status === 'in_progress') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  if (!task) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

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
        {/* Task Card */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            <button
              onClick={handleDeleteTask}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>

          <p className="text-gray-500 mt-2">{task.description}</p>

          {task.dueDate && (
            <p className="text-sm text-gray-400 mt-2">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={task.status}
              onChange={handleStatusChange}
              className={`px-3 py-1 rounded-lg text-sm font-medium border-0 cursor-pointer ${statusColor(task.status)}`}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Comments</h3>

          {comments.length === 0 ? (
            <p className="text-gray-400 text-sm">No comments yet!</p>
          ) : (
            <div className="space-y-3 mb-4">
              {comments.map(c => (
                <div key={c.id} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700 text-sm">{c.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAddComment} className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}