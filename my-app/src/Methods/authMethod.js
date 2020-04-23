import axios from 'axios';
import React from 'react';
export function getIp(){
    return 'localhost:7800'
  }




// export  function logOut(){
//     setUserData(null);
// }

export async  function loginRequest(nic,pw,setloginStates,setUserData){
    console.log(nic+pw)
   
    //apply login method here
    const response =
      await axios.get("https://dog.ceo/api/breeds/list/all",
          { params: {name: 'bruno'}}
      );
    console.log(response)
    //set this state true if login is succeed
    if(nic=='123456'){
        setloginStates(true)
    }else{
        setloginStates(false)
    }
   //set user datanhere
    setUserData(response.data)
    return response.data;

}

export async  function registerRequest(infomation ,setloginStates){
    // console.log(nic+pw)
   
    //apply register method here
    const response =
      await axios.get("https://dog.ceo/api/breeds/list/all",
          { params: {name: 'bruno'}}
      );
    console.log(response)
    setloginStates(response.data)

    return response.data;
}


