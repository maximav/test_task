import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputLabel,
  Input,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  createStyles,
  InputAdornment,
  FormHelperText,
  CircularProgress
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import {useTranslation} from 'react-i18next';
import {useAction, useModal} from '../utils/hooks';

import {uploadFile} from '../core/files/actions';
import {uploadSelector} from '../core/files/selectors';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      paddingLeft: theme.spacing(2)
    },
    fullWidth: {
      width: '100%'
    },
    fileInput: {
      display: 'none'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& h6': {
        fontSize: 23,
        fontWeight: 'bold'
      }
    },
    loaderShow: {
      background: 'rgba(255, 255, 255, 0.8)',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    loaderHide: {
      display: 'none'
    },
    icon: {
      width: 18,
      stroke: theme.palette.secondary.main,
      fill: theme.palette.secondary.main,
      strokeWidth: '0.2px',
    },
    button: {
      textTransform: 'inherit',
      padding: theme.spacing(1, 2),
      margin: theme.spacing(0, 1),
      color: theme.palette.secondary.main,
      minWidth: theme.spacing(22)
    },
  })
);

const UploadFiles = (
  {
    disabled,
    lazy = false,
    tooltip = false
  }) => {
  const submit = useAction(uploadFile);
  const { uploading } = useSelector(uploadSelector);
  const [open, toggleOpen] = useModal();
  const [newFileName, setNewFileName] = useState('');
  const [fileName, setFileName] = useState('');
  const classes = useStyles();
  const fileFormRef = useRef();
  const {t} = useTranslation();

  const onChangeUpload = () => {
    const { current } = fileFormRef;
    const newUploadName =
      current && current.files.length ? current.files[0].name : '';
    setFileName(newUploadName);
    setNewFileName(newUploadName);
  };

  const onChangeFileName = ({ target }) => {
    return setNewFileName(target.value || '');
  };

  const handleClickOpen = () => {
    toggleOpen();
  };

  const handleClose = () => {
    toggleOpen();
    setNewFileName('');
    setFileName('');
  };

  const startUpload = () => {
    submit(fileFormRef.current.files[0], newFileName);
  };

  const toolTip = (
    <Tooltip title={'Загрузить катушки'}>
      <IconButton
        disabled={disabled}
        onClick={handleClickOpen}
      >
        <CloudUploadIcon color="primary" />
      </IconButton>
    </Tooltip>
  );

  const button = (
    <Button
      className={classes.button}
      disabled={disabled}
      disableElevation
      onClick={handleClickOpen}
      startIcon={<CloudUploadIcon className={classes.icon} />}
    >
      Загрузить файл
    </Button>
  );

  return (
    <React.Fragment>
      {tooltip ? toolTip : button}
      <Dialog
        fullWidth
        onClose={handleClose}
        open={lazy ? open : open || uploading}
      >
        <DialogTitle
          className={classes.header}
          disableTypography
          id="file_name_"
        >
          <Typography
            variant="h6"
          >
            Загрузить файл
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              className={classes.fullWidth}
              item
            >
              <FormControl
                className={classes.fullWidth}
                error={!newFileName && !!fileName}
              >
                <InputLabel
                  htmlFor="file_name_"
                >
                  Имя файла
                </InputLabel>
                <Input
                  color="secondary"
                  disabled={uploading}
                  endAdornment={
                    <InputAdornment position="end">
                      <input
                        className={classes.fileInput}
                        id="upload_file"
                        onChange={onChangeUpload}
                        ref={fileFormRef}
                        type="file"
                      />
                      <label htmlFor="upload_file">
                        <IconButton
                          color="secondary"
                          component="span"
                          disabled={uploading}
                        >
                          <FolderIcon />
                        </IconButton>
                      </label>
                    </InputAdornment>
                  }
                  id="file_name_"
                  onChange={onChangeFileName}
                  type="text"
                  value={newFileName}
                />
                <FormHelperText>
                  {fileName && ` ${t('Загрузить файл')}: ${fileName}`}.
                </FormHelperText>
                <div
                  className={clsx(
                    classes.loaderShow,
                    !uploading && classes.loaderHide
                  )}
                >
                  <CircularProgress />
                </div>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            disabled={uploading}
            onClick={handleClose}
          >
            Отмена
          </Button>
          <Button
            color="secondary"
            disabled={uploading || !newFileName || !fileName}
            onClick={startUpload}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

UploadFiles.propTypes = {
  disabled: PropTypes.bool,
  lazy: PropTypes.bool,
  tooltip: PropTypes.bool
};

export default UploadFiles;
