// import { sortBy } from "lodash";
// import React, { useEffect, useState } from 'react';
// import { getCountry, getReportByCountry } from "./apis";
// import CountrySelector from "./components/CountrySelector";
// import Highlight from "./components/Highlight";
// import Sumary from "./components/Sumary";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import moment from "moment";
// import 'moment/locale/vi';
// import '@fontsource/roboto';

// moment.locale('vi')

// function App() {

//   const [countries, setCountries] = useState([]);
//   const [selectedCountryId, setSelectedCountryId] = useState('');
//   const [report, setReport]= useState([]);  
//   useEffect(()=>{
//     getCountry()
//       .then(res => {
//         console.log({res});

//         const countries = sortBy(res.data, 'Country')//sắp tên theo alpha B
//         setCountries(countries);

//         setSelectedCountryId('vn');//load lên lần đầu là đất nước VN
//       });
//   },[])

//   const handleOnChange = (e) =>{
//     setSelectedCountryId(e.target.value);
//   };

//   useEffect(() => {
//     if(selectedCountryId){
//       const {Slug} = countries.find(
//         (country) => country.ISO2.toLowerCase() === selectedCountryId
//       );
  
//       //console.log({e, Slug});
//        //call api
//        getReportByCountry(Slug).then((res) => 
//        {
//         //xoa di item cuoi cung trong array res.data
//           res.data.pop(); 
//           //console.log('getReportByCountry', {res})
//           setReport(res.data)
//        });
//     }
//   },[countries,selectedCountryId]);

//   return(
//     <Container style={{marginTop:20}}>
//     <Typography variant="h2" components="h2">
//       Số liệu Covid - 19 
//     </Typography>
//     <Typography>
//       {moment().format('LLL')}
//     </Typography>
//     <CountrySelector countries={countries} handleOnChange = {handleOnChange} value = {selectedCountryId}/>
//     <Highlight report={report} />
//     <Sumary report={report} />
//   </Container>
//   );
// }

// export default App;


import React, { useEffect, useMemo } from 'react';
import { sortBy } from 'lodash';
import CountrySelector from './components/CountrySelector';
import { getCountries, getReportByCountry } from './components/apis';
import Summary from './components/Sumary';
import Highlight from './components/Highlight';
import { Container, Typography } from '@material-ui/core';
import '@fontsource/roboto';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState('');
  const [report, setReport] = React.useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');
    });
  }, []);

  const handleOnChange = React.useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log('getReportByCountry', { res });
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, countries]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: 'Số ca nhiễm',
          count: latestData.Confirmed,
          type: 'confirmed',
        },
        {
          title: 'Khỏi',
          count: latestData.Recovered,
          type: 'recovered',
        },
        {
          title: 'Tử vong',
          count: latestData.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        handleOnChange={handleOnChange}
        countries={countries}
        value={selectedCountryId}
      />
      <Highlight summary={summary} />
      <Summary countryId={selectedCountryId} report={report} />
    </Container>
  );
};

export default App;
