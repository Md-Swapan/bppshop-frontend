import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { loadUser } from './UserAction';

// Login
export const AgentLogin = (agentToken) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'AGENT_LOGIN_REQUEST' });
    const { data } = await axios.post(
      `${baseUrl}/auth/agentlogin/?token=`+agentToken
    );
    console.log(data)
    if (data.status === "success") {
      dispatch({ type: 'AGENT_LOGIN_SUCCESS', payload: data });
      localStorage.setItem("token", data.token);
    }else{
      dispatch({ type: 'AGENT_LOGIN_FAIL', payload: data });
    }

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    }
  } catch (error) {
    dispatch({ type: 'AGENT_LOGIN_FAIL', payload: error.response.message });
  }
};