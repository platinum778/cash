"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import css from "./style.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/assets/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  };
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <section className={css.container}>
      <form className={css.auth} onSubmit={login}>
        <label className={css.auth__label}>
          <span className={css.auth__text}>Email</span>
          <input
            className={css.auth__input}
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
            title="Email"
            required
          />
        </label>
        <label className={css.auth__label}>
          <span className={css.auth__text}>Password</span>
          <input
            className={css.auth__input}
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            title="Password"
            required
          />
          {error?.code === 400 && <span>password incorect</span>}
        </label>
        <button type="submit" className={css.auth__logIn}>
          Log in
        </button>
      </form>
    </section>
  );
};

export default Auth;
