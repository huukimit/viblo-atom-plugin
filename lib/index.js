/** @babel */
import App from './app'
import showPanel from './show-panel'
import { openWorkspace, openPostEditor } from './helpers'
import { TextEditor, Emitter } from 'atom'
import VibloEditor from './editor'
import PostManager from './editor/post-manager'
import { openPublishForm } from './editor/publish-form/loader'
import { ATOM_URI, REGEX_POST_EDITOR, REGEX_PREVIEW_URI } from './config'
import togglePreview from './panels/markdown-preview/toggle'
import VibloMarkdownPreviewPanel from './panels/markdown-preview'

let appInstance = null
window.PostManager = new PostManager()

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
        // Add post editor open:
        this.addPostEditorOpener()
        // Register command that toggles this view
        this.registerCommands()
    },

    addWorkspaceOpener () {
        // Current URI is matched with correct Panel by Opener:
        atom.workspace.addOpener((uri) => {
            // Is Post editor request:
            if (REGEX_POST_EDITOR.exec(uri)) {
                return // Post Editor Opener will handle it.
            }

            const match = REGEX_PREVIEW_URI.exec(uri)
            if (match) {
                return new VibloMarkdownPreviewPanel({
                    type: match[1],
                    key: match[2]
                })
            }

            // Open viblo panel
            if (uri.startsWith(ATOM_URI)) {
                appInstance = this.createAppInstance({uri})
            }

            showPanel(appInstance, uri)

            return appInstance
        })
    },

    addPostEditorOpener () {
        // elsint-disable-next-line no-undef
        atom.workspace.observeTextEditors((editor) => {
            if (editor) {
                const match = REGEX_POST_EDITOR.exec(editor.getPath())
                const hashId = match ? match[2] : null
                // Always exists hashId in VibloEditor
                if (hashId) {
                    return new VibloEditor({ editor, hashId, emptyOnNew: false })
                }
            }
        })
    },

    registerCommands () {
        // eslint-disable-next-line no-undef
        atom.commands.add('atom-workspace', {
            'viblo:about': () => openWorkspace('/about'),
            'viblo:open': () => openWorkspace('/publish-posts'),
            'viblo:settings': () => openWorkspace('/settings'),
            'viblo:create-post': () => openPostEditor()
        })
        atom.commands.add('atom-text-editor[data-grammar*="gfm"]', {
            'viblo:save-post': async () => await openPublishForm(atom.workspace.getActiveTextEditor().id),
            'viblo:toggle-preview': () => togglePreview()
        })
    }
}
