import { useEffect, useState } from "react";

export default function SearchCity(props){
    const {onChange} = props;

    const [cityName, setCityName] = useState('');

    // useEffect(() =>{

    // });

    return (
        <>
        <input type={"search"} name="search-city" placeholder="search city name here" onChange={ev => setCityName(ev.target.value)} />
        <button onClick={ev => onChange(ev, cityName)}>Search City</button>
        </>
    );
}