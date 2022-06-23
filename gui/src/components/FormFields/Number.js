import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Grid, TextField } from '@material-ui/core';

const Number = ({ label, placeholder, name, helperText }) => {
  helperText = helperText || '';
  return (
    <Grid item>
      <Field name={name}>
        {({ input, meta }) => (
          <TextField
            error={!!meta.error}
            helperText={meta.error || helperText}
            label={label}
            name={input.name}
            onChange={input.onChange}
            placeholder={placeholder}
            type="text"
            value={input.value}
            variant="outlined"
          />
        )}
      </Field>
    </Grid>
  );
};

Number.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default Number;
