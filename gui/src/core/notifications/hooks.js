import {useDispatch} from 'react-redux';
import {showAlertMessageAction} from '../alerts/actions';
import {useEffect} from 'react';

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

export const useOnEnter = (started, onEnter) => {
  useEffect(() => {
    function handle(e) {
      if (e.key === 'Enter') onEnter()
    }
    if (!started) return;
    window.addEventListener('keypress', handle);
    return window.removeEventListener('keypress', handle);
  }, [started, onEnter]);
}