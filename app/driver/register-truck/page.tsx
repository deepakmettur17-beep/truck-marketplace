'use client'

import { useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function RegisterTruck(){

  const [vehicle,setVehicle] = useState("")
  const [type,setType] = useState("")
  const [capacity,setCapacity] = useState("")

  async function registerTruck(){

    const { data:userData } = await supabase.auth.getUser()

    const driverId = userData.user?.id

    const { error } = await supabase
      .from("trucks")
      .insert({
        driver_id: driverId,
        vehicle_number: vehicle,
        truck_type: type,
        capacity: capacity
      })

    if(error){
      alert(error.message)
    }else{
      alert("Truck registered successfully")
    }

  }

  return(

    <div style={{padding:40}}>

      <h1>Register Truck</h1>

      <input
        placeholder="Vehicle Number"
        onChange={(e)=>setVehicle(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Truck Type"
        onChange={(e)=>setType(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Capacity"
        onChange={(e)=>setCapacity(e.target.value)}
      />

      <br/><br/>

      <button onClick={registerTruck}>
        Register Truck
      </button>

    </div>

  )

}