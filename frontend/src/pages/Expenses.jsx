import React, { useEffect } from 'react'
import Body from './Layout/Body'
import ExpensesPage from './components/ExpensesPage'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
const Expenses = () => {
  const {auth} = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.token) {
      navigate('/login');
    }
  }, [navigate, auth?.token]);
  return (
    <><Body obj={<ExpensesPage/>}/></>

  )
}

export default Expenses