import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  Grid,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Radio as MUIRadio
} from '@material-ui/core';

const Radio = ({ items, label, name, helperText }) => {
  helperText = helperText || '';
  return (
    <Grid item>
      <Field name={name} type="text">
        {({ input, meta }) => (
          <FormControl component="fieldset" error={!!meta.error}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup {...input}>
              <Grid container>
                {items.map((item, i) => (
                  <FormControlLabel
                    control={<MUIRadio color="primary" />}
                    key={`select-${name}-${i}`}
                    label={item.title || item.value}
                    value={item.value}
                  />
                ))}
              </Grid>
            </RadioGroup>
            <FormHelperText>{meta.error || helperText}</FormHelperText>
          </FormControl>
        )}
      </Field>
    </Grid>
  );
};

Radio.propTypes = {
  helperText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      title: PropTypes.string
    })
  ).isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Radio;
