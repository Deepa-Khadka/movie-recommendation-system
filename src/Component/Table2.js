import React from 'react'
import {  FaEdit } from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import { DateFormat, shortUppercaseId } from './Notification/Empty';


const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-2 ";

//rows
const Rows = ({data, users,onDeleteFunction}) =>{

  return(
    <tr >
        {/*users*/}
        {
            users ? (
                <>
                       
      <td className={`${Text}`}>
        <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
        <img 
        className='h-full w-full object-cover'
        src={`${data?.image ? data.image : "/images/user.png"}`}
        alt={data?.fullName}/>
        </div>
      </td>
      <td className={`${Text} `}>{data?._id ?shortUppercaseId (data._id) : "2R75T8"}</td>
      <td className={`${Text}`}>
        {DateFormat(data?.createdAt)}</td>
      <td className={`${Text}`}>{data?.fullName}</td>
      <td className={`${Text}`}>{data?.email}</td>
      <td className={`${Text}`}>{data?.isAdmin? "Admin":"User"}</td>

      <td className={`${Text} float-right flex-rows gap-2`}>
        {
          !data.isAdmin && (
            <button
             onClick={() => onDeleteFunction(data?._id)}
            className='bg-subMain text-white rounded flex items-center justify-center w-6 h-6'>
        <MdDelete/> 
      </button>

          )
        }
  
      </td>
      </>
            ):(
                //Categories
                <>
     <td className={`${Text}  font-bold`}>{data?._id ?shortUppercaseId (data._id) : "2R75T8"}</td>
      <td className={`${Text}`}>
      {DateFormat(data?.createdAt)} </td>
      <td className={`${Text}`}>{data.title}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {/* <button className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1'>
            Edit <FaEdit className='text-green-500'/>

        </button> */}
        <button  onClick={() => onDeleteFunction(data?._id)}
        className='bg-subMain text-white rounded flex items-center justify-center w-6 h-6'>
  <MdDelete/> 
</button>
      </td>
</>
            )
}
</tr>
  );
};
                
  //table
function Table2({data,users,onDeleteFunction}) {
 
  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
        <table className='w-full table-auto border-border divide-y divide-border '>
            <thead>
                <tr className='bg-dryGray'>
                    {
                        users ? (
                            <>
                                <th scope='col' className={`${Head}`}>
                        Image
                    </th>
                    <th scope='col' className={`${Head}`}>
                      Id
                    </th>
                    <th scope='col' className={`${Head}`}>
                     Date
                    </th>
                    <th scope='col' className={`${Head}`}>
                  Full Name
                    </th>
                    <th scope='col' className={`${Head}`}>
                      Email
                    </th>
                    <th scope='col' className={`${Head}`}>
                      Role
                    </th>
                            </>
                            
                        )
                        :(
                            <>
               
                    <th scope='col' className={`${Head}`}>
                      Id
                    </th>
                    
                    <th scope='col' className={`${Head}`}>
                   date
                    </th>
                     <th scope='col' className={`${Head}`}>
                      Category
                    </th>
                    
                            
                            </>
                        )
                    }
                
                    <th scope='col' className={`${Head} text-end`}>
                    Action
                    </th>
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
              {data.map((data, i) => (
<Rows key={i}
 data={data} 
 users={users} 
 onDeleteFunction={onDeleteFunction}/>
              ))}
            </tbody>
        </table>
      
    </div>
  )

}

export default Table2;
