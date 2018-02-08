/** @babel */
import { shell } from 'electron'
import _trim from 'lodash/trim'
import moment from 'moment'

const { ROOT_URL, ATOM_APP_URI } = require('./config')

export const goTo = (webPath) => {
    webPath = _trim(webPath, '/')
    return shell.openExternal(`${ROOT_URL}/${webPath}`)
}

export const openWorkspace = (atomPath) => {
    atomPath = _trim(atomPath, '/')
    atom.workspace.open(`${ATOM_APP_URI}/${atomPath}`) // eslint-disable-line no-undef
}

export const openPostEditor = (hashId) => {
    if (hashId) {
        return atom.workspace.open(`${Auth.tokenManager.vibloDir}/p/${hashId}.md`)
    } else {
        return atom.workspace.open(`${Auth.tokenManager.vibloDir}/p/tmp/untitled.md`)
    }
}

export const humanizeTime = (date, fromFormat) => {
    const now = moment()
    const then = fromFormat ? moment(date, fromFormat) : moment(date)

    if (now.diff(then, 'days') < 1) {
        return then.fromNow()
    } else if (now.diff(then, 'days') < 7) {
        return then.format('dddd, h:mm a')
    } else if (now.diff(then, 'years') < 1) {
        return then.format('MMM Do, h:mm a')
    }

    return then.format('MMM Do, YYYY h:mm a')
}
