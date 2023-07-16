import axios from "axios";
const Axios = axios.create({
    baseURL:"http://localhost:8000/api",
})

//**********PUBLIC APIs */

//register  new user Api call 

const registerService = async(user) => {
    const {data} = await Axios.post("/user", user);
if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
}
return data;
    
};


//logout user Function 

const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null
}

//login user API call
const loginService =async (user) => {
    const {data} = await Axios.post("/user/login", user);
    if (data) {
        localStorage.setItem("userInfo",JSON.stringify(data));
        sessionStorage.setItem("user",JSON.stringify(data))
    }
    return data;
}
//***********PRIVATE APIS */

//update profile Api call

const updateProfileService = async (user,token) => {

    const {data} = await Axios.put("/user", user,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (data) {
        localStorage.setItem("userInfo",JSON.stringify(data));

    }
    return data;
};


//delete profile Api call
const deleteProfileService = async (token) => {
    const {data} = await Axios.delete("/user", {
        headers: {
            Authorization:`Bearer ${token}`,
        },
    });
    if (data) {
        localStorage.removeItem("userInfo");
    }
    return data;

};
//change password
const changePasswordService = async (passwords,token) => {
    const {data} = await Axios.put("/user/password", passwords, {
        headers: {
            Authorization:`Bearer ${token}`,
        },
    });
    return data;
}

// get all favorite movie
const getFavoriteMoviesService = async (token) => {
    const {data} = await Axios.get("/user/favorites",{
      headers:{
        Authorization:`Bearer ${token}`
      },  
    });
    return data;
};

//delete all favorite movies 
const deleteFavoriteMoviesService = async (token) => {
    const {data} = await Axios.delete("/user/favorites", {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    return data;
};
//like movie Api call
const likeMovieService = async (movieId, token) => {
    const {data} = await Axios.post(`/user/favorites/`, movieId,{
        headers:{
            Authorization:`Bearer ${token}`,

        }

    });
    return data;

}
//********ADMIN APIS* */

//admin get all user
const getAllUserService  = async (token) => {
    const {data} = await Axios.get("/user" ,{
        headers: {
            Authorization:`Bearer ${token}`,
        },
    });
return data;
};

//admin delete user
const deleteUserService = async(id, token) => {
    const {data} = await Axios.delete(`/user/${id}`,{
        headers: {
            Authorization:`Bearer ${token}`,
        },
    });
    return data;
};

export {registerService, 
    logoutService, 
    loginService, 
    updateProfileService,
    deleteProfileService,
    changePasswordService,
    getFavoriteMoviesService,
    deleteFavoriteMoviesService,
    getAllUserService,
    deleteUserService,
    likeMovieService,
 };



