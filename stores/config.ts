import UserStore from './UserStore';
import BaseStore from './BaseStore';
import RobotStore from './RobotStore';
import StatisticsStore from './StatisticsStore';
import DLStore from './DLStore';

const config: { [key: string]: typeof BaseStore } = {
  UserStore,
  RobotStore,
  StatisticsStore,
  DLStore,
}

export default config