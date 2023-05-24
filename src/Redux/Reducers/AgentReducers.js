export const AgentReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_REQUEST":
    case "AGENT_LOGIN_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "ADMIN_LOGIN_SUCCESS":
    case "AGENT_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "ADMIN_LOGIN_FAIL":
    case "AGENT_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};



export const AgentInfoReducer = (state = { agentInfo: {} }, action) => {
  switch (action.type) {
    case "STORE_AGENT_INFO":
      return {
        ...state,
        agentInfo: action.payload,
      };

    default:
      return state;
  }
};
