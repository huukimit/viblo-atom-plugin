/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import {shell} from 'electron'
import SettingsPanel from './components/panels/settings-panel'
import PanelMenuItem from './components/panel-menu-item'
import _each from 'lodash/each'
import {goTo} from './helpers'

const DEFAULT_PANEL = 'Settings'

export default class VibloView {
    constructor ({uri, activePanel, tokenManager}) {
        this.uri = uri
        this.deferredPanel = activePanel
        this.tokenManager = tokenManager
        this.panelCreateCallbacks = {}

        etch.initialize(this)
        process.nextTick(() => this.initializePanels())
    }

    render () {
        return (
            <div className='viblo-atom-plugin settings-view pane-item' tabIndex='-1'>
                <div className='config-menu' ref='sidebar'>
                    <ul className='panels-menu nav nav-pills nav-stacked' ref='panelMenu'>
                        <div className='panel-menu-separator' ref='menuSeparator'></div>
                    </ul>
                    <div className='button-area'>
                        <button
                            className='btn btn-default icon icon-link-external'
                            onClick={() => goTo('/')}
                        >
                            Go to Viblo
                        </button>
                    </div>
                </div>

                <div className='panels' tabIndex='-1' ref='panels'></div>
            </div>
        )
    }

    update () {
        //
    }

    initializePanels () {
        if (this.refs.panels.children.length > 1) {
            return
        }

        this.panelsByName = {}
        const clickHandler = (e) => {
            let target = e.target.closest('.panels-menu li, .panels-packages li')
            if (target) {
                this.showPanel(target.dataset.id)
            }
        }

        this.element.querySelector('.panels-menu').addEventListener('click', clickHandler)

        this.addCorePanel(
            'Settings',
            'icon-settings',
            () => new SettingsPanel('viblo-atom-plugin', this.tokenManager)
        )

        if (!this.deferredPanel) {
            this.showPanel(DEFAULT_PANEL)
        }
    }

    addCorePanel (name, iconName, panel) {
        const panelMenuItem = new PanelMenuItem({name, iconName})

        this.refs.menuSeparator.parentElement.insertBefore(
            panelMenuItem.element,
            this.refs.menuSeparator
        )

        this.addPanel(name, panel)
    }

    addPanel (name, panelCreateCallbacks) {
        if (!this.panelCreateCallbacks) {
            this.panelCreateCallbacks = {}
        }

        this.panelCreateCallbacks[name] = panelCreateCallbacks
        const deferredPanelName = this.deferredPanel ? this.deferredPanel.name : null
        if (name === deferredPanelName) {
            return this.showDeferredPanel()
        }
    }

    showDeferredPanel () {
        if (this.deferredPanel) {
            const {name, options} = this.deferredPanel
            this.showPanel(name, options)
        }
    }

    showPanel (name, options) {
        let panel = this.getOrCreatePanel(name, options)
        if (panel) {
            this.appendPanel(panel, options)
            this.makePanelMenuActive(name)
            this.setActivePanel(name, options)
            return this.deferredPanel = null
        }

        return this.deferredPanel = {name, options}
    }

    getOrCreatePanel (name, options) {
        let panel = this.panelsByName ? this.panelsByName[name] : null
        if (!panel) {
            let callback = this.panelCreateCallbacks ? this.panelCreateCallbacks[name] : null
            let pack = options ? options.pack : null
            if (pack && !callback) {
                callback = () => null
            }

            if (callback) {
                panel = callback()
                this.addPanelsByName(name, panel)
            }
        }

        return panel
    }

    appendPanel (panel, options) {
        _each(this.refs.panels.children, (child) => {
            child.style.display = 'none'
        })

        if (!this.refs.panels.contains(panel.element)) {
            this.refs.panels.appendChild(panel.element)
        }

        panel.show()
        panel.focus()
    }

    makePanelMenuActive (name) {
        const previouslyActivePanel = this.refs.sidebar.querySelector('.active')
        if (previouslyActivePanel) {
            previouslyActivePanel.classList.remove('active')
        }

        const newActivePanel = this.refs.sidebar.querySelector(`[data-id="${name}"`)
        if (newActivePanel) {
            newActivePanel.classList.add('active')
        }
    }

    setActivePanel (name, options) {
        this.activePanel = {name, options}
    }

    addPanelsByName (name, panel) {
        if (this.panelsByName === null) {
            this.panelsByName = {}
        }

        this.panelsByName[name] = panel
        if (this.panelCreateCallbacks !== null) {
            delete this.panelCreateCallbacks[name]
        }
    }

    getTitle () {
        return 'Viblo'
    }

    serialize () {
        return {
            deserializer: 'VibloView',
            uri: this.uri,
            activePanel: this.deferredPanel,
            tokenManager: this.tokenManager
        }
    }
}
