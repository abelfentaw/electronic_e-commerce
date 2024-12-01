import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [firstName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "auth/register", {
          firstName,
          email,
          password,
        });
        console.log(response.data);

        setToken(response.data.token); // Set token in context
        localStorage.setItem("token", response.data.token); // Store token in local storage
        toast.success("Registration successful!");
        {
          /* if (response.data.success) {

          } else {
          toast.error(response.data.message);
        }*/
        }
      } else {
        const response = await axios.post(`${backendUrl}auth/login`, {
          email,
          password,
        });
        console.log(response.data.token);
        console.log(response.data);
        setToken(response.data.token); // Set token in context
        localStorage.setItem("token", response.data.token); // Store token in local storage
        toast.success("Login successful!");
        {
          /*if (response.data.success) {
        } else {
          toast.error(response.data.message);
          }*/
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home page after login/signup
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-500">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none mt-2 h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={firstName}
          type="text"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-400 rounded"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-400 rounded"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-0">
        <p className="cursor-pointer hover:text-black">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-black">
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:text-black">
            Login Here
          </p>
        )}
      </div>
      <button
        className="bg-black text-white font-light px-8 py-2 mt-4"
        type="submit">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
