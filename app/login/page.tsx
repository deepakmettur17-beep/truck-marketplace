'use client'

import { useState } from "react"
import { supabase } from "../../src/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage(){

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("driver")

  async function signUp(){

    const { data,error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if(error){
      alert(error.message)
      return
    }

    await supabase.from("profiles").insert({
      id: data.user?.id,
      email: email,
      role: role
    })

    alert("Signup successful")
  }

  async function signIn(){

    const { data,error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if(error){
      alert(error.message)
      return
    }

    const { data:profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id",data.user.id)
      .single()

      if(profile && profile.role === "driver"){
        router.push("/driver")
      }

    if(profile.role === "shipper"){
      router.push("/shipper")
    }

  }

  return(

    <div style={{padding:40}}>

      <h1>Truck Marketplace Login</h1>

      <input
        placeholder="Email"
        style={{border:"1px solid white",padding:"8px"}}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        style={{border:"1px solid white",padding:"8px"}}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <select onChange={(e)=>setRole(e.target.value)}>
        <option value="driver">Driver</option>
        <option value="shipper">Shipper</option>
      </select>

      <br/><br/>

      <button onClick={signIn}>Login</button>

      <button onClick={signUp}>Sign Up</button>

    </div>
  )

}