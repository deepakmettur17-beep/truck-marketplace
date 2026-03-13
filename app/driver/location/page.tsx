'use client'

import { useEffect } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function DriverLocation(){

  async function sendLocation(){

    navigator.geolocation.getCurrentPosition(async (position)=>{

      const { data:userData } = await supabase.auth.getUser()

      const driverId = userData.user?.id

      const lat = position.coords.latitude
      const lng = position.coords.longitude

      await supabase
        .from("driver_locations")
        .insert({
          driver_id: driverId,
          lat: lat,
          lng: lng
        })

    })

  }

  useEffect(()=>{

    sendLocation()

    const interval = setInterval(()=>{
      sendLocation()
    },5000)

    return ()=>clearInterval(interval)

  },[])

  return(

    <div style={{padding:40}}>

      <h1>Driver Location Sharing</h1>

      <p>Location updates automatically every 5 seconds</p>

    </div>

  )

}