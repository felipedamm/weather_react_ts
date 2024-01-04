import './App.css'
import Weather from './components/Weather'
import Form from './components/Form'

import { useState } from 'react'

let dates:string[] = []

function App() {

    const [city, setCity] = useState("")

    const[resetOn, setResetOn] = useState(false)

    if (resetOn) {
      dates = []
      setResetOn(false)
    }

    return (
      <div>
        <h1>Previsão do tempo</h1>
        <Form city={city} setCity={setCity} dates={dates}/>
        {city && (<Weather city={city} setCity={setCity} dates={dates} resetOn={resetOn} setResetOn={setResetOn}/>)}
      </div>
    )
}

export default App
 