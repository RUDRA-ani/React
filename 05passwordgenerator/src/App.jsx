import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(4)
  const [charAllow,setcharAllow] =  useState(false)
  const [numberAllow,setnumberAllow] = useState(false)
  const[password,setPassword] = useState("")
  const passwordref=useRef(null)
  const passwordGenerator = useCallback(()=>{
  let pass=""
  let str=
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllow) str+="0123456789"
  if(charAllow) str+="!@#$%^&*-_+=[]{}~`"
  for (let i = 1; i <=length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
  
  }
  setPassword(pass)

   
  },[length,charAllow,numberAllow,setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[length,charAllow,numberAllow])

  return (
    <>
    <div className=" h-30 w-150 mx-auto shadow-md rounded-lg px-4 mt-0 bg-gray-800">
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className="flex shadow rounded-lg gap-8 mb-4">
        <input 
        type="text"
        value={password}
        className='bg-white text-black w-full rounded-lg py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordref}
        />
        <button 
        onClick={()=>{
          // alert("copied");
          passwordref.current?.select();
          window.navigator.clipboard.writeText(password)
          
        }}
        className="w-20 rounded-lg bg-blue-900">Copy</button>
      </div>
      <div className='flex gap-x-4 items-center '>
        <div>
          <input 
          type="range"
          min={4}
          max={100}
          onChange={(e)=>{setLength(e.target.value)}}
          value={length}/>
          <label> Length:{length}</label>
        </div>
        <div>
          <input 
          type="checkbox"
          defaultChecked={numberAllow}
          id='numberInput'
          onChange={()=>{
            setnumberAllow((prev)=>!prev)
          }}/>
          <label className='m-2'>Include Numbers</label>
        </div>
        <div>
          <input 
          type="checkbox"
          defaultChecked={charAllow}
          id='charinput'
          onChange={()=>{
            setcharAllow((prev)=>!prev)
          }}
          />
          <label>Allow Character</label>
        </div>
      </div>
    </div> 
     </>
  )
}

export default App
