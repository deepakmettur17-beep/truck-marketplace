'use client'

import { useEffect, useState } from "react"
import { supabase } from "../../../src/lib/supabase"

export default function ShipperBids(){

  const [bids,setBids] = useState<any[]>([])

  async function getBids(){

    const { data,error } = await supabase
      .from("bids")
      .select("*")

    if(error){
      console.log(error)
    }else{
      setBids(data || [])
    }

  }

  async function acceptBid(bid:any){

    const { error } = await supabase
      .from("trips")
      .insert({
        load_id: bid.load_id,
        driver_id: bid.driver_id,
        bid_price: bid.bid_price,
        status: "assigned"
      })

    if(error){
      alert(error.message)
      return
    }

    await supabase
      .from("loads")
      .update({ status:"booked" })
      .eq("id",bid.load_id)

    alert("Driver assigned successfully")

    getBids()
  }

  useEffect(()=>{
    getBids()
  },[])

  return(

    <div style={{padding:40}}>

      <h1>Driver Bids</h1>

      {bids.length === 0 && (
        <p>No bids yet</p>
      )}

      {bids.map((bid)=>(
        <div
          key={bid.id}
          style={{
            border:"1px solid white",
            padding:15,
            marginBottom:10
          }}
        >

          <p><b>Load ID:</b> {bid.load_id}</p>
          <p><b>Driver ID:</b> {bid.driver_id}</p>
          <p><b>Bid Price:</b> ₹{bid.bid_price}</p>

          <button onClick={()=>acceptBid(bid)}>
            Accept Driver
          </button>

        </div>
      ))}

    </div>

  )

}