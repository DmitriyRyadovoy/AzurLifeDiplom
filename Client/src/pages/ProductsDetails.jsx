import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import like from '../assets/Icons/PageCartId/icons8-червы-50.png'
import repost from '../assets/Icons/PageCartId/icons8-вправо-2-50.png'
import Slider from "../components/slider";
import { useAuth } from "../context/auth.jsx";

const ProductsDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState([]);
  const [user] = useAuth()
  const [auth, setAuth] = useAuth();
  const [id, setId] = useState("");

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4040/api/catalog/single-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }

  };

  const getComments = async () => {
    const { data } = await axios.get("http://localhost:4040/api/comment", { params: { slug: params.slug } })
    setComments(data)
  }

  const addCommentHandler = async (e) => {
    e.preventDefault()
    console.log(user)
    if (commentValue && user.user) {
      const comment = {
        slug: params.slug,
        productId: product._id,
        userId: user.user._id,
        title: commentValue
      }
      await axios.post(`http://localhost:4040/api/comment/${params.slug}/comments/create`, comment)
        .then((res) => {
          console.log(res.data.success)
          if (res.data.success) {
            comments.push({
              ...comment,
              createdAt: new Date(),
              userId: user.user
            })
            setCommentValue("")
          }
        })
    }
  }

  const date = new Date(product.createdAt)
  const currentDate = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }

  // Initialp details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
      getComments();
    }
  }, [params?.slug]);
  return (
    <div className="ProductsDetails">
      <Layout>
        <div className="ProductsDetails__content mg-page">
          <div className="container">
            <div className="ProductsDetails__wrapper">
              <div className="ProductsDetails__products">
                <div className="ProductsDetails__products-main-img">
                  <div className="col-md-6">
                    <img
                      src={`http://localhost:4040/api/catalog/product-photo/${product._id}`}
                      className="ProductsDetails__main-img img"
                      alt={product.name}
                    />
                  </div>
                </div>
              </div>
              <div className="ProductsDetails__user-info">
                <div className="ProductsDetails__user-content-info">
                  <div className="ProductsDetails__user-products-name">
                    <p>{product.name}</p>
                  </div>
                  <div className="ProductsDetails__user-products-price product-price">
                    <p>{product.price} ₽</p>
                  </div>
                  { }
                  <div className="ProductsDetails__user">
                    <div className="ProductsDetails__user-photo">
                      <img
                        src={`http://localhost:4040/api/auth/user-photo/${product?.user?._id}`}
                        alt=""
                        height={"200px"}
                        className="ProductsDetails__user-photo img"
                      />
                    </div>
                    <div className="ProductsDetails__user-name">
                      {!product?.user?.surname ? (
                        <>
                        </>
                      ) : (
                        <><p>{product?.user?.surname}</p></>
                      )
                      }
                      <p>{product?.user?.name}</p>
                    </div>
                  </div>
                  <div className="ProductsDetails__user-text">
                    <p>Можно позвонить или написать в чате, СМС и сообщения в мессенджерах не будут доставлены</p>
                  </div>
                </div>
                <div className="ProductsDetails__user-content">
                  <div className="ProductsDetails__user-btn btn-active">
                    <p>{product?.user?.phone}</p>
                  </div>
                  <div className="ProductsDetails__user-btn btn-Noactive">
                    <p>Написать</p>
                  </div>
                </div>
                <div className="ProductsDetails__product-actions">
                  <button
                    className='catalogPage__catalog-item-actions-btn btn'
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

                  <button className='catalogPage__catalog-item-actions-btn btn'>
                    <img src={repost} alt="repostimg" className='img' />
                  </button>
                </div>
              </div>
            </div>
            <div className="ProductsDetails__aditiona ProductsDetails__block cont">
              <div className="ProductsDetails__aditiona-info">
                <div className="ProductsDetails__aditiona-item">
                  <p>51.3 м²</p>
                  <p>Площадь</p>
                </div>
                <div className="ProductsDetails__aditiona-item">
                  <p>22.3 м²</p>
                  <p>Жилая</p>
                </div>
                <div className="ProductsDetails__aditiona-item">
                  <p>15.8 м²</p>
                  <p>Кухня</p>
                </div>
                <div className="ProductsDetails__aditiona-item">
                  <p>3 из 5</p>
                  <p>Этаж</p>
                </div>
              </div>
              <div className="ProductsDetails__info-g">
                <div className="ProductsDetails__aditiona-item">
                  <p>Обновлено {currentDate.day}.{currentDate.month}.{currentDate.year}</p>
                </div>
                <div className="ProductsDetails__aditiona-item">
                  <p> Просмотров: {product.viewsCount}</p>
                </div>
              </div>
            </div>
            <div className="ProductsDetails__description ProductsDetails__block">
              <div className="ProductsDetails__descrip-title">
                <p className="title">Описание</p>
              </div>
              <div className="ProductsDetails__descrip-text cont">
                <p>{product.description}</p>
              </div>
            </div>
            <div className="HomePage__section-new-offers ProductsDetails__block mb">
              <p className='title'>Новое на сайте</p>
              <Slider />
            </div>
            <div className="ProductsDetails__comment ProductsDetails__block">
              {!auth.user ? (
                <>
                  <div className="ProductsDetails__comment-validation">
                    <p>Для размещения комментариев на сайте, вам нужно авторизироваться!</p>
                  </div>
                </>
              ) : (
                <form onSubmit={(e) => addCommentHandler(e)} className="comment__add">
                  <div className="ProductsDetails__comment-add">
                    <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Комментарий" className="ProductsDetails__comment-add" />
                  </div>
                  <div className="ProductsDetails__comment-btn">
                    <button className="ProductsDetails__comment-add-btn btn btn-Noactive">Добавить</button>
                  </div>
                </form>
              )}
              <div className="comment__title title ProductsDetails__descrip-title">Комментарии</div>
              <div className="comment__list">
                <div className="ProductsDetails__comment-content">
                  {comments.length
                    ? comments.map(com => {
                      const date = new Date(com.createdAt)
                      const currentDate = {
                        day: date.getDate(),
                        month: date.getMonth() + 1,
                        year: date.getFullYear()
                      }
                      return <div className="ProductsDetails__comment-item  cont mg-page" key={com.id}>
                        <div className="ProductsDetails__comment-item-author">
                          <div className="ProductsDetails__user-photo ProductsDetails__comment-author-img">
                            <img
                              src={`http://localhost:4040/api/auth/user-photo/${com.userId._id}`}
                              alt=""
                              height={"200px"}
                              className="ProductsDetails__user-photo ProductsDetails__comment-author-img img"
                            />
                          </div>
                          <div className="ProductsDetails__comment-author-name">
                            <p>{com.userId.name}</p>
                          </div>
                        </div>
                        <div className="ProductsDetails__comment-item-content">{com.title}</div>
                        <div className="ProductsDetails__comment-item-date">Создан: {currentDate.day}.{currentDate.month}.{currentDate.year}</div>
                      </div>
                    }
                    )
                    : <p>Еще нет комментариев</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default ProductsDetails
