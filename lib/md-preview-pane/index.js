/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Markdown from '../widgets/markdown'
import _find from 'lodash/find'

const TYPE_PREVIEW_FROM_EDITOR = 'editor'
const TYPE_PREVIEW_FROM_FILE = 'file'

export default class VibloMarkdownPreviewPane {
    constructor ({ type, key, uri }) {
        this.uri = uri
        this.type = type
        this.key = key
        this.contents = null
        this.initialize()
        etch.initialize(this)
    }

    initialize () {
        switch (this.type) {
            case TYPE_PREVIEW_FROM_EDITOR:
                return this.addPreviewForEditor()
            case TYPE_PREVIEW_FROM_FILE:
                return this.addPreviewForFile()
            default:
                return
        }
    }

    addPreviewForEditor () {
        const editor = _find(atom.workspace.getTextEditors(), (editor) => editor.id === this.key)
        if (editor) {
            this.contents = editor.getText()
            editor.onDidChange(() => this.contents = editor.getText())
        }
    }

    addPreviewForFile() {
        this.contents = `Get file contents from path: ${this.key}`
    }

    render () {
        return (
            <section className="post-view markdown-preview pane-item">
                <div className="section-body">
                    <Markdown contents={this.contents}/>
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

    serialize () {
        return {
            deserializer: 'VibloMarkdownPreviewPanel',
            type: this.type,
            key: this.key,
            uri: this.uri
        }
    }
}
