import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  Grid,
  FormControl,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  FormHelperText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  '& label.Mui-focused': {
    color: 'green'
  }
}));

const Select = ({ items, label, name, helperText }) => {
  const classes = useStyles();
  const inputLabel = useRef(null);
  helperText = helperText || '';
  return (
    <Grid item>
      <Field className={classes.root} name={name}>
        {({ input, meta }) => (
          <FormControl error={!!meta.error} variant="outlined">
            <InputLabel ref={inputLabel}>{label}</InputLabel>
            <MUISelect {...input} autoWidth>
              {items.map((item, i) => (
                <MenuItem key={`select-${name}-${i}`} value={item.value}>
                  {item.title || item.value}
                </MenuItem>
              ))}
            </MUISelect>
            <FormHelperText>{meta.error || helperText}</FormHelperText>
          </FormControl>
        )}
      </Field>
    </Grid>
  );
};

Select.propTypes = {
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

export default Select;
