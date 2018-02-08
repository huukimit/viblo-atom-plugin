/** @babel */
import VibloMarkdownPreviewPane from './index'
import _find from 'lodash/find'

const isVibloPreviewPane = (panel) => {
    return panel instanceof VibloMarkdownPreviewPane
}

const previewPaneFromURI = (uri) => {
    return _find(atom.workspace.getPaneItems(), (pane) => isVibloPreviewPane(pane) && pane.uri === uri)
}

const openMarkdownPreviewForEditor = (editor) => {
    const uri = `viblo-preview://markdown/editor/${editor.id}`
    const existsPreviewPanel = previewPaneFromURI(uri)
    const previousActivePane = atom.workspace.getActivePane()
    if (!existsPreviewPanel) {
        const options = {
            searchAllPanes: true,
            split: 'right'
        }
        atom.workspace.open(uri, options).then(() => previousActivePane.activate())
    } else {
        atom.workspace.toggle(existsPreviewPanel)
        previousActivePane.activate()
    }
}

const toggle = () => {
    if (isVibloPreviewPane(atom.workspace.getActivePaneItem())) {
        return atom.workspace.destroyActivePaneItem()
    }

    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
        return openMarkdownPreviewForEditor(editor)
    }
}

export default toggle
