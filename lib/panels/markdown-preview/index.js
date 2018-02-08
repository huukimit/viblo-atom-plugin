/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Markdown from '../../widgets/markdown'
import _find from 'lodash/find'

const TYPE_PREVIEW_FROM_EDITOR = 'editor'
const TYPE_PREVIEW_FROM_FILE = 'file'

export default class VibloMarkdownPreviewPanel {
    constructor ({ type, key }) {
        this.type = type
        this.key = key
        this.contents = this.fetchContents()
        etch.initialize(this)
    }

    fetchContents () {
        switch (this.type) {
            case TYPE_PREVIEW_FROM_EDITOR:
                return this.getEditorContents(this.key)
            case TYPE_PREVIEW_FROM_FILE:
                return this.getFileContents(this.key)
            default:
                return
        }
    }

    getEditorContents (editorId) {
        const editor = _find(atom.workspace.getTextEditors(), (editor) => editor.id === editorId)
        return editor ? editor.getText() : null
    }

    getFileContents (path) {
        return `Get file contents from path: ${path}`
    }

    render () {
        return (
            <section className="viblo-atom-plugin settings-view pane-item">
                <div className="panels">
                    <section className="section post-view markdown-preview">
                        <div className="section-body">
                            <Markdown contents={this.contents}/>
                        </div>
                    </section>
                </div>
            </section>
        )
    }

    update () {
        etch.update(this)
    }

    getTitle () {
        return 'Viblo Preview'
    }
}
