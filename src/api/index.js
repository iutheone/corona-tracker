import axios from 'axios';

const url='https://covid19.mathdro.id/api';
export const fetchData=async(country)=>{
    let changeableUrl=url;
    if(country && country!=='global'){
        changeableUrl=`${url}/countries/${country}`;
    }
    try {
        const {data:{confirmed,recovered,deaths,lastUpdate}}=await axios.get(changeableUrl);
        return {confirmed,recovered,deaths,lastUpdate};
    } catch (error) {
        
    }
}

export const fetchDailyData=async()=>{
    try {
        const {data}=await axios.get(`${url}/daily`);
        return data.map(({confirmed,deaths,reportDate:date})=>({

            confirmed:confirmed.total,
            deaths:deaths.total,
            date

        }))
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries=async(country)=>{
    try {
        const {data:{countries}}=await axios.get(`${url}/countries`);
        return  countries.map((country)=>country.name)
        
    } catch (error) {
        console.log(error);
    }
}
export const fetchCountryData=async(country)=>{
     let newURL="https://covid19.mathdro.id/api/countries/india/confirmed";
    //  let c='india';
    // if(country!=='Global'|| country!==''){
    //     c=country;
    // }
    // const newURL=`${url}/countries/${c}/confirmed`
    
    if(country!=='global' && country!==''){
            newURL=`${url}/countries/${country}/confirmed`;
        
    }
    console.log(newURL);
    try {
        const {data} =await axios.get(newURL);        
        return data;
    } catch (error) {
        console.log(error);
    }
}