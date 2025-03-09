import React, { useEffect } from 'react'
import Body from './Layout/Body'
import CategoryPage from './components/CategoryPage'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
const Category = () => {
  const { auth } =  useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token) {
      navigate('/login');
    }
  }, [navigate, auth?.token]);
  return (
    <><Body obj={<CategoryPage/>}/></>

  )
}

export default Category