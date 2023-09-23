import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import {Icon} from 'leaflet'
import { MapPinIcon } from '@heroicons/react/20/solid'
import 'leaflet/dist/leaflet.css'
export default function Map(props){
    const {latitud, longitud}=props
    const ubi=[latitud, longitud]
    const iconPin=new Icon({
        iconUrl:"pin.png",
        iconSize:[32,50]
    })
    return(
        <MapContainer center={ubi} zoom={13} scrollWheelZoom={false} className=' w-96 h-96 '>
  <TileLayer
    attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
  />
  <Marker position={ubi} icon={iconPin}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    )
}