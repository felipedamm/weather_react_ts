import { useState, useEffect } from 'react'

import "./Weather.css"


type Props = {
    city: string,
    setCity: (city: string) => void,
    dates: string[],
    resetOn: boolean,
    setResetOn: (resetOn: boolean) => void
}

const Weather = (props: Props) => {

    const [temp, setTemp] = useState<number | null>(null)

    let [datesTemps, setDatesTemps] = useState<{date: string, temp: number, minTemp: number, maxTemp: number}[]>([]) 

    if (datesTemps.length === 0) {
        () => setDatesTemps([])
    }
    //setDatesTemps([])
    
    const [errorRes, setErrorRes] = useState(false)

    //const datesTemps:{date: string, temp: number, minTemp: number, maxTemp: number}[] = []
    
    //const datesTemps:{date: string, temp: number}[] = []

    useEffect(() => {

        const getData = async function () {
         
            //const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${props.city},BR/${props.dates[0]}/${props.dates[props.dates.length-1]}?key=UEX42PVND84MKYQTNPVWGQRXN`)
            const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4714ef665c7a4175bf4120418233112&q=${props.city}&days=${props.dates.length}&aqi=no&alerts=no`)

            if (res.status === 400) {
                setErrorRes(true)
            }

            const data = await res.json()
            setTemp(data.current.temp_c) 
            //console.log(data)
             
            if (datesTemps.length === 0) {
                //console.log({date: props.dates[0], temp: data.forecast.forecastday[0].day.maxtemp_c, minTemp: data.forecast.forecastday[0].day.mintemp_c, maxTemp: data.forecast.forecastday[0].day.maxtemp_c})
                for (let i = 0; i < props.dates.length; i++) {
                    datesTemps.push({date: props.dates[i], temp: data.current.temp_c, minTemp: data.forecast.forecastday[i].day.mintemp_c, maxTemp: data.forecast.forecastday[i].day.maxtemp_c})
                    //console.log(datesTemps)
                }        
            } 


        }

        getData()
       
    }, [])
    
    const reset = () => {

        datesTemps = []
        //console.log(datesTemps)  
        props.setCity("")
        setErrorRes(false)
        props.setResetOn(true)
    

    }

    return (
        <div>
            <div className='weather-container'>
                {errorRes && <p>Cidade não encontrada</p>}
                {datesTemps.length === 0 && !errorRes && <p>Carregando...</p>}
                {datesTemps.length>0 && <h1>Cidade: {props.city}</h1>}
                {datesTemps.length>0 && <h2>Temperatura Atual: {temp}ºC</h2>} 
                {datesTemps.length>0 && (<div className='dates-container'>
                    {datesTemps.map((dateTemp) => (
                        <div className='date-temp' key={dateTemp.date}>
                            <p className='date-temp-date'>{dateTemp.date}</p>
                            <p>Min: {dateTemp.minTemp}ºC</p>
                            <p>Max: {dateTemp.maxTemp}ºC</p>
                        </div>
                    ))}
                </div>)}
            </div>
            {(datesTemps.length > 0 || errorRes) && <button className='back-btn' onClick={reset}>Procurar novamente</button>}
        </div>
    )
}

export default Weather

// 4714ef665c7a4175bf4120418233112