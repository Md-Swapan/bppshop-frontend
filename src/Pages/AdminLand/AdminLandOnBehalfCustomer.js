import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../BaseUrl/BaseUrl';
import { AdminLogin, AdminInfo } from "../../Redux/Actions/AdminAction";

const AdminLandOnBehalfCustomer = () => {
  const { adminToken } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(AdminLogin(adminToken))

    axios.get( `${baseUrl}/auth/admin-login/?token=` + adminToken)
    .then((res) => {
      dispatch(AdminInfo(res))
      navigate('/')
    });
  }, [adminToken, navigate, dispatch]);


  return (
    <div>
    </div>
  );
};

export default AdminLandOnBehalfCustomer;