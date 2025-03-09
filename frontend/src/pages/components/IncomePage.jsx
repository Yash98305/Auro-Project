import React from "react";
import IncomePageLeft from "./yash/IncomePageLeft";
import IncomePageRight from "./vansh/IncomePageRight";
import { useState } from "react";
const IncomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='category_page'>
      <div className='category_page_left'>
        <IncomePageLeft open={open} setOpen={setOpen}/>
      </div>
      <div className='category_page_right'>
        <IncomePageRight open={open} setOpen={setOpen}/>
      </div>
      </div>
    </>
  );
};

export default IncomePage;
