import React from "react";
import Body from "./Layout/Body.jsx";
import Animate from "../Animate.jsx";
import ItemDetailPage from "./components/ItemDetailPage.jsx"
const ItemDetail = () => {

  return (
    <>
    <Animate app={<Body obj={<ItemDetailPage/>}/>}/>

      
    </>
    
  );
};

export default ItemDetail;
