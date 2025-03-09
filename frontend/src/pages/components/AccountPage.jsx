import React from 'react'
import AccountLeft from './yash/AccountLeft'
import ExportData from './yash/ExportData'

const AccountPage = () => {

  return (<>
    <div className='category_page'>
    <div className='category_page_left'>
      <AccountLeft />
    </div>
    <div className='category_page_right'>

<ExportData/>
    </div>
    </div>
    </>
  )
}

export default AccountPage