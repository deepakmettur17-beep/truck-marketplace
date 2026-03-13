'use client'

import Link from "next/link"

export default function ShipperDashboard(){

  return(

    <div style={{padding:40}}>

      <h1>Shipper Dashboard</h1>

      <div style={{marginTop:20}}>

        <Link href="/shipper/post-load">
          <button style={{marginRight:10}}>Post Load</button>
        </Link>

        <Link href="/shipper/bids">
          <button style={{marginRight:10}}>View Bids</button>
        </Link>

        <Link href="/shipper/trips">
          <button>Active Trips</button>
        </Link>

      </div>

    </div>

  )

}