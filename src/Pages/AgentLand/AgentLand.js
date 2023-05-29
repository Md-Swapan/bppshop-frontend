import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { useDispatch } from 'react-redux';
import { AgentInfo, AgentLogin } from "../../Redux/Actions/AgentAction";

const AgentLand = () => {
  const { agentToken } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(agentToken)


  useEffect(() => {
    dispatch(AgentLogin(agentToken))

    axios.get( `${baseUrl}/auth/agentlogin/?token=` + agentToken)
    .then((res) => {
      dispatch(AgentInfo(res))
      
      navigate('/')
    });
  }, [agentToken, navigate, dispatch]);

  return <div>
  </div>;
};

export default AgentLand;
