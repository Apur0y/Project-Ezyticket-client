import axios from "axios";

export const saveUserInformation = async (user) => {
  axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    email: user?.email,
    status: "",
    phone: "",
    address: "",
    role: "user",
  });
};
