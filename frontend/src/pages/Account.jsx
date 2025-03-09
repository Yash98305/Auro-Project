import React, { useEffect } from 'react'
import Body from './Layout/Body'
import AccountPage from './components/AccountPage'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const Account = () => {
  const {auth} = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token) {
      navigate('/login');
    }
  }, [navigate, auth?.token]);
  return (
    <><Body obj={<AccountPage/>}/></>

  )
}

export default Account