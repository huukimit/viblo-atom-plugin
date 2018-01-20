/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import {humanizeTime} from '../../../helpers'

export default class Header {
    constructor ({post}) {
        this.post = post
        etch.initialize(this)
    }

    render () {
        return (
            <div className="body">
                {
                    !this.post.is_draft
                        ? <div className="post-meta">
                            <a href="#" className="post-meta__link">
                                {this.post.user.data.name}
                            </a>
                            <div className="text-muted">
                                {humanizeTime(this.post.published_at)}
                            </div>
                        </div> : null
                }
                <h4>
                    <a href={this.post.url} className="post-title">
                        {this.post.is_draft ? <i className="fa fa-lock draft-icon"></i> : null}
                        {this.post.title}
                    </a>
                </h4>
            </div>
        )
    }

    update () {
        //
    }
}
