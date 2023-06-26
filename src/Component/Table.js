import React from "react";
import {  FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-2 ";

//rows
const Rows = (movie, i, admin, onDeleteHandler) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={movie?.titleImage ? movie?.titleImage : "/images/user.png"}
            alt={movie.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.time}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link
             to={`/edit/${movie?._id}`} className="border border-border bg-dry flex-rows gap-2 text-white rounded py-1 px-2 ">
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandler(movie?._id)}
              className="bg-subMain text-white rounded flex items-center justify-center w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
           
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-subMain text-white rounded flex items-center justify-center w-6 h-6"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

//table
function Table({ data, admin, onDeleteHandler }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border-border divide-y divide-border ">
        <thead>
          <tr className="bg-dryGray ">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, admin, onDeleteHandler))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
