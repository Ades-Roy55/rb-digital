import { useState } from "react";
import { api } from "./util";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    api
      .post(`/auth/register`, formData)
      .then(() => {
        alert("Daftar akun berhasil!"); 
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg my-6 transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Buat Profil</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 bottom-4 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? "😎" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300"
          >
            Daftar
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Sudah punya akun?{" "}
          <a href="/login" className="text-purple-500 hover:underline">
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
}
