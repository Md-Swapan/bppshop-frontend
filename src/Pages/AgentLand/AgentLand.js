import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { useDispatch } from 'react-redux';
import { AgentLogin } from "../../Redux/Actions/AgentAction";

const AgentLand = () => {
  const { agentToken } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AgentLogin(agentToken))

    
    axios.get( `${baseUrl}/auth/agentlogin/?token=` + agentToken)
    .then((res) => {
      console.log(res.data.data)
      dispatch(AgentLogin(res.data.data))
      navigate('/')
    });
  }, [agentToken, navigate, dispatch]);

  return <div>
  </div>;
};

export default AgentLand;
