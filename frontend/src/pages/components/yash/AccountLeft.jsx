import * as React from "react";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import { useEffect } from "react";
import { useState } from "react";
import "../../../css/home.css";
const AccountLeft = () => {
  const { auth,api } = useAuth();
  const [account, setAccount] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${api}/account/get`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        setAccount(res.data.account); 
        } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, [api, auth]);
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Your Accounts</h2>
      <div className="category_form">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
          }}
        >
          <div>
            <table>
              <thead>
                <tr>
                  <th
                    style={{
                      width: "15%",
                    }}
                    align="center"
                  >
                    No.
                  </th>
                  <th
                    style={{
                      width: "40%",
                    }}
                    align="center"
                  >
                    Bank
                  </th>
                  <th
                    style={{
                      width: "20%",
                    }}
                    align="center"
                  >
                    Balance
                  </th>
                  <th align="center">Status</th>
                </tr>
              </thead>
              <tbody>
                {account.length > 0 ? (
                    account.map((account, index) => (
                    <tr key={account._id}>
                      <td
                        style={{
                          width: "15%",
                        }}
                        align="center"
                      >
                        {index + 1}
                      </td>
                      <td
                        style={{
                          width: "40%",
                        }}
                        align="center"
                      >
                        {account.name}
                      </td>
                      <td
                        style={{
                          width: "20%",
                        }}
                        align="center"
                      >
                        {account.balance}
                      </td>
                      <td  align="center">
                       {account.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{width:"100em",borderRightStyle:"none"}} align="center">
                      {error || "No Account Found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountLeft;
