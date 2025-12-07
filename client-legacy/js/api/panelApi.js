const localUrl ="http://localhost:3000";
const renderUrl ="https://spacesongsbackend.onrender.com";
export async function addSong(cardData) {
    const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${renderUrl}/api/songs`,
      
        cardData
      ,
        {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        }
    );
    console.log("from addSong",response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : { error: "Network error" };
  }
}