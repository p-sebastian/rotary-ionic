import {combineEpics} from 'redux-observable'

import {authEpics} from './auth.epic'
import {memberEpics} from './member.epic'

export const rootEpic = combineEpics(...authEpics, ...memberEpics)
