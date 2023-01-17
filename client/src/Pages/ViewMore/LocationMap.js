import * as React from 'react'
import Map, { Marker } from 'react-map-gl';

const LocationMap = ({lag, lat}) => {

    return (
        <div className="maplocation">
            <div className='map'>
                <Map
                    mapboxAccessToken='pk.eyJ1Ijoic2hpdmExNjgiLCJhIjoiY2xjMWZyZWlhMGNwZDN2b2R4dzVyOGFlYSJ9.snSXqrmACLeeadbFeZlkcw'
                    style={{ width: "450px", height: "350px", border: "1px solid black", overflow: "hidden", }}
                    initialViewState={{
                        longitude: lag, latitude: lat, zoom: 10
                    }} mapStyle="mapbox://styles/mapbox/streets-v9" >
                    return (
                    <>
                        <Marker longitude={lag} latitude={lat} />
                    </>
                    )
                </Map>
            </div>
        </div>
    )
}
export default LocationMap