
import React, { useState } from 'react'

export default function HomeLayout() {

    const [route, setRoute] = useState({
        route: "",
        stations: []
    });

    const handleRoute = e => {
        setRoute(route => ({...route, route: e.target.value}))
    }

    const addStation = () => {
        setRoute(route => (
            {
                ...route, 
                stations: [
                    ...route.stations, 
                    {
                        name: "",
                        lat: "", 
                        lon: "",
                        errors: {}
                    }
                ]
            }
            )
            )
    }

    const handleStation = (value, name, key) => {
        setRoute(route => ({
            ...route,
            stations: route.stations.map((station, i ) => {
                if(key === i) {
                    station[name] = value
                    let current = route.stations.find((r, index) => r[name] === value && key !== index )
                    if (current) {
                        station.errors[name] = `${name} is already defined in another field as ${value} value`
                    } else {
                        delete station.errors[name]
                    }
                } 
                return station
            })
        }))
    }

    const enabled = route.route && route.stations.every(
        station => Object.entries(station).every(
            ([key, value]) => key === "errors" ? Object.values(value).length === 0 : value
        )
        )

  return (
    <>
    <input type="text" value={route.route} onChange={handleRoute} placeHolder="The route" />
    <button onClick={addStation}>Add New Station</button>
    <hr/>
    {route.stations.map((station, key) => (
        <div>
            <input type="text" onChange={e => handleStation(e.target.value, "name", key)} placeHolder="Station Name" />
            <input type="text" onChange={e => handleStation(e.target.value, "lat", key)} placeHolder="Latitude" />
            <input type="text" onChange={e => handleStation(e.target.value, "lon", key)} placeHolder="Longitude" />
        </div>
    ))}
    <hr/>
    <button disabled={!enabled}>SAVE</button>
    <br/>
    <pre>{JSON.stringify(route, null, 2)}</pre>
    </>
  )
}
