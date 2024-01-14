import { useState, FormEvent } from "react"

import "./Form.css"

type FormProps = {
    city: string,
    setCity: (city: string) => void
    dates: string[],
}

const Form = (props: FormProps) => {

    const [cityText, setCityText] = useState("")

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let ddString = dd.toString()
    let mmString = mm.toString()

    if (dd < 10) {
        ddString = '0' + dd.toString();
    }

    if (mm < 10) {
        mmString = 0 + mm.toString();
    } 

    let todayString:string = yyyy.toString() + '-' + mmString + '-' + ddString;

    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 2)
    const [maxDateFormatted] = maxDate.toISOString().split('T');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        props.setCity(cityText)
        const date1 = new Date(firstDate)
        const date2 = new Date(secondDate)
        const date3 = new Date
        date3.setDate(date1.getDate()+1)
        const date4 = new Date
        date4.setDate(date2.getDate()+1)

        
        while (date3 <= date4) {
            let year = date3.toLocaleString('default', {year: 'numeric'});
            let month = date3.toLocaleString('default', {
                month: '2-digit',
            });
            const day = date3.toLocaleString('default', {day: '2-digit'});

            props.dates.push([year, month, day].join('-'))
            date3.setDate(date3.getDate()+1)
        }
    }

    


    const [firstDate, setFirstDate] = useState<string | number | Date>(todayString)
    const [secondDate, setSecondDate] = useState("2000-01-01")

    const handleFirstDate = (e: any) => {
        setFirstDate(e.target.value)
    }

    const handleSecondDate = (e: any) => {
        setSecondDate(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    <h3>Digite a cidade:</h3>
                    <input type="text" onChange={(e) => setCityText(e.target.value)} className="input"/>
                </label>
                <label>  
                    <input type="date" onChange={handleFirstDate} className="input" min={todayString} value={todayString} disabled/>
                </label>
                <label>
                    <p>Até qual dia você deseja as informações?</p>
                    <input type="date" onChange={handleSecondDate} className="input" min={todayString} max={maxDateFormatted} required/>
                </label>
                
                {props.city === "" && <button type="submit">Procurar</button>}
            </form>

        </div>
    )
}

export default Form