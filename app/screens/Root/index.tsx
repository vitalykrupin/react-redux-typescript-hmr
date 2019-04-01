import Component from './Root.connect';
import store from '@root/store';
import root from './reducer';

store.registerReducer({ root });

export default Component;

