/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import {humanizeTime, goTo} from '../../../helpers'
import {ATOM_URI} from '../../../config'
import {Emitter} from 'atom'

export default class Header {
    constructor ({post}) {
        this.post = post
        this.emitter = new Emitter()
        etch.initialize(this)
    }

    openPostViewPanel () {
        return atom.workspace.open(`${ATOM_URI}/p/${this.post.hash_id}`)
    }

    render () {
        return (
            <div className="body">
                {
                    !this.post.is_draft
                        ? <div className="post-meta">
                            <a
                                className="post-meta__link"
                                onClick={() => goTo(`/u/${this.post.user.data.username}`)}
                            >
                                {this.post.user.data.name}
                            </a>
                            <div className="text-muted">
                                {humanizeTime(this.post.published_at)}
                            </div>
                        </div> : null
                }
                <h4>
                    <a
                        className="post-title"
                        onClick={() => this.openPostViewPanel()}
                    >
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
