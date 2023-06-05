import React from 'react';
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div className='AdminMenu'>
      <div className="AdminNemu__content">
        <div className="AdminMenu__dashboard-menu">
          <div className="AdminMenu__title">
            <p>Админ Панель</p>
          </div>
          <div className="AdminMenu__list">
            <NavLink
              to="/dashboard/admin"
              className="AdminMenu__link"
            >
              Профиль
            </NavLink>
          </div>
          <div className="AdminMenu__list">
            <NavLink
              to="/dashboard/admin/create-category"
              className="AdminMenu__link"
            >
              Создать категорию
            </NavLink>
          </div>
          <div className="AdminMenu__list">
            <NavLink
              to="/dashboard/admin/products"
              className="AdminMenu__link"
            >
              Все объявления
            </NavLink>
          </div>
          <div className="AdminMenu__list">
            <NavLink
              to="/dashboard/admin/users"
              className="AdminMenu__link"
            >
              Все профили
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMenu