/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState,useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  CalendarIcon,
  MenuIcon,
  ShieldCheckIcon,
  SupportIcon, 
  XIcon,
} from '@heroicons/react/outline'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: 'https://coderceo.com',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: 'https://coderceo.com',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: 'https://coderceo.com',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: 'https://coderceo.com', icon: ShieldCheckIcon },
]

export default function Example() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [images, setImages] = useState(null);
  useEffect(()=>{
    const use = window.localStorage.getItem("username");
    const adm = window.localStorage.getItem("Admin");
    setUser(use)
    setAdmin(adm);
    let useid= null;
    const fun = async() =>{
      const url="http://localhost:5000/api/signinVoter/"+use+ "/";
      await axios.get(url).then((res) => {
        setUserInfo(res.data);
        // console.log(res.data);
        useid=res.data.id
      })
      const urls="http://localhost:5000/api/images/"+ useid + "/";
      await axios.get(urls).then((res) => {
          setImages(res.data.img)
          // console.log(res.data.img);
      })
    }
    fun()
  },[]);
  const userhead = () =>{
      if(user){
        return <>
        <a href="/apply" className="text-base font-medium text-gray-500 hover:text-gray-900">
              APPLY
            </a>
            <a href="/voting" className="text-base font-medium text-gray-500 hover:text-gray-900">
              VOTING
            </a>
            <a href="/result" className="text-base font-medium text-gray-500 hover:text-gray-900">
              RESULT
            </a>
        </>
      }else{
        return
      }
  }
  const adminhead = () =>{
    if (admin){
      return <>
      <a href="/adminpanal" className="text-base font-medium text-gray-500 hover:text-gray-900">
              ADMINPANAL
      </a>
      </>
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log("Normal Close");

  };
  const handleCloseP = () => {
    setAnchorEl(null);
    console.log("profile");
    window.location.href= "/profile"

  };
  const handleCloseL = () => {
    setAnchorEl(null);
    console.log("logout");
    window.localStorage.removeItem("username")
    setUser(null);
  }
  const avatar = () => {
    if (user) {
      return <>
      <div>
      <Avatar
        alt="Remy Sharp"
        src={images?images:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
        sx={{ width: 56, height: 56 }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseP}>Profile</MenuItem>
        <MenuItem onClick={handleCloseL}>Logout</MenuItem>
      </Menu>
    </div>
      </>;
    }else{
      return <>
      <a href="/signin" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
        Sign in
      </a>
      <a
        href="/register"
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Register
      </a>
    </>
    }
  }
  
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="https://coderceo.com">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-20"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRcErBUJW51RqwnrSLZOfwq961bysZVnPFg&usqp=CAU"
                alt="Logo"
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            

            <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
              HOME
            </a>
            <a href="/admin" className="text-base font-medium text-gray-500 hover:text-gray-900">
              ADMIN
            </a>
            {
              adminhead()
            }
            { 
                userhead()
            }
            

           
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {
              avatar()
            }
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-12 w-auto"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRcErBUJW51RqwnrSLZOfwq961bysZVnPFg&usqp=CAU"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <a href="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                HOME
              </a>
              <a href="/admin" className="text-base font-medium text-gray-500 hover:text-gray-900">
                ADMIN
              </a>
              {
                adminhead()
              }
                {
                  userhead()
                }
              </div>
              <div>
                <a
                  href="/signin"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <a href="/register" className="text-indigo-600 hover:text-indigo-500">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
