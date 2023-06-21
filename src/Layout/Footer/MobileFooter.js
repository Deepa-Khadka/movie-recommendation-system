import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {BsCollectionPlay} from 'react-icons/bs'
import { FiUserCheck} from 'react-icons/fi';
import Menudrawer from '../../Component/Drawer/Menudrawer';
import { SidebarContext } from '../../Context/DrawerContext';

function MobileFooter() {
    const {mobileDrawer, toggleDrawer} = useContext(SidebarContext)
    const active ="bg-white text-main"
    const inActive = "transition text-2xl flex-col hover:bg-white hover:text-main text-white rounded-md px-4 py-3"
    const Hover = ({isActive})=>
isActive ? `${active} ${inActive}`: inActive

    
  return (
    <>
    <div className='flex flex-col  h-full justify-between align-middle  bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full'>
      <Menudrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer}/>

    </div>
    <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
        <div className='bg-dry rounded-md flex-btn w-full p-1'>
            <NavLink to="/movies" className={Hover}>
                <BsCollectionPlay />
            </NavLink>
            <NavLink to="/login" className={Hover}>
                <FiUserCheck/>
            </NavLink>

        </div>
    </footer>
    </>
  )
}

export default MobileFooter
