/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
// import md from 'viblo-sdk/markdown'

export default class Markdown {
    constructor ({contents = ''}) {
        this.contents = contents
        etch.initialize(this)
    }

    render () {
        return (
            <div className="contents">
                {this.contents}
            </div>
        )
    }

    update () {
        //
    }
}
