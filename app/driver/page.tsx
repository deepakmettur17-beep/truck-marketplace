'use client'

import Link from "next/link"

export default function DriverDashboard(){

  return(

    <div style={{padding:40}}>

      <h1>Driver Dashboard</h1>

      <div style={{marginTop:20}}>

        <Link href="/driver/loads">
          <button style={{marginRight:10}}>View Loads</button>
        </Link>

        <Link href="/driver/trips">
          <button>My Trips</button>
        </Link>

        <Link href="/driver/register-truck">
  <button style={{marginRight:10}}>Register Truck</button>
</Link>

      </div>

    </div>

  )

}