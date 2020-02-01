import UserStore from './UserStore';
import BaseStore from './BaseStore';
import RobotStore from './RobotStore';

const config: { [key: string]: typeof BaseStore } = {
  UserStore,
  RobotStore,
}

export default config