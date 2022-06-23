import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
 export default function  Notification(){
   const data  = useSelector((state)=> state)
     console.log(data)
    return(
        <div> 
         notification
        </div>
    )
 }