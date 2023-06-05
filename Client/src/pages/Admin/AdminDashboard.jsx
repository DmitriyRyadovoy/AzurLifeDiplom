import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/Admin/adminMenu'
import { useAuth } from '../../context/auth'
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Admin = () => {
  const [auth, setAuth] = useAuth();

  const [patronymic, setPatronymic] = useState("");
  const [surname, setSurName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, age, surname, patronymic, photo } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setPatronymic(patronymic);
    setSurName(surname);
    setAge(age);
    setPassword(password);
    setId(id)
  }, [auth?.user]);

  console.log(auth?.user?._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:4040/api/auth/profile", {
        name,
        email,
        password,
        phone,
        patronymic,
        surname,
        age,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Профиль успешно обновлен!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так :(");
    }
  };

  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      photo && userData.append("photo", photo);
      const { data } = axios.put(
        `http://localhost:4040/api/auth/profile/photo`,
        userData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }
  return (
    <Layout>
      <div className="admin mg-page">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="dashboard__content flex">
              <div className="dashboard__title mb-product">
                <div className="container">
                  <p className="dashboard__title title">Настройки личного кабинета</p>
                </div>
              </div>
              <div className="dashboard__user-photo mb">
                <div className="container">
                  <form onSubmit={handleUpdatePhoto}>
                    <div className="dashboard__user-photo-cont">
                      <div className="newProduct__photo-content">
                        <label className="btn btn-outline-secondary col-md-12">
                          <p className="newProduct__photo-btn">{photo ? photo.name : "Выбрать фото"}</p>
                          <input
                            type="file"
                            name="photo[]"
                            accept="image/*"
                            multiple
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                        </label>
                        <div className="newProduct__photo-cont">
                          {photo ? (
                            <div className="text-center">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt="product_photo"
                                height={"200px"}
                                className="img newProduct__photo"
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              <img
                                src={`http://localhost:4040/api/auth/user-photo/${auth?.user?._id}`}
                                alt="product_photo"
                                height={"200px"}
                                className="img img-responsive"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <button type="submit" className='dashboard__save-photo-btn btn btn-Noactive'>Сохранить фото</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="dashboard__content-form">
                <div className="container">
                  <div className="newProduct__title-block">
                    <p className="newProduct__title-text">Личные данные</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="dashboard__content-form-box mb-product">
                      <input
                        type="text"
                        placeholder='Фамилия'
                        value={surname}
                        onChange={(e) => setSurName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder='Имя'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="exampleInputEmail1"
                      />
                      <input
                        type="text"
                        placeholder='Отчество'
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder='Возраст'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder='Номер телефона'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="exampleInputEmail1"
                      />
                      <input
                        type="text"
                        placeholder='Электронный адрес'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="exampleInputEmail1"
                        disabled
                      />
                    </div>
                    <div className='dashboard__form-btn-block'>
                      <button type='submit' className='dashboard__form-btn'>Сохранить</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default Admin