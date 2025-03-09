import React from 'react'
import ExpensePageLeft from './yash/ExpensePageLeft';
import ExpensePageRight from './vansh/ExpensePageRight';

const ExpensesPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
  <>
     <div className='category_page'>
      <div className='category_page_left'>
        <ExpensePageLeft open={open} setOpen={setOpen} />
      </div>
      <div className='category_page_right'>
        <ExpensePageRight open={open} setOpen={setOpen}/>
      </div>
      </div>
  </>
  )
}

export default ExpensesPage