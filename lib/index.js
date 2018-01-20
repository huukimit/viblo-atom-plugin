/** @babel */
import App from './app'
import {panels} from './config/panels'
import _find from 'lodash/find'

const {ATOM_URI, URI_REGEX} = require('./config')
let appInstance = null

export default {
    createAppInstance (params) {
        if (appInstance === null) {
            appInstance = new App(params)
        }

        appInstance.onDidChangeAuth(() => appInstance.initializePanels())

        return appInstance
    },

    activate () {
        // Add workspace opener:
        this.addWorkspaceOpener()
        // Register command that toggles this view
        this.registerCommands()
    },

    addWorkspaceOpener () {
        // Current URI is matched with correct Panel by Opener:
        atom.workspace.addOpener((uri) => { // eslint-disable-line no-undef
            if (uri.startsWith(ATOM_URI)) {
                appInstance = this.createAppInstance({uri})
            }

            const panelId = URI_REGEX.exec(uri)[1] || null
            const panel = _find(panels, (item) => item.id === panelId)
            if (panel) {
                appInstance.showPanel(panel.id, {uri})
            }

            return appInstance
        })
    },

    registerCommands () {
        // eslint-disable-next-line no-undef
        atom.commands.add('atom-workspace', {
            // TODO: Add more commands for plugins: Settings, Posts, About...
            'viblo:open' () {
                atom.workspace.open(`${ATOM_URI}/publish-posts`) // eslint-disable-line no-undef
            },
            'viblo:settings' () {
                atom.workspace.open(`${ATOM_URI}/settings`) // eslint-disable-line no-undef
            }
        })
    }
}
