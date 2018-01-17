'use babel'

import {URI_REGEX, ROOT_URL} from './config'
import {shell} from 'electron'
import _trim from 'lodash/trim'

export const openPanel = (viewInstance, panelName, uri) => {
    let match = URI_REGEX.exec(uri)
    let panel = match != null ? match[1] : void 0
    let detail = match != null ? match[2] : void 0
    let options = {uri}

    if (panel === 'settings' && (detail != null)) {
        panelName = detail
        options.pack = {name: detail}

        if (atom.packages.getLoadedPackage(detail)) {
            options.back = 'settings'
        }
    }

    return viewInstance.showPanel(panelName, options)
}

export const goTo = (path) => {
    let trimmedPath = _trim(path, '/')
    return shell.openExternal(`${ROOT_URL}/${trimmedPath}`)
}
