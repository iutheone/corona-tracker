import React,{useState,useEffect} from 'react'
import { fetchCountryData } from '../../api';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './CountryTable.module.css';
//table
const useStyles = makeStyles({
    table: {
      minWidth: 400,

    },
  });
  
  function createData(State, Active, Confirmed, Recoveries, Deaths) {
    return {State, Active, Confirmed, Recoveries, Deaths };
  }

export default function CountryTable({country}) {
    const [CountryData, setCountryData] = useState([]);
    useEffect(() => {
        const CountryAPI=async()=>{
            setCountryData(await fetchCountryData(country));
        }
        CountryAPI();
    }, [country]);
    
    console.log(CountryData[0])
    const classes = useStyles();
    
    return (
         CountryData[0]?
         (CountryData[0].provinceState?
         (<div className={styles.cantainer}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >State</TableCell>
                <TableCell >Active</TableCell>
                <TableCell >Confirmed</TableCell>
                <TableCell >Recoveries</TableCell>
                <TableCell >Deaths</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CountryData.map((row) => (
                <TableRow key={row.uid}>

                  <TableCell >{row.provinceState}</TableCell>
                  <TableCell >{row.active}</TableCell>
                  <TableCell >{row.confirmed}</TableCell>
                  <TableCell >{row.recovered}</TableCell>
                  <TableCell >{row.deaths}</TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>):
        <div>Insufficient Data</div>
        ):
        <div>Loading...</div>
      );
}
