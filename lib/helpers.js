/** @babel */
import {shell} from 'electron'
import _trim from 'lodash/trim'
import moment from 'moment'

const {ROOT_URL} = require('./config')

export const goTo = (path) => {
    let trimmedPath = _trim(path, '/')
    return shell.openExternal(`${ROOT_URL}/${trimmedPath}`)
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
