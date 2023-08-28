import React, { useEffect, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';

const lowercaselist = 'abcdefghijklmnopqrstuvwxyz'
const uppercaselist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numberslist = '0123456789'
const symbolslist = "!@#$%^&*()?"

const Data = () => {
    const [password, setPassword] = useState("");
    const [lowercase, setLowercase] = useState(true)
    const [uppercase, setUppercase] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [symbols, setSymbols] = useState(true)
    const [passwordlength, setPasswordlength]= useState(8);
    const [ select, setSelect]= useState("lowercase", "uppercase", "numbers", "symbols")

    useEffect(()=>{
        generatepassword()
    },[passwordlength])

    const handlecheck = (type)=>{
        let tempchoice = select;
        if(tempchoice.includes(type)){
            const index = tempchoice.indexOf(type)
            tempchoice.slice(index,1)
        }
        else{
            tempchoice.push(type)
        }
        setSelect(tempchoice)
    }

    const generatepassword=()=>{

        let characterlist = '';
        if(lowercase){
            characterlist +=lowercaselist;
        }
        if(uppercase){
            characterlist +=uppercaselist;
        }
        if(numbers){
            characterlist +=numberslist;
        }
        if(symbols){
            characterlist +=symbolslist;
        }
        
        let temppassword = "";
        const characterlistlength = characterlist.length;

        for(let i=0; i<passwordlength; i++){
            const characterindex = Math.round(Math.random()* characterlistlength)
            temppassword +=characterlist.charAt(characterindex)
        }
        setPassword(temppassword)
    }

    const copypassword =async()=>{
        const copiedtext = await navigator.clipboard.readText()
        if(password.length){
            navigator.clipboard.writeText(password);
            toast.success("Password copied to clipboard", {
                position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
            }) 
        }
    }
  return (
    <>
      <div className="icon d-flex  justify-content-center">
    <input type="text" value={password}  disabled placeholder='click on generate button' />
    <div className="icon-box  bg-warning">
    <FaCopy className=' fs-5  text-white' onClick={copypassword} />
    </div>
    </div>
    <h6 className="card-title fs-5 mt-3 text-start ms-4">Customize Your Password</h6>
    <div className="box d-flex flex-wrap justify-content-around">
    <p className="card-text"><input type="checkbox" className='me-2' disabled={select.length===1 && select.includes(lowercase)} checked={lowercase} onChange={()=>{setLowercase(!lowercase); handlecheck('lowercase')}}/>Includes lower case(a-z)</p>
    
    <p className="card-text"><input type="checkbox" className='me-2' disabled={select.length===1 && select.includes(numbers)} checked={numbers} onChange={()=>{setNumbers(!numbers);  handlecheck('numbers')}}/>Includes numbers(0-9) </p>

    <p className="card-text"><input type="checkbox" className='me-2' disabled={select.length===1 && select.includes(uppercase)} checked={uppercase} onChange={()=>{setUppercase(!uppercase);  handlecheck('uppercase')}}/>Includes upper case(A-Z)</p>

    <p className="card-text"><input type="checkbox" className='me-2' disabled={select.length===1 && select.includes(symbols)} checked={symbols} onChange={()=>{setSymbols(!symbols);  handlecheck('symbols')}}/>Includes symbols(&-#)</p>
    </div> 
    
    <div className="box2 mt-2">
      <p className='fs-5 fw-semibold text-start ms-4'>Password Length</p>
<div className="collect d-flex">
<p className="boxe border  me-2 bg-white text-black rounded fs-6 fw-semibold">{passwordlength}</p>
      <input type="range" min={8} max={20} defaultValue={passwordlength} onChange={(event)=>setPasswordlength(event.target.value)} />
</div>
    </div> 
    <a href="#" className="btn btn-primary mt-4" onClick={generatepassword}>Generate Password</a> 
    <ToastContainer />
    </>
  )
}

export default Data
