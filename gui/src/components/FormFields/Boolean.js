import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  Grid,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@material-ui/core';

const Boolean = ({ label, name, helperText }) => {
  helperText = helperText || '';
  return (
    <Grid item>
      <Field name={name} type="checkbox">
        {({ input, meta }) => (
          <>
            <FormControlLabel
              control={<Checkbox {...input} color="primary" />}
              label={label}
            />
            <FormHelperText>{meta.error || helperText}</FormHelperText>
          </>
        )}
      </Field>
    </Grid>
  );
};

Boolean.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Boolean;
