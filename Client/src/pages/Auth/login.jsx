import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

import '../../assets/styles/style.scss'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:4040/api/auth/login", {
        email,
        password
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.error();
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="Registers">
      <Layout>
        <div className="container">
          <div className="register__content">
            <div className="register__form-content cont">
              <h1>Авторизация</h1>
              <form onSubmit={handleSubmit}>
                <div className="register__form-control">
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className='register__form-input'
                    placeholder='Введите email'
                    required
                  />
                </div>
                <div className="register__form-control">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='register__form-input'
                    placeholder='Введите пароль'
                    required
                  />
                </div>
                <div className="register__form-control">
                  <button type="submit" className="register__form-btn btn btn-Noactive">Авторизация</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Login;