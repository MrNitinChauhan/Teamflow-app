// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';

// export default function CreateTask() {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     status: 'pending',
//     dueDate: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       await API.post('/tasks', {
//         ...form,
//         createdBy: user.id,
//         assignedTo: user.id,
//         createdAt: new Date().toISOString(),
//       });
//       alert('Task created!');
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create task!');
//     }
//   };

//   return (
//     <div>
//       <h2>Create Task</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Title"
//           onChange={handleChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//         />
//         <select name="status" onChange={handleChange}>
//           <option value="pending">Pending</option>
//           <option value="in_progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//         <input
//           name="dueDate"
//           type="date"
//           onChange={handleChange}
//         />
//         <button type="submit">Create Task</button>
//         <button type="button" onClick={() => navigate('/dashboard')}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// }


//--tailwind

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function CreateTask() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await API.post('/tasks', {
        title: form.title,
        description: form.description,
        status: form.status,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        createdBy: user.id,
        assignedTo: user.id,
        createdAt: new Date().toISOString(),
      });
      alert('Task created!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error details:', err.response?.data);
      alert('Failed to create task!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <div className="flex items-center mb-6 gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Create Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Task title"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Task description"
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              name="dueDate"
              type="date"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}