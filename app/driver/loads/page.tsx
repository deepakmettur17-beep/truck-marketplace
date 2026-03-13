'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function DriverLoads(){

  const [loads,setLoads] = useState<any[]>([])

  async function getLoads(){

    const { data,error } = await supabase
      .from("loads")
      .select("*")
      .eq("status","open")

    if(error){
      console.log(error)
    }else{
      setLoads(data || [])
    }

  }

  async function placeBid(loadId:string){

    const bidPrice = prompt("Enter your bid price")

    if(!bidPrice) return

    const { data:userData } = await supabase.auth.getUser()

    const driverId = userData.user?.id

    const { error } = await supabase
      .from("bids")
      .insert({
        load_id: loadId,
        driver_id: driverId,
        bid_price: bidPrice
      })

    if(error){
      alert(error.message)
    }else{
      alert("Bid placed successfully")
    }
    const { data:truck } = await supabase
  .from("trucks")
  .select("approved")
  .eq("driver_id",driverId)
  .single()

if(!truck?.approved){
  alert("Your truck is not approved yet")
  return
}

  }

  

  useEffect(()=>{

    getLoads()

    const channel = supabase
      .channel('loads-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'loads' },
        () => {
          getLoads()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  },[])

  return(

    <div style={{padding:40}}>

      <h1>Available Loads</h1>

      {loads.length === 0 && (
        <p>No loads available</p>
      )}

      {loads.map((load)=>(
        <div
          key={load.id}
          style={{
            border:"1px solid white",
            padding:15,
            marginBottom:10
          }}
        >

          <p><b>Pickup:</b> {load.pickup_city}</p>
          <p><b>Drop:</b> {load.drop_city}</p>
          <p><b>Weight:</b> {load.weight}</p>
          <p><b>Price:</b> ₹{load.budget_price}</p>

          <button onClick={()=>placeBid(load.id)}>
            Place Bid
          </button>

        </div>
      ))}

    </div>

  )

}