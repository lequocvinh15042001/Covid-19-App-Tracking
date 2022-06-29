// import {Grid} from '@material-ui/core';
// import React, { useEffect, useState } from 'react';
// import HightMaps from '../Charts/HightMaps';
// import LineChart from '../Charts/LineChart';

// export default function Sumary({report, selectedCountryId}) {
//     const [mapData, setMapData] = useState({});
//     useEffect(() => {
//         if(selectedCountryId){
//            import(`@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
//            ).then((res) => {
//             setMapData(res);
//            })
//            .catch((err) => console.log({ err }));
//         }
//     },[selectedCountryId]);

//   return (
//     <div style={{height: '500px', marginTop: 10}}>
//         <Grid container spacing ={3}>
//             <Grid item sm={8} xs={12}>
//                 <LineChart data={report} />
//             </Grid>
//             <Grid item sm={4} xs={12}>
//                 <HightMaps mapData={mapData} />
//             </Grid>
//         </Grid>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { getMapDataByCountryId } from '../apis';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HightMaps';

export default function Sumary({ countryId, report }) {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countryId) {
      getMapDataByCountryId(countryId)
        .then((res) => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [countryId]);

  return (
    <div style={{ height: '500px', marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
