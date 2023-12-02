import { useContext,React } from "react";
import { dataContext } from "../Context/DataContext";


const TotalItems = () => {
    const { cart } = useContext(dataContext);
    const itemQuantity = cart.reduce((acc,el)=> acc + el.quanty,0);
  return (
    <span className='cart-items-total'>{itemQuantity}</span>
  )
}

export default TotalItems
