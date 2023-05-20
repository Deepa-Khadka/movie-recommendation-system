import axios from "axios";
const Axios = axios.create({
    baseURL:"http://localhost:8000/api",
})

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
    }
    return data;
}

export {registerService, logoutService, loginService};