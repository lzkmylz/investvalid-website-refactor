import UserStore from './UserStore';
import BaseStore from '../utils/BaseStore';

const config: { [key: string]: typeof BaseStore } = {
  UserStore,
}

export default config;
