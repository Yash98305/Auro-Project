import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useAuth } from '../../../context/auth';
import axios from 'axios';
import Button from "@mui/material/Button";

const ExportData = () => {
    const { api, auth } = useAuth();

    const [currentTransaction, setCurrentTransaction] = useState();

  
    const getcurrentTransaction = async () => {
     
          const res = await axios.get(`${api}/user/currenttransaction`, {
            headers: {
              Authorization: auth?.token,
            },
          });
          setCurrentTransaction(res.data.data);
      };
      useEffect(() => {
        getcurrentTransaction();
      }, [auth]);
      const filteredData = currentTransaction?.map(o => ({
        Title: o.title,
        Amount: o.amount,
        Expense_date: JSON.stringify(o.expense_date)?.substring(1,11),
        Income_date: JSON.stringify(o.income_date)?.substring(1,11),
        Category_name:o.categoryId.name,
        Category_type:o.categoryId.type,
        Bank_name:o.accountId.name,
        Bank_type:o.accountId.type,
        Bank_balance:o.accountId.balance,
    }));
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(blob, "exportedData.xlsx");
    };
   
  return (
    <Button
    style={{ float: "right", margin: "30px 40px", display: "flex",backgroundColor: "#d9d9d9",color:"#2e335b" }}
    variant="contained"
    color="success"
    onClick={exportToExcel}
  >Export To Excel</Button>)
}

export default ExportData