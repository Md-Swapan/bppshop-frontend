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
  // const [agentInfo, setAgentInfo] = useState();

  useEffect(() => {
    dispatch(AgentLogin(agentToken))

    axios.get( `${baseUrl}/auth/agentlogin/?token=` + agentToken)
    .then((res) => {
      // setAgentInfo(res.data.data)
      // dispatch(AgentLogin(res.data.data))

      console.log(res)
      // navigate('/')
    });
  }, [agentToken]);

  return <div>
  </div>;
};

export default AgentLand;
