import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/Admin/adminMenu';
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const AdminUsers = () => {

  const [users, setUsers] = useState([]);

  // Получание всех пользователей
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4040/api/auth/all-user");
      setUsers(data.users);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4040/api/auth/delete-user/${id}`
      );
      if (data.success) {
        toast.success(`User is deleted`);

        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <div className="admin">
      <Layout>
        <div className="container">
          <div className="admin__users row mb-product mg-page">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="admin__users-content flex">
              <div className="admin__title title mb-product">
                Пользователи
              </div>
              <div className="admin__users-cont">
                <div className="admin__category-text">
                  <div className="admin__category-title">
                    <h3>Имя</h3>
                  </div>
                  <div className="admin__category-title">
                    <h3>Почта</h3>
                  </div>
                  <div className="admin__category-title">
                    <h3>Дата регистрации</h3>
                  </div>
                  <div className="admin__category-title">
                    <h3>Функции</h3>
                  </div>
                </div>
                {users?.map(user => {
                  const date = new Date(user.createdAt)
                  const currentDate = {
                    day: date.getDate(),
                    month: date.getMonth() + 1,
                    year: date.getFullYear()
                  }
                  return <div className='admin__category-item cont' key={user.id}>
                    <Link to={`/dashboard/admin/get-user/${user._id}`} className='admin__user-link'>
                      <div className="admin__category-name">
                        {user.name}
                      </div>
                      <div className="admin__user-link admin__category-email">
                        {user.email}
                      </div>
                    </Link>
                    <div className="comment__item-date">
                      {currentDate.day}.{currentDate.month}.{currentDate.year}
                    </div>
                    <button
                      className="admin__category-destroy-btn btn"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AdminUsers