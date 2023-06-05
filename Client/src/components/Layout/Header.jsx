import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

// Images
import logo from '../../assets/Icons/NavbarIcons/LogoSvgDev.svg'
import iconsSettings from '../../assets/Icons/NavbarIcons/icons8-settings.svg'
import ads from '../../assets/Icons/NavbarIcons/icons8-круглое-меню-50.png'
import like from '../../assets/Icons/NavbarIcons/icons8-like.svg'
import Exit from '../../assets/Icons/NavbarIcons/iconsExit.png'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [DropDownMenu, SetDropDownMenu] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <NavLink to="/" className="header__link header__logo">
            <img src={logo} alt="LogoSvg" className="Logo-img img" />
            <p className="header__logo-title title">Azur Life</p>
          </NavLink>
          <div className="header__menu-body">
            <ul className="header__menu-list">
              <li className="header__menu-link">
                <NavLink to="/Catalog" className="header__link">Купить</NavLink>
              </li>
              <li className="header__menu-link">
                <NavLink to="/About" className="header__link">О нас</NavLink>
              </li>
              <li className="header__menu-link">
                <NavLink to="/place-an-ad" className="header__link">Разместить объявление</NavLink>
              </li>
              <li className="header__menu-link">
                <NavLink to={`/favorites`} className="header__link DropDownMenu__link">
                  <img src={like} alt="" className="DropDownMenu__img img" />
                  <p>Избранные</p>
                  {
                    !cart?.length ? (
                      <>
                      </>
                    ) : (
                      <>
                        <span> {cart?.length} </span>
                      </>
                    )
                  }

                </NavLink>
              </li>
              {
                !auth.user ? (
                  <>
                    <li>
                      <NavLink to="/register" className="header__link">Регистрация</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="header__link">Войти</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="header__menu-link header__open-DropDownMenu"
                      onClick={() => SetDropDownMenu(!DropDownMenu)}
                    >
                      <p>Личный кабинет</p>
                    </li>
                    {DropDownMenu &&
                      <div className="DropDownMenu">
                        <div className="DropDownMenu__content">
                          <ul className="DropDownMenu__menu-list">
                            <li>
                              <p className="header__link DropDownMenu__user-name">{auth?.user?.name}</p>
                            </li>
                            <li className="DropDownMenu__menu-link">
                              <NavLink to={'/my-product'} className="header__link DropDownMenu__link">
                                <img src={ads} alt="" className="DropDownMenu__img img" />
                                <p>Мои объявления</p>
                              </NavLink>
                            </li>

                            <li className="DropDownMenu__menu-link">
                              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="header__link DropDownMenu__link">
                                <img src={iconsSettings} alt="iconsSettings" className="DropDownMenu__img img" />
                                {auth?.user?.role === 1 ? "Админ панель" : "Настройки профиля"}
                              </NavLink>
                            </li>
                            <li className="DropDownMenu__menu-link">
                              <NavLink onClick={handleLogout} to="/login" className="header__link DropDownMenu__link">
                                <img src={Exit} alt="iconsSettings" className="DropDownMenu__img img" />
                                Выход
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    }
                  </>
                )
              }
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;