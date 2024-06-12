import axios from "axios";
import { useState } from "react";
import Alloy from "alloy-frontend";

const useAlloyHooks = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [integrations, setIntegrations] = useState();

  const alloy = Alloy();

  const BACKEND_SERVER_BASE_URL = "http://localhost:3000";

  const createUser = async () => {
    try {
      setErrorMsg("");
      setLoading(true);

      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/create-user`,
        { username: `user_${Math.floor(Math.random() * 10000)}` } // Generate a random username
      );

      const { userId } = response.data;
      setUserId(userId);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getIntegrations = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/integrations?userId=${userId}`
      );
      setIntegrations(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      setErrorMsg("");
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/token?userId=${userId}`
      );
      const { token } = response.data;
      setToken(token);
    } catch (error) {
      console.log(error.response);
    }
  };

  const showModal = (integrationId) => {
    alloy.setToken(token);
    alloy.install({
      integrationId: integrationId,
      callback: () => {
        console.log();
      },
    });
  };

  return {
    createUser,
    getIntegrations,
    getToken,
    showModal,
    token,
    userId,
    integrations,
  };
};

export default useAlloyHooks;
