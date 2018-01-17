/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class PanelMenuItem {
    constructor ({name, iconName}) {
        this.name = name
        this.iconName = iconName
        etch.initialize(this)
        this.element.setAttribute('data-id', name)
    }

    render () {
        return (
            <li>
                <a className={`icon ${this.iconName}`}>
                    {this.name}
                </a>
            </li>
        )
    }

    update () {
        //
    }
}
