import React from "react";

import { useState } from "react";
import BudgetPageLeft from "./yash/BudgetPageLeft";
import BudgetPageRight from "./vansh/BudgetPageRight";
const BudgetPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='category_page'>
      <div className='category_page_left'>
        <BudgetPageLeft open={open} setOpen={setOpen}/>
      </div>
      <div className='category_page_right'>
        <BudgetPageRight open={open} setOpen={setOpen}/>
      </div>
      </div>
    </>
  );
};

export default BudgetPage;
