import store from '../store';
import { notificationsConnect, receiveNotification } from './actions';

const BASE_HTTP_PROTO = 'http';
const WS_PROTO = `ws${window.location.protocol.slice(BASE_HTTP_PROTO.length)}`;
const WS_URL = `${WS_PROTO}${window.location.host}/api/notifications/`;

const onOpen = () => {
  console.debug('Notification connection success');
};

const onClose = counter => event => {
  console.error('Notification connection close', event.data);
  store.dispatch(notificationsConnect(counter + 1));
};

const onMessage = event => {
  try {
    const payload = JSON.parse(event.data);
    store.dispatch(receiveNotification(payload));
  } catch (e) {
    console.error('Error in receive ws message', e);
  }
};

const onError = event => {
  console.error('Notification connection error', event.data);
};

// TODO: Handle logout for disconnect
const connect = counter => {
  const socket = new WebSocket(WS_URL);
  socket.onclose = onClose(counter);
  socket.onopen = onOpen;
  socket.onmessage = onMessage;
  socket.onerror = onError;
};

export default connect;
