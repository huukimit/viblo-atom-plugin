/** @babel */
import VibloMarkdownPreviewPanel from './index'

const isVibloPreviewPanel = (panel) => {
    return panel instanceof VibloMarkdownPreviewPanel
}

const openMarkdownPreviewForEditor = (editor) => {
    const uri = `viblo-preview://editor/${editor.id}`
    const previousActivePane = atom.workspace.getActivePane()
    const options = {
        searchAllPanes: true,
        split: 'right'
    }

    atom.workspace.open(uri, options).then((previewPanel) => {
        if (isVibloPreviewPanel(previewPanel)) {
            previousActivePane.activate()
        }
    })
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
