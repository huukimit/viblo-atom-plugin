/** @babel */
import App from './app'
import showPanel from './show-panel'
import {openWorkspace} from './helpers'

const {ATOM_URI} = require('./config')
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

            showPanel(appInstance, uri)

            return appInstance
        })
    },

    registerCommands () {
        // eslint-disable-next-line no-undef
        atom.commands.add('atom-workspace', {
            // TODO: Add more commands for plugins: Settings, Posts, About...
            'viblo:open' () {
                openWorkspace('/publish-posts')
            },
            'viblo:settings' () {
                openWorkspace('/settings')
            }
        })
    }
}
