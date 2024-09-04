import React, { useState } from "react";
import { api } from "./util";

interface SignInResponse {
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post<SignInResponse>(
        `/auth/sign-in?email=${email}&password=${password}`,
        {
          email,
          password,
        }
      )
      .then((response) => {
        location.reload();
        alert("Login Berhasil");
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", email);
        location.href = "/home";
      })
      .catch(() => {
        alert("Email atau password salah");
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Selamat Datang Kembali!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Login Terlebih Dahulu
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input Email */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Alamat email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Alamat email"
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Kata sandi"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? "😎" : "👁️"}
              </span>
            </div>
          </div>

          <div className="text-right mb-6">
            <a href="#" className="text-indigo-500 text-sm hover:underline">
              Lupa kata sandi?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
