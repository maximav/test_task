import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Grid, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const TextFieldStyled = withStyles(() => ({
  root: {
    color: 'red',
    '& label': {
      zIndex: '99'
    }
  }
}))(TextField);

const String = ({ label, placeholder, name, helperText, type, ...rest }) => {
  helperText = helperText || '';
  return (
    <Grid item>
      <Field name={name}>
        {({ input, meta }) => (
          <TextFieldStyled
            error={meta.touched && !!meta.error}
            helperText={(meta.touched && meta.error) || helperText || ' '}
            label={label}
            name={input.name}
            onBlur={event => input.onBlur(event)}
            onChange={input.onChange}
            placeholder={placeholder}
            type={type}
            value={input.value}
            variant="outlined"
            {...rest}
          />
        )}
      </Field>
    </Grid>
  );
};

String.defaultProps = {
  type: 'text'
};

String.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default String;
