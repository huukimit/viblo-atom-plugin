/** @babel */
import VibloMarkdownPreviewPanel from './index'
import _find from 'lodash/find'

const isVibloPreviewPanel = (panel) => {
    return panel instanceof VibloMarkdownPreviewPanel
}

const previewPaneFromURI = (uri) => {
    return _find(atom.workspace.getPaneItems(), (pane) => isVibloPreviewPanel(pane) && pane.uri === uri)
}

const openMarkdownPreviewForEditor = (editor) => {
    const uri = `viblo-preview://editor/${editor.id}`
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
    if (isVibloPreviewPanel(atom.workspace.getActivePaneItem())) {
        return atom.workspace.destroyActivePaneItem()
    }

    const editor = atom.workspace.getActiveTextEditor()
    if (!editor) {
        return
    }

    return openMarkdownPreviewForEditor(editor)
}

export default toggle
