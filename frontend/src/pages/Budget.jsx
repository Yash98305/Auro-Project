import React from 'react'
import Body from './Layout/Body'
import BudgetPage from './components/BudgetPage'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Budget = () => {
  const {auth} = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token) {
      navigate('/login');
    }
  }, [navigate, auth?.token]);
  return (
    <><Body obj={<BudgetPage/>}/></>

  )
}

export default Budget