import React,{useState,useEffect} from 'react'
import { fetchDailyData } from '../../api'
import {Line ,Bar} from 'react-chartjs-2';
import styles from './Charts.module.css'
export default function Charts({data:{confirmed,recovered,deaths},country}) {
    const [dailyData,setdailyData]=useState([]);
    useEffect(() => {
        const fetchMyAPI=async()=>{
            const initialDailyData=await fetchDailyData();
            setdailyData(initialDailyData);            
        }
        fetchMyAPI();
    },[]);
    const lineChart=(
        dailyData[0]?
        (<Line
        data={{
            labels:dailyData.map((data)=>data.date),
            datasets:[{
                data:dailyData.map((data)=>data.confirmed),
                label:'Infected',
                borderColor:"#3333ff",
                backgroundColor:'rgba(0,0,255,0.5)',
                fill:true
            }
            ,
            {
                data:dailyData.map((data)=>data.deaths),
                label:'Deaths',
                borderColor:'red',
                backgroundColor:'rgba(255,0,0,0.5)',
                fill:true


            }]
        }}
        />):
        null
    );
    const barChart=(
       confirmed? (
            <Bar
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'people',
                    backgroundColor:[
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'
                    ],
                    data:[confirmed.value,recovered.value,deaths.value]
                },
            ],
                
            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`current state in ${country}`},


              }}
            />

        ):null
    )
    
    return (
       
        <div className={styles.container}>
           {
               (country==='global'|| country==='')?lineChart:barChart
           }

        </div>
    )
}
