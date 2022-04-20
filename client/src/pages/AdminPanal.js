import React,{ useEffect } from 'react'
import AdminPermision from '../components/AdminPermision';
import AdminPosition from '../components/AdminPosition';

const AdminPanal = () => {
  useEffect(() => {
    const user=localStorage.getItem("Admin");
    if( !user ){
      window.location.href = "/admin";
    }
  },[]);
  return (
    <div>
        <AdminPosition />
        <AdminPermision />
    </div>
  )
}

export default AdminPanal;