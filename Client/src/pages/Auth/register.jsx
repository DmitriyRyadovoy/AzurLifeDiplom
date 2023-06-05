import React, { useState } from "react";
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

import '../../assets/styles/style.scss'

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:4040/api/auth/register",
        { name, email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate("/login")
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
              <h1>Регистрация</h1>
              <form onSubmit={handleSubmit}>
                <div className="register__form-control">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='register__form-input'
                    placeholder='Введите имя'
                    required
                    autoFocus
                  />
                </div>
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
                  <button type="submit" className="register__form-btn btn-Noactive">Регистрация</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Register;