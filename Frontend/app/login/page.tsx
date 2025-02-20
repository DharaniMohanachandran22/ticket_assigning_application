"use client";

import { useState, useEffect } from "react";
import styles from "./login.module.css";
import axios, { AxiosError } from "axios";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check login status after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(Boolean(token));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:3002/auth/log-in", {
        name,
        email,
        password,
      });
      localStorage.setItem("authToken", data.token);
      alert("Login successful!");
      setIsLoggedIn(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status === 401) {
        setError("User does not exist or incorrect credentials.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isLoggedIn) {
      setError("You are already signed in.");
      return;
    }
    try {
      await axios.post("http://localhost:3002/auth/sign-up", {
        name,
        email,
        password,
      });
      alert("Sign-up successful! You can now log in.");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status === 409) {
        setError("User already exists. Please log in.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button} onClick={handleLogin}>
          Login
        </button>
        <button type="submit" className={styles.button} onClick={handleSignUp}>
          Sign Up
        </button>
        <button type="submit" className={styles.button} onClick={handleLogOut}>
          Log Out
        </button>
      </form>
    </div>
  );
}
