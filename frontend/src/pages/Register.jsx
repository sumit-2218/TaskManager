import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      await register({
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        role: role
      });

      setMessage("Registration successful. You can now login.");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage("Registration failed. Email may already exist.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        fontFamily: "Arial",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", textAlign: "center" }}>{message}</p>
      )}
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;