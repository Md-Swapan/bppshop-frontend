import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";

const AgentLand = () => {
  const { agentToken } = useParams();
  console.log(agentToken);

  const [agentInfo, setAgentInfo] = useState();

  useEffect(() => {
    axios.post( `${baseUrl}/auth/agent-login/`,{
      token: agentToken,
    })
    .then((res) => console.log(res));
  }, [agentToken]);

  return <div>agent land</div>;
};

export default AgentLand;
