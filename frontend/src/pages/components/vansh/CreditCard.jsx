import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { colors } from '@mui/material';
import { color } from 'framer-motion';
import React from 'react'
import Card from 'react-credit-card-payment'

const CreditCard = ({balance,name}) => {
  return (
    <>
    <Card 
      bankName=<div style={{color:"white",display:"flex",alignItems:"center",justifyItems:"center",float:"right"}}><CurrencyRupeeIcon style={{fill:"white"}}/> {balance}</div> 
      cardHolder={name}
      cardNumber='1234567898765432'
      issuer='mastercard'
      theme='dark'
    />
    </>
  )
}

export default CreditCard