import UserStore from './UserStore';
import BaseStore from './BaseStore';
import RobotStore from './RobotStore';
import StatisticsStore from './StatisticsStore';

const config: { [key: string]: typeof BaseStore } = {
  UserStore,
  RobotStore,
  StatisticsStore,
}

export default config