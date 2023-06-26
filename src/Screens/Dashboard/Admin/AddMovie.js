import Sidebar from "./Sidebar";
import { Input, Message, Select } from "../../../Component/UsedInputs";
import Uploader from "../../../Component/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Component/Modals/CastsModal";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { movieValidation } from "../../../Component/Validation/MovieValidation";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../../Component/Notification/Error";
import { createMovieAction, removeCastAction } from "../../../Redux/Actions/MoviesAction";
import { Imagepreview } from "../../../Component/Imagepreview";

function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //use Selector
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );
  const { casts } = useSelector((state) => state.casts);

  //validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  //on submit
  const onSubmit = (data) => {
     dispatch(createMovieAction({
        ...data,
        image:imageWithoutTitle,
        titleImage:imageTitle,
        video:videoUrl,
        casts,
       
     }));
  
  };

  //delete cast handle
  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Cast deleted successfully");
  };

  useEffect(() => {
    //if modal is false then reset cast
    if (modalOpen === false) {
      setCast();
    }
    //if its sucesss then reset from  and navigate to addMovie
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addMovie");
    }
    //IF ERROR THEN SHOW ERROR
    if(isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);
  return (
    <Sidebar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Add Movie </h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Movie Title"
              placeholder=""
              type="text"
              name="name"
              register={register("name")}
              bg={true}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Hours"
              placeholder=""
              type="number"
              name="time"
              register={register("time")}
              bg={true}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
        <div className="w-full">
            <Input
             label="Language"
              placeholder="" 
              type="text" 
              name="language"
              register={register("language")}
              bg={true}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>

  <div className="w-full">
            <Input
            label=" Release Year"
             placeholder=""
              type="number" 
              name="year"
              register={register("year")}
              bg={true}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
          
        </div>
        {/*  images  */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* img without title */}
          <div className="flex flex-col gap-6">
            <p className="text-white font-semibold text-sm">
              Image without title
            </p>
            <Uploader setImageUrl={setImageWithoutTitle} />
          <Imagepreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>
          {/* img withtitle */}
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-sm text-white">Image with title</p>
            <Uploader setImageUrl={setImageTitle} />
           <Imagepreview image={imageTitle} name="imageTitle"/>
          </div>
        </div>
        {/*  DESCRIPTION */}
<div className="w-full">
<Message className="text-white" 
        label="Description"
         placeholder="" 
         name="desc"
         register={{...register("desc"),}}
         />
         {errors.desc && <InlineError text ={errors.desc.message}/>}
</div>
       
        {/*  CATEGORY*/}
        <div className="text-sm w-full">
          <Select label="Movie Category"
           option={categories?.length > 0  ? categories : []} 
           name="category"
           register={{...register("category")}}
           />
           {errors.category && <InlineError text={errors.category.message}/>}
        </div>
        {/*  Movie Video*/}
        <div className="flex flex-col gap-6 w-full ">
          <p className="text-white font-semibold text-sm">Movie Video</p>
          <div className={`w-full grid ${videoUrl  && "md:grid-cols-2"} gap-6`}>
            {
               videoUrl &&(
                <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                    Video Uploaded!!
                </div>
               ) 
            }
         
          <Uploader setImageUrl={setVideoUrl} />
</div>
        </div>

        {/*  CAST*/}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-1 gap-4">
            {casts?.length > 0 &&
             casts?.map((user) => (
              <div
                key={user.id}
                className="p-2 italic text-xs text-text rounded flex-col bg-main border border-border"
              >
                <img
                  src={`${user?.image ? user.image : "/images/user.png"}`}
                  alt={user.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p>{user.name}</p>
                <div className="flex-rows mt-2 w-full gap-2 ">
                  <button
                    onClick={() => deleteCastHandler(user?.id)
                     }
                    className="w-6 h-6 bg-dry border flex items-center justify-center border-border text-subMain rounded"
                  >
                    <span className="flex items-center justify-center">
                      <MdDelete />
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setCast(user);
                      setModalOpen(true);
                    }}
                    className="w-6 h-6 bg-dry border flex items-center justify-center border-border text-green-600 rounded"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
        disabled={isLoading  }
         onClick={handleSubmit(onSubmit)}
        className="bg-subMain  w-full flex-rows gap-6 font-medium transition hover:bg-dry border border-subMain text-white py-4  rounded ">
            {
                isLoading ? "Please wait" :< >
          <ImUpload />
          Publish Movie
                </>
            }

        </button>
      </div>
    </Sidebar>
  );
}
export default AddMovie;
