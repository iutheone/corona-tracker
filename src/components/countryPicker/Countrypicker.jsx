import React,{useState,useEffect} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core'
import styles from "./Countrypicker.module.css"
import { fetchCountries } from '../../api';
export default function Countrypicker({handleCountryChange}) {
    const [fetchedCountries, setfetchedCountries] = useState([]);
    useEffect(() => {
        const fetchAPI=async()=>{
            setfetchedCountries(await fetchCountries());
        }
        fetchAPI();
    }, [fetchedCountries]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e=>handleCountryChange(e.target.value))}>
                <option value="global">Global</option>
                {
                    fetchedCountries.map((country,i)=><option key={i} value={country}>{country}</option>)
                }

            </NativeSelect>
        </FormControl>
    )
}
