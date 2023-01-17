import React, { useContext, useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md'
// import { Data } from '../Context/TourContext'

import "./RecordStyle.css";


const Locations = () => {

    // const {
    //     tours,
    //     getTours,
    // } = useContext(Data)
    // useEffect(() => {
    //     getTours();
    // }, []);

    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await fetch("http://localhost:4000/tours")
        const data = await response.json()
        // console.log(data);
        setData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='locations'>

            <ReactMapGL
                mapboxAccessToken='pk.eyJ1Ijoic2hpdmExNjgiLCJhIjoiY2xjMWZyZWlhMGNwZDN2b2R4dzVyOGFlYSJ9.snSXqrmACLeeadbFeZlkcw'
                style={{ height: "277px" }}

                initialViewState={{
                    longitude: 78.4747,
                    latitude: 17.3616,
                    zoom: 10,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >

                {data.map((item, i) => {
                    const { _id, latLong: { coordinates: [a, b] } } = item
                    {/* console.log(a, b) */}
                    return (

                        <Marker key={_id}
                            longitude={a}
                            latitude={b}
                            anchor="top"
                        >
                            <div style={{ color: "red" }}>YOU  ARE HERE</div>
                            <MdLocationOn style={{ color: "blue", fontSize: '30px' }} />
                        </Marker>

                    )
                })}



            </ReactMapGL>


        </div>
    )
}

export default Locations
