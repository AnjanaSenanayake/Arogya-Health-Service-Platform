import axios from 'axios';
import React from 'react';
export function getIp(){
    return 'https://arogyawebapp.herokuapp.com/'
  }


export function getUserInfo(){

  const token = localStorage.getItem('token');

//@anjana create backend to get user infomation to figure out the access levels and name and etc
  return null;

}

//  Return info regarding patiants
export function getPatiantInfo({name = null , nic=null, age=null}){

}

export function logout(setLoginStates){
    setLoginStates(null)
    localStorage.setItem('token', null);
}

export async  function loginRequest(nic,pw,setloginStates,setUserData,setFailedMsg){
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
              localStorage.setItem("AID",result.data?.AID)
              
                localStorage.setItem('token', result.data);
                console.log('login succeed',result.data)
                setUserData(result.data)
                setloginStates(true)
                
            }else{
              console.log(localStorage.getItem('token'));
                console.log('login Error',result.data)
                setFailedMsg(result.data);
                setloginStates(false);
            }
        })
        .catch((err) => {
          console.log(err)
          setFailedMsg('Password in correct');
          setloginStates(false);
        })
}

export async  function registerRequest(name,nic,posi,phone,access,ds,gs,pw,setResponse){
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
          setResponse(result);
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

// Template for auth request
export async function authRequest(url='',requestBody={},setState){

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const qs = require('querystring');
  await axios.post(getIp()+ url, qs.stringify(requestBody), config)
      .then((result) => {
          setState(result);

          console.log('result-->',result);

      })
      .catch((err) => {
        console.log(err,"***");
        setState(err);
        //setloginStates(false);
      })
}