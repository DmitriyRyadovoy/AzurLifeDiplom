import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import like from '../assets/Icons/PageCartId/icons8-червы-50.png'
import repost from '../assets/Icons/PageCartId/icons8-вправо-2-50.png'

const FavoritesPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FavoritesPage">
      <Layout>
        <div className="FavoritesPage__title">
          <div className="container">
            <p className='title'>Ваши избранные</p>
          </div>
        </div>
        <div className="catalogPage__sorting mb-product">
          <div className="container">
            <div className="catalogPage__ads-found">
              <p>{cart?.length}</p>
              <p>Объявлений найдено</p>
            </div>
          </div>
        </div>
        <div className="FavoritesPage__content">
          <div className="container">
            {
              cart?.map(product => (
                <div div className="catalogPage__catalog-item" >
                  <div className="catalogPage__catalog-item-img">
                    <img
                      src={`http://localhost:4040/api/catalog/product-photo/${product._id}`}
                      className="catalogPage__catalog-img"
                      alt={product.name}
                    />
                  </div>
                  <div className="catalogPage__catalog-item-content">
                    <NavLink to={`/product/${product.slug}`} className="catalogPage__catalog-item-title">
                      <div>
                        <p>{product.name}</p>
                      </div>
                    </NavLink>
                    <div className="catalogPage__catalog-item-description">
                      <p>{product.description.substring(0, 300)}</p>
                    </div>
                    <div className="catalogPage__catalog-item-price product-price">
                      <p>{product.price} ₽</p>
                    </div>
                    <div className="catalogPage__catalog-item-profile">
                      <div className='catalogPage__item-profile'>
                        {!product?.user?.surname ? (
                          <>
                          </>
                        ) : (
                          <><p>{product?.user?.surname}</p></>
                        )
                        }
                        <p>{product?.user?.name}</p>
                      </div>
                      <div>
                        <button className="catalogPage__catalog-item-profile-btn-tel">{product?.user?.phone}</button>
                      </div>
                    </div>
                  </div>
                  <div className='catalogPage__catalog-item-actions'>
                    <div>
                      <button
                        className='catalogPage__catalog-item-actions-btn btn'
                        onClick={() => removeCartItem(product._id)}
                      >
                        <img src={like} alt="likeimg" className='img' />
                      </button>
                    </div>
                    <div>
                      <button className='catalogPage__catalog-item-actions-btn btn'>
                        <img src={repost} alt="repostimg" className='img' />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Layout >
    </div >
  )
}

export default FavoritesPage