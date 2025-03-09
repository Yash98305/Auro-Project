import React, { useEffect } from 'react'
import Body from './Layout/Body'
import IncomePage from './components/IncomePage'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const Income = () => {
  const {auth} = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token) {
      navigate('/login');
    }
  }, [navigate, auth?.token]);
  return (
      <><Body obj={<IncomePage/>}/></>
  )
}

export default Income