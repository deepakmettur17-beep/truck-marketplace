'use client'

import { useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function PostLoad(){

  const [pickup,setPickup] = useState("")
  const [drop,setDrop] = useState("")
  const [weight,setWeight] = useState("")
  const [price,setPrice] = useState("")

  async function postLoad(){

    const { data,error } = await supabase
      .from("loads")
      .insert({
        pickup_city: pickup,
        drop_city: drop,
        weight: weight,
        budget_price: price,
        status: "open"
      })

    if(error){
      alert(error.message)
    }else{
      alert("Load posted")
    }

  }

  return(

    <div style={{padding:40}}>

      <h1>Post Load</h1>

      <input placeholder="Pickup city"
        onChange={(e)=>setPickup(e.target.value)}
      />

      <br/><br/>

      <input placeholder="Drop city"
        onChange={(e)=>setDrop(e.target.value)}
      />

      <br/><br/>

      <input placeholder="Weight"
        onChange={(e)=>setWeight(e.target.value)}
      />

      <br/><br/>

      <input placeholder="Price"
        onChange={(e)=>setPrice(e.target.value)}
      />

      <br/><br/>

      <button onClick={postLoad}>Post Load</button>

    </div>

  )
}