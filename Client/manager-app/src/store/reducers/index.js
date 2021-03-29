import { combineReducers } from "redux";

import user from "./user/user-reducer";
import gMother from './GMother/gMother-reducer'
import gDaughter from "./GDaughter/gDaughter-reducer"
import event from "./Events/events-reducer";
import stat from './Stat/stat-reducer'


export default combineReducers({ user, gMother, gDaughter, event, stat});