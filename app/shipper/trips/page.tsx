'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function ShipperTrips(){

  const [trips,setTrips] = useState<any[]>([])

  async function getTrips(){

    const { data,error } = await supabase
      .from("trips")
      .select("*")

    if(error){
      console.log(error)
    }else{
      setTrips(data || [])
    }

  }

  useEffect(()=>{
    getTrips()
  },[])

  return(

    <div style={{padding:40}}>

      <h1>Active Shipments</h1>

      {trips.length === 0 && (
        <p>No shipments yet</p>
      )}

      {trips.map((trip)=>(
        <div
          key={trip.id}
          style={{
            border:"1px solid white",
            padding:15,
            marginBottom:10
          }}
        >

          <p><b>Load ID:</b> {trip.load_id}</p>
          <p><b>Driver:</b> {trip.driver_id}</p>
          <p><b>Price:</b> ₹{trip.bid_price}</p>
          <p><b>Status:</b> {trip.status}</p>

        </div>
      ))}

    </div>

  )

}