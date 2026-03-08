import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ email, password })
      .then((res) => {
        console.log(res.data);

        // save user
        localStorage.setItem("user", JSON.stringify(res.data));

        alert("Login successful");

        // redirect
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed");
      });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontFamily: "Arial",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "#2196F3",
            color: "white",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don't have an account?{" "}
        <a href="/register" style={{ color: "#2196F3", textDecoration: "none" }}>
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;