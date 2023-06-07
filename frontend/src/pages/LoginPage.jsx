import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const inputUsername = (e) => {
    setUsername(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/login", {
      username: username,
      password: password,
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.data.Status === 0) {
          return Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Password is not correct',
            showConfirmButton: false,
            timer: 1500
          });
        } else if (res.data.Status === 1) {
          return Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Username is not correct',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("LogedIn", true);
          localStorage.setItem("username", username);
          return nav("/profile");
        }
      });
  };

  return (
    <div>
      <div className='flex justify-center text-4xl text-black bg-gray-300 py-5'>
        Login
      </div>
      <div className='flex justify-center flex-col items-center'>
        <h1 className='text-center text-xl pt-6 mb-5'>ยินดีต้อนรับ</h1>
        <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
              <input type="text" value={username} onChange={inputUsername} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <input type="password" value={password} onChange={inputPassword} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
            </div>
            <button onClick={handleSubmit} type="submit" className="w-full text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
            <p className="text-sm font-light text-gray-500 ">
              Don’t have an account yet? <Link to="/signup" className='text-blue-700 hover:text-red-600 font-bold'>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;