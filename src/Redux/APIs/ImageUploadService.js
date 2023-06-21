import axios from 'axios';
import toast from 'react-hot-toast';

const Axios = axios.create({
    baseURL:"http://localhost:8000/api",
})

const uploadImageservice = async(file,setLoading) =>{
    try {
        setLoading(true);
        const {data} = await Axios.post('/upload' , file);
        setLoading(false);
        toast.success('file Uploaded Sucessfully');
        return data;
    } catch (error) {
        setLoading(false);
        toast.error ('Something went wrong');

    }
}
export {uploadImageservice};