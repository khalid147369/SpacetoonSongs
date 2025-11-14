

const token = localStorage.getItem("accessToken");
const server = "https://spacesongsbackend.onrender.com"
const local = "http://localhost:3000"
  
async function refreshToken() {
  try {
    const response = await axios.post(
      `${server}/api/users/refresh-token`,
      {},
      {
        withCredentials: true, // permite recibir y enviar cookies
      }
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    console.log("refreshtoken: ",response.data.accessToken);
    console.log("refreshing token...");
   startRefreshCycle(); // refrescar cada 59 minutos
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { error: "Network error" };
  }
};

 function getAccessTokenExpiration(token) {
     if (!token) return 0;
     const payload = JSON.parse(atob(token.split(".")[1])); // decodifica el payload
    return payload.exp * 1000; // en ms
}


  const expireIn = ((getAccessTokenExpiration(token) - Date.now())/1000) -5 ; // refrescar 1 min antes de expirar

// startRefreshCycle(expireIn);
if(token)
  refreshToken();
function startRefreshCycle() {
//console.log("minutos: ",expireIn/60);
console.log("expiresIn: ",expireIn );
setTimeout(async() => {
  await refreshToken();
},expireIn *1000); // refresca cada 1 minutos
//console.log("count to",expireIn);
}
