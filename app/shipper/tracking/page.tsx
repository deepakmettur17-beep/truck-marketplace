'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { supabase } from "../../../src/lib/supabase"

const Map = dynamic(() => import("./trackingMap"), {
  ssr: false
})

export default function Tracking(){

  const [location,setLocation] = useState<any>(null)

  async function getLocation(){

    const { data,error } = await supabase
      .from("driver_locations")
      .select("*")
      .order("created_at",{ascending:false})
      .limit(1)
      .single()

    if(!error){
      setLocation(data)
    }

  }

  useEffect(()=>{

    getLocation()
  
    const interval = setInterval(()=>{
      getLocation()
    },5000)
  
    return ()=>clearInterval(interval)
  
  },[])

  return(

    <div style={{padding:40}}>

      <h1>Truck Tracking</h1>

      {location && (
        <Map lat={location.lat} lng={location.lng}/>
      )}

    </div>

  )

}