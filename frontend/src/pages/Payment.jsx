import React from 'react'
import axios from './../../node_modules/axios/lib/axios';

const Payment = () => {
    let data = {
        name: "John Doe",
        amount: 100,
        number: "9876543211",
        MID: "MID"+Date.now(),
        transactonId: "TXN"+Date.now(),
    }
    const handleclick = async() => {
        try {
            await axios.post("http://localhost:3000/payment", data).then((res)=>{
                console.log(res)
                if(res.data.success === true) {
                    window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
                }
            }).catch((err)=>{
                console.log(err.message)
            })
        } catch(err) {
            console.log(err);
            
        }
    }
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen bg-gray-100">
        <h1 className="text-5xl font-bold">Payment Page</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleclick}>
            Pay now
        </button>
    </div>
  )
}

export default Payment
