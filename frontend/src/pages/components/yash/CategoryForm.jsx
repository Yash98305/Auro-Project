import * as React from "react";
import "../../../css/home.css";
import axios from "axios";
import {useAuth} from "../../../context/auth"
import { useEffect } from "react";
import {Button} from "@mui/material"
import { toast } from "react-toastify";

const CategoryForm = ({error,categories}) => {
  const {api,auth} = useAuth();
const [refresh,setRefresh] = React.useState(false)
const EditCategory = async(id) => {
try {
  const res = await axios.put(`${api}/update/delete/${id}`, {
                    headers: {
                        Authorization: auth?.token,
                    }})
                    if (res){
                      toast.success("Category Updated successfully")
                      setRefresh(!refresh)
                    }
} catch (error) {
  console.log(error);
}

}
useEffect(()=>{

},[auth,api,refresh])
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Your Category</h2>
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
                      width: "60%",
                    }}
                    align="center"
                  >
                    Category
                  </th>
                  <th align="center">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <tr key={category._id}>
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
                          width: "60%",
                        }}
                        align="center"
                      >
                        {category.name}
                      </td>
                      <td style={{}} align="center">
                       
Edit/
                        
Delete
                     
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{width:"100em",borderRightStyle:"none"}} align="center">
                      {error || "No Categories Found"}
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
export default CategoryForm;
