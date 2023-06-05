import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import like from '../assets/Icons/PageCartId/icons8-червы-50.png'
import repost from '../assets/Icons/PageCartId/icons8-вправо-2-50.png'
import toast from "react-hot-toast";

const MyProduct = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");

  // Получание всего каталога
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4040/api/catalog/my-product");
      setProducts(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (auth?.token) getAllProducts();
  }, [auth?.token]);

  return (
    <div className='my-product'>
      <Layout>
        <div className="catalogPage__sorting mb-product">
          <div className="container">
            <p className='title'>Ваши Объявлений</p>
            <div className="catalogPage__ads-found">
              <p>{products?.length}</p>
              <p>Объявлений найдено</p>
            </div>
          </div>
        </div>
        <div className="catalogPage__all-catalog mb">
          <div className="container">
            <div className="catalogPage__all-catalog-content">
              {products?.map((product) => (
                <div className="catalogPage__catalog-item" key={product._id}>
                  <div className="catalogPage__catalog-item-img">
                    <img
                      src={`http://localhost:4040/api/catalog/product-photo/${product._id}`}
                      className="catalogPage__catalog-img"
                      alt={product.name} />

                  </div>
                  <div className="catalogPage__catalog-item-content">
                    <Link to={`/product/${product.slug}`} className="catalogPage__catalog-item-title">
                      <div>
                        <p>{product.name}</p>
                      </div>
                    </Link>
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
                        className='catalogPage__catalog-item-actions-btn'
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          )
                          toast.success("Item Added to cart");
                        }}
                      >
                        <img src={like} alt="likeimg" className='img' />
                      </button>
                    </div>
                    <div>
                      <Link
                        to={`/product/edit-product/${product.slug}`}
                        className="catalogPage__edit-link btn btn-Noactive"
                      >Редактировать</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default MyProduct