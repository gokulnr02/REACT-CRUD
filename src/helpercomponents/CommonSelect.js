
export default async function CommonSelectAPI({url,payLoad}){
    console.log(url,payLoad)
    const options ={
        method:"POST",
        headers:{
            "Accept":"Application/json",
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({data:payLoad})
       }
       const response= await fetch(url,options).then(async res=> {return res.json()})
       return await response
}