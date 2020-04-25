import axios from 'axios';
import React from 'react';
export function getIp(){
    return 'http://localhost:7800/'
  }
export function logout(setLoginStates){
    setLoginStates(null)
    localStorage.setItem('token', null);
}

export async  function loginRequest(nic,pw,setloginStates,setUserData){
    console.log(nic+' '+pw)
    const qs = require('querystring');
    const url = getIp()+'adminLogin';
    const requestBody = {
        nic: nic,
        password:pw
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      
      axios.post(url, qs.stringify(requestBody), config)
        .then((result) => {
          // Do somthing
            console.log(result)
            if(result.data.PasswordHash != null){
                localStorage.setItem('token', result.data);
                console.log(result.data)
                setUserData(result.data)
                setloginStates(true)
            }else{
                setloginStates(false);
            }
        })
        .catch((err) => {
          console.log(err)
          setloginStates(false);
        })
}

export async  function registerRequest(name,nic,posi,phone,access,ds,gs,pw){
  console.log(nic+' '+pw)
  const qs = require('querystring');
  const url = getIp()+'adminRegister';
  const requestBody = {
      name: name,
      nic:nic,
      position:posi,
      primaryContact:phone,
      DSID:ds,
      GNID:gs,
      ALID:access,
      password:pw
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    
    axios.post(url, qs.stringify(requestBody), config)
      .then((result) => {
        // Do somthing
          console.log(result)
          // if(result.data.PasswordHash != null){
          //     localStorage.setItem('token', result.data);
          //     console.log(result.data)
          //     setUserData(result.data)
          //     setloginStates(true)
          // }else{
          //     setloginStates(false);
          // }
      })
      .catch((err) => {
        console.log(err)
        //setloginStates(false);
      })
}


