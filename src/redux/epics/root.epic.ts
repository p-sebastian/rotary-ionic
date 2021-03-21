import {combineEpics} from 'redux-observable'

import {authEpics} from './auth.epic'
import {clubEpics} from './club.epic'
import {meetingEpics} from './meeting.epic'
import {memberEpics} from './member.epic'
import {projectEpics} from './project.epic'

export const rootEpic = combineEpics(...authEpics, ...memberEpics, ...clubEpics, ...projectEpics, ...meetingEpics)
