import React, { useEffect, useState } from 'react'
import {useLoaderData} from 'react-router-dom'

function Github() {
    const data=useLoaderData()
    // const [data,setData]=useState([])
    // useEffect(()=>{
    //    fetch('https://api.github.com/users/RUDRA-ani')
    //    .then(response=>response.json())
    //    .then(data=>{
    //     setData(data)
    //    })

    // },[])
  return (
    <div className='text-center text-3xl bg-purple-400 m-10'>
      Github followers:{data.followers}
    </div>
  )
}

export default Github
export const githubInfoLoader=async()=>{
    const response = await fetch ('https://api.github.com/users/RUDRA-ani')
    return response.json()
}
