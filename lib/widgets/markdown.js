/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import { createRenderer } from 'viblo-sdk/markdown'

export default class Markdown {
    constructor ({contents = ''}) {
        this.contents = contents
        this.md = createRenderer()
        etch.initialize(this)
        this.showContents()
    }

    showContents () {
        this.refs.contentsBody.innerHTML = this.md.render(this.contents)
    }

    render () {
        return (
            <div className="md-contents" ref="contentsBody"></div>
        )
    }

    update () {
        //
    }
}
