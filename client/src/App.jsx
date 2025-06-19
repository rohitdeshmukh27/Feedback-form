import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/feedback",
        formData
      );
      setStatus(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Error submitting feedback");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto backdrop-blur-sm bg-white/80 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Feedback Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
              focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
              transition-all duration-300 hover:border-purple-300
              bg-white/50 backdrop-blur-sm"
            />
          </div>
          <div className="group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
              focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
              transition-all duration-300 hover:border-purple-300
              bg-white/50 backdrop-blur-sm"
            />
          </div>
          <div className="group">
            <textarea
              name="message"
              placeholder="Your feedback"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
              focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200
              transition-all duration-300 hover:border-purple-300
              bg-white/50 backdrop-blur-sm h-32 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 
            rounded-xl font-semibold text-lg shadow-lg
            hover:from-blue-600 hover:to-purple-700 
            transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Submit Feedback
          </button>
        </form>
        {status && (
          <p
            className={`mt-6 text-center text-lg font-medium animate-fade-in
              ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
