import UserStore from './UserStore'
import BaseStore from './BaseStore'

const config: { [key: string]: typeof BaseStore } = {
  UserStore
}

export default config