import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: `${theme.spacing(3)}px 0`,
      minWidth: 120,
    },
  }));

export default function CountrySelector({value, handleOnChange, countries}) {
    const styles = useStyles();

  return (
    <FormControl className={styles.formControl}>
        <InputLabel htmlFor='country-selector' shrink>
            Quốc gia
        </InputLabel>
        <NativeSelect        
            value={value}
            onChange={handleOnChange}
            inputProps={{
                name: 'country',
                id: 'country-selector',
                }}
            >
            {countries.map((country) => {
                    return (
                        <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                            {country.Country}
                        </option>
                    );
                })}
        </NativeSelect>
        <FormHelperText>Lựa chọn Quốc gia</FormHelperText>
    </FormControl>
  );
}
