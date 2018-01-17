/** @babel */
/** @jsx etch.dom */
import {Emitter, CompositeDisposable} from 'atom'
import {TextEditorView} from 'atom-space-pen-views'
import etch from 'etch'
import {goTo} from '../../helpers'
import Notification from '../notification'

export default class SettingsPanel {
    constructor (name, tokenManager) {
        this.name = name
        this.open = false
        this.tokenManager = tokenManager
        this.notification = new Notification()
        this.disposables = new CompositeDisposable()

        // Init component:
        etch.initialize(this)
        this.initialize()
    }

    initialize () {
        const editor = this.refs.apiToken.getModel()

        editor.setPlaceholderText(Array(this.tokenManager.getSavedToken().length).join('*'))
        this.disposables.add(editor.onDidStopChanging(() => this.onTextEditorChanged(editor.getText())))
    }

    onTextEditorChanged (text) {
        if (text) {
            return this.tokenManager.saveApiToken(text)
                .then((token) => this.notification.successWithReload(
                    'Viblo API token updated successfully!',
                    'You have to reload Atom to apply token changes'
                ))
                .catch((e) => {
                    console.error(e)
                    return this.notification.error('Viblo API token  was not updated due to an error!')
                })
        }
    }

    toggleGuide () {
        this.open = !this.open
        //etch.update(this) Throw exception?
        this.element.querySelector('#btn-toggle-guide').innerText = this.open ? 'Hide guide' : 'Show guide'
        this.element.querySelector('#guides').style.display = this.open ? 'block' : 'none'
    }

    render () {
        return (
            <section className="section settings-panel">
                <div className="section-container">
                    <div className="block section-heading icon icon-settings">
                        API Token
                    </div>
                    <div className="section-body">
                        <div className="control-group">
                            <div className="controls">
                                <div className="control-label">
                                    <div className="setting-title">
                                        To integrate with Viblo Sharing Platform you must
                                        to create new API token on Viblo Profile Page
                                    </div>
                                    <div className="setting-description">
                                        Paste your private Viblo API token here...
                                    </div>
                                </div>
                                <div className="controls">
                                    <div className="editor-container">
                                        <TextEditorView
                                            mini={true}
                                            attributes={{
                                                id: 'viblo-atom-plugin.apiToken',
                                                type: 'string'
                                            }}
                                            ref="apiToken"
                                        />
                                    </div>
                                </div>
                                <a
                                    id="btn-toggle-guide"
                                    className="btn-toggle-guide"
                                    ref="toggle-guide"
                                    onClick={() => this.toggleGuide()}
                                >
                                    {this.open ? 'Hide guide' : 'Show Guide'}
                                </a>
                                <ul
                                    id="guides"
                                    className="guides"
                                    style={`display: ${this.open ? 'block' : 'none'}`}
                                >
                                    <li>
                                        Head to <a className="text--primary" onClick={() => goTo('/settings/oauth')}>API
                                                                                                                     keys</a>
                                        &nbsp;for your Viblo account.
                                    </li>
                                    <li>
                                        Click <span className="text--primary">New API key</span> button
                                        on the <span className="text--primary">API keys</span> panel,
                                        and specify a name for your API key.
                                    </li>
                                    <li>
                                        Copy the generated API key and paste it in the below form.
                                        Note that this key is only visible once.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    update () {
        //
    }

    show () {
        this.element.style.display = 'block'
    }

    focus () {
        //
    }
}
