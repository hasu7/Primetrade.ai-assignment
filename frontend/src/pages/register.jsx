import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registered successfully");
      navigate("/");

    } catch (err) {
  console.log("REGISTRATION ERROR:", err.response?.data || err.message);
}
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >

        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Create Account
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;