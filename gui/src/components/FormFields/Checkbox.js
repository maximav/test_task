import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox as MUICheckbox
} from '@material-ui/core';

const Checkbox = ({ items, label, name, helperText, ...rest }) => {
  helperText = helperText || '';
  return (
    <Grid item >
      <FormControl {...rest} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          <Grid container>
            {items.map((item, i) => (
              <FormControlLabel
                control={
                  <Field name={name} type="checkbox" value={item.value}>
                    {({ input }) => <MUICheckbox color="primary" {...input} />}
                  </Field>
                }
                key={`checkbox-${name}-${i}`}
                label={item.title}
              />
            ))}
          </Grid>
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

Checkbox.propTypes = {
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

export default Checkbox;
