import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import iconsTel from '../../assets/Icons/Footer/iconsTel.svg'
import iconsEmail from '../../assets/Icons/Footer/iconsEmail.svg'

// Images
import logo from '../../assets/Icons/NavbarIcons/LogoSvgDev.svg'
const Footer = () => {
  return ( 
    <div className="footer mb">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <NavLink to="/" className="header__link header__logo">
              <img src={logo} alt="LogoSvg" className="Logo-img img"/>
              <p className="header__logo-title title">Azur Life</p>
            </NavLink>
          </div>
          <div className="footer__section">
            <p>© 2016–2023, ООО «Azur Life»</p>
            <p>Москва, 121170, Кутузовский проспект, д. 32, к. 1, ОГРН: 1157746652150 ИНН: 7736249247</p>
            <p>* По данным исследование ООО «Эксперт Бизнес-Решения», проведенного в период 01.11.2021-31.12.2021, Домклик (AzurLife.ru) — лидер рынка по количеству актуальных объявлений о продаже жилой недвижимости в многоквартирных домах в РФ.</p>
            <p>Использование сайта означает согласие с Пользовательским соглашением и Политикой обработки персональных данных</p>
          </div>
          <div className="footer__section">
            <div className="footer__section-item-actions">
              <img src={iconsTel} alt="iconsTel" className="img"/>
              <p>+7 (999) 888 77 66</p>
            </div>
            <div className="footer__section-item-actions">
              <img src={iconsEmail} alt="iconsTel" className="img"/>
              <p>AzurLife@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Footer;