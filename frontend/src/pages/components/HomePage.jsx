import React, { useEffect } from "react";
import CreditCard from "./vansh/CreditCard";
import Record from "./Devendra/Record";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useState } from "react";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import img from "../../css/income.png";
import img2 from "../../css/expenses.png";
import { PieChart } from "@mui/x-charts/PieChart";
import increaseicon from "../../icons/increase.png";
import decreaseicon from "../../icons/decrease.png";
import { color, motion } from "framer-motion";

const HomePage = () => {
  const { api, auth,setData,filtered} = useAuth();
  const [income, setIncome] = useState();
  const [expense, setExpense] = useState();
  const [balance, setBalance] = useState();
  const [currentTransaction, setCurrentTransaction] = useState();
  const getIncome = async () => {
    try {
      const res = await axios.get(`${api}/income/gettotalincome`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setIncome(res.data.totalIncome);
    } catch (e) {
      console.log(e);
    }
  };
  const getAccountData = async () => {
    try {
      const res = await axios.get(`${api}/account/get`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      const getTotalBalance = () => {
        return res.data.account.reduce(
          (acc, account) => acc + Number(account.balance),
          0
        );
      };
      setBalance(getTotalBalance());
      // setData(res.data.account);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };
  const getcurrentTransaction = async () => {
    try {
      const res = await axios.get(`${api}/user/currenttransaction`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setCurrentTransaction(res.data.data);
      setData(res.data.data)
    } catch (e) {
      console.log(e);
    }
  };

  const getExpense = async () => {
    try {
      const res = await axios.get(`${api}/expense/gettotalexpense`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setExpense(res.data.totalExpense);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getExpense();
    getIncome();
    getAccountData();
    getcurrentTransaction();
  }, [auth,api]);
  useEffect(()=>{
    setCurrentTransaction(filtered)
  },[filtered])
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div className="leftCont" style={{ width: "60%", padding: "5px" }}>
        <div
          className="upper-leftCont"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0px",
              
            }}
          >
            <CreditCard style={{color:"#fff"}} balance={balance} name={auth?.user?.name}  />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "10px 0px",
            }}
          >
            <Record
              amount={income}
              icon={
                <img
                  style={{ height: "30px", margin: "6px", marginLeft: "10px" }}
                  src={img} alt=""
                />
              }
              name={"Income"}
              style={{ marginRight: "6" }}
            />
            <Record
              amount={expense}
              icon={
                <img
                  style={{ height: "30px", margin: "6px", marginLeft: "10px" }}
                  src={img2} alt=""
                />
              }
              name={"Expense"}
            />
          </div>
        </div>

        <h3 style={{ margin: "5px 0px 10px 5px" }}>Recent Transaction</h3>
        <div
          className="down-leftCont"
          style={{
            padding: "0px 10px",
            height: "50vh",
          }}
        >
          <table>
            <tbody
              style={{
                height: "47vh",
                width: "750px",
              }}
            >
              {currentTransaction?.length > 0 ? (
                currentTransaction?.map((income, index) => (
                  <tr key={income._id} style={{}}>
                    <td
                      style={{
                        width: "10%",
                      }}
                      align="center"
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        width: "50%",
                        paddingLeft: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div className="incomename">
                          <div>{income.title}</div>
                          <div>{income.accountId?.name}</div>
                        </div>
                        <div>
                          {income.income_date ? (
                            <motion.img
                              initial={{ y: 20, opacity: 0.01 }}
                              animate={{ y: -1, opacity: 1 }}
                              transition={{ ease: "backOut", duration: 2 }}
                              end={{ y: 20, opacity: 0.01 }}
                              style={{ width: "40px", height: "40px" }}
                              src={increaseicon}
                              alt="icon"
                            />
                          ) : (
                            <motion.img
                              initial={{ y: -20, opacity: 0.01 }}
                              animate={{ y: 1, opacity: 1 }}
                              transition={{ ease: "easeOut", duration: 2 }}
                              style={{ width: "40px", height: "40px" }}
                              src={decreaseicon}
                              alt="icon"
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        width: "20%",
                      }}
                      align="center"
                    >
                      {JSON.stringify(income.income_date)?.substring(1, 11) ||
                        JSON.stringify(income.expense_date)?.substring(1, 11)}
                    </td>
                    <td align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CurrencyRupeeRoundedIcon sx={{ fontSize: 17 }} />{" "}
                        {income.amount}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} align="center">
                    {"No categories found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ width: "40%", padding: "28px 10px 28px 50px"}}>
      <div style={{ width: "100%", height: "100%",backgroundColor:"#EEEDEB",borderRadius:"5%"}}>
        <PieChart 
          series={[
            {
              data: [
                {id:0,
                  value: Math.floor((Number(expense) / Number(income)) * 100),
                  label: "Expense",
                },
                {id:1,
                  value:
                    100 - Math.floor((Number(expense) / Number(income)) * 100),
                  label: "Saving",
                },
              ],
              highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              innerRadius: 70,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 0,
              endAngle: 360,
              cx: 150,
              cy: 150,
              
            },
          ]}

        />
      </div>
      </div>
    </div>
  );
};

export default HomePage;
