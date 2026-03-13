'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function DriverTrips(){

  const [trips,setTrips] = useState<any[]>([])

  async function getTrips(){

    const { data:userData } = await supabase.auth.getUser()

    const driverId = userData.user?.id

    const { data,error } = await supabase
      .from("trips")
      .select("*")
      .eq("driver_id",driverId)

    if(error){
      console.log(error)
    }else{
      setTrips(data || [])
    }

  }

  async function startTrip(tripId:string){

    await supabase
      .from("trips")
      .update({ status:"in_transit" })
      .eq("id",tripId)

    getTrips()

  }

  async function completeTrip(tripId:string){

    await supabase
      .from("trips")
      .update({ status:"delivered" })
      .eq("id",tripId)

    getTrips()

  }

  useEffect(()=>{
    getTrips()
  },[])

  return(

    <div style={{padding:40}}>

      <h1>My Trips</h1>

      {trips.length === 0 && (
        <p>No trips assigned yet</p>
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
          <p><b>Price:</b> ₹{trip.bid_price}</p>
          <p><b>Status:</b> {trip.status}</p>

          {trip.status === "assigned" && (
            <button onClick={()=>startTrip(trip.id)}>
              Start Trip
            </button>
          )}

          {trip.status === "in_transit" && (
            <button onClick={()=>completeTrip(trip.id)}>
              Complete Trip
            </button>
          )}

        </div>
      ))}

    </div>

  )

}