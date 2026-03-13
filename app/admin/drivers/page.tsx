'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function AdminDrivers(){

  const [drivers,setDrivers] = useState<any[]>([])

  async function getDrivers(){

    const { data,error } = await supabase
      .from("trucks")
      .select("*")

    if(error){
      console.log(error)
    }else{
      setDrivers(data || [])
    }

  }

  async function approveDriver(id:string){

    await supabase
      .from("trucks")
      .update({ approved:true })
      .eq("id",id)

    getDrivers()

  }

  useEffect(()=>{
    getDrivers()
  },[])

  return(

    <div style={{padding:40}}>

      <h1>Driver Verification</h1>

      {drivers.map((driver)=>(
        <div key={driver.id}
        style={{border:"1px solid white",padding:15,marginBottom:10}}>

          <p><b>Vehicle:</b> {driver.vehicle_number}</p>
          <p><b>Type:</b> {driver.truck_type}</p>
          <p><b>Capacity:</b> {driver.capacity}</p>
          <p><b>Approved:</b> {driver.approved ? "Yes":"No"}</p>

          {!driver.approved && (
            <button onClick={()=>approveDriver(driver.id)}>
              Approve Driver
            </button>
          )}

        </div>
      ))}

    </div>

  )

}