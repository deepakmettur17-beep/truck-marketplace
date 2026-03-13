'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

export default function TrackingMap({lat,lng}:{lat:number,lng:number}){

  return(

    <MapContainer
      center={[lat,lng]}
      zoom={10}
      style={{height:"500px", width:"100%"}}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat,lng]}>
        <Popup>Driver Location</Popup>
      </Marker>

    </MapContainer>

  )

}