import React, { Component } from 'react'
import Cards from './components/cards/Cards'
import Charts from './components/charts/Charts'
import Countrypicker from './components/countryPicker/Countrypicker'
import styles from './App.module.css'
import {fetchData} from './api'
import CountryTable from './components/countryTable/CountryTable'
export default class App extends Component {
  state={
    data:{},
    country:''
  }
  async componentDidMount(){
    const fetchdata=await fetchData();
    this.setState({data:fetchdata});
    
  }
  handleCountryChange=async(country)=>{
    const fetchedData=await fetchData(country);
    this.setState({data:fetchedData,country:country});
    
  }
  render()  {
    const {data,country}=this.state
    return (
      <div className={styles.container}>
        <h3 className={styles.header}>Covid-19 Tracker</h3>
        <Cards data={data}/>
        <Countrypicker handleCountryChange={this.handleCountryChange}/>
        <Charts data={data} country={country}/>
        <CountryTable country={country}/>
      </div>
    )
  }
}
