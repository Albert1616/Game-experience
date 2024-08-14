'use client'

import { useState,useEffect } from "react";

let BASE_URL:string = 'https://api.rawg/api';

const API_KEY:string = '51ec38f0feb7474ab43e6e64b55e387a';

interface GameProps{
    id:number,
    name:string,
}

export default function GetGames(){
    const [data, setData] = useState<GameProps[]>([]);

    useEffect(() =>{
        fetch(`${BASE_URL}/games?key=${API_KEY}`,{
            method:'GET',
            headers:{'Content-type':'Application/json'}
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data)
            console.log(data);
        })
        .catch((e) => console.log(e))
    },[])
}