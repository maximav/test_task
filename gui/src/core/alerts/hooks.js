import {useDispatch} from 'react-redux';
import {showAlertMessageAction} from './actions';

export const useNotifications = () => {
  const dispatch = useDispatch()
  const onResult = (message) => {
    dispatch(showAlertMessageAction(message))
  }

  const onError = e => onResult({
    text: e.message,
    severity: 'error'
  })
  return { onResult, onError }
}