import axios from 'axios'

export function getIp(){
    return 'localhost:7800'
  }

export async  function loginRequest(nic,pw,setloginStates){
    console.log(nic+pw)
   

    const response =
      await axios.get("https://dog.ceo/api/breeds/list/all",
          { params: {name: 'bruno'}}
      );
    console.log(response)
    setloginStates(response.data)
    return response.data;
}