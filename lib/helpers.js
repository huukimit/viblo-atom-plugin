/** @babel */
import {shell} from 'electron'
import _trim from 'lodash/trim'

const {ROOT_URL} = require('./config')

export const goTo = (path) => {
    let trimmedPath = _trim(path, '/')
    return shell.openExternal(`${ROOT_URL}/${trimmedPath}`)
}
