export async function getSongs() {
  try {
    const data = await axios.get(
      "https://spacesongsbackend.onrender.com/api/songs"
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(
      "https://spacesongsbackend.onrender.com/api/users/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true, // permite recibir y enviar cookies
      }
    );
     localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { error: "Network error" };
  }
}
export async function loginUser(email, password) {

  try {
    const response = await axios.post(
      "https://spacesongsbackend.onrender.com/api/users/login",
      {
        email,
        password,
      },
      {
        withCredentials: true, // permite recibir y enviar cookies
      }
    );
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { error: "Network error" };
  }
}
export async function logoutUser(token) {
  try {
    const response = await axios.post(
      "https://spacesongsbackend.onrender.com/api/users/logout",
      {},
      {
         headers: { 
                'Authorization': `Bearer ${token}` 
            },
        withCredentials: true, // permite recibir y enviar cookies
      }
    );
    console.log("test");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { error: "Network error" }; 
  }
}
