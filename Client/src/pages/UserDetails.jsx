import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import axios from "axios";

const UserDetails = () => {
  const [user, setUser] = useState({});
  const params = useParams();

  // Get User
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4040/api/auth/single-user/${params.id}`
      );
      setUser(data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  // Initialp details
  useEffect(() => {
    if (params?.id) {
      getUser();
    }
  }, [params?.id]);
  return (
    <div>{user.name}</div>
  )
}

export default UserDetails