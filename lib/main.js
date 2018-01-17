'use babel'

import {CompositeDisposable} from 'atom'
import {ATOM_URI, URI_REGEX} from './config'
import VibloView from './viblo-view'
import {openPanel} from './helpers'
import TokenManager from './components/token/token-manager'

let viewInstance = null
let tokenManager = new TokenManager()

export default {
    async activate() {
        // Load saved token:
        await tokenManager.loadApiToken()
        // Add workspace opener:
        this.addWorkspaceOpener()
        // Register command that toggles this view
        this.registerCommands()
    },

    addWorkspaceOpener () {
        atom.workspace.addOpener((uri) => {
            if (uri.startsWith(ATOM_URI)) {
                viewInstance = this.createVibloPluginView({uri, tokenManager})
            }

            const match = URI_REGEX.exec(uri)
            if (match) {
                let panelName = match[1]
                panelName = panelName[0].toUpperCase() + panelName.slice(1)
                openPanel(viewInstance, panelName, uri)
            }

            return viewInstance
        })
    },

    registerCommands () {
        atom.commands.add('atom-workspace', {
            // TODO: Add more commands for plugins: Settings, Posts, About...
            'viblo:open'() {
                atom.workspace.open(`${ATOM_URI}/settings`)
            },
            'viblo:settings'() {
                atom.workspace.open(`${ATOM_URI}/settings`)
            }
        })
    },

    createVibloPluginView(params) {
        if (viewInstance === null) {
            params.tokenManager = new TokenManager(params.tokenManager)
            viewInstance = new VibloView(params)
        }

        return viewInstance
    }
}
