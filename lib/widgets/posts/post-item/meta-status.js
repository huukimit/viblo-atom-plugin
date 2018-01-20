/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import {humanizeTime} from '../../../helpers'

export default class Meta {
    constructor ({post}) {
        this.post = post
        etch.initialize(this)
    }

    render () {
        return !this.post.is_draft ?
            (
                <div className="post-meta space-between">
                    <div className="meta-status">
                        <span className="meta-status__item">
                            <i className="fa fa-eye"></i>
                            {this.post.views_count || 0}
                        </span>
                        <span className="meta-status__item">
                            <i className="fa fa-paperclip"></i>
                            {this.post.clips_count || 0}
                        </span>
                        <span className="meta-status__item">
                            <i className="fa fa-comments"></i>
                            {this.post.comments_count || 0}
                        </span>
                    </div>
                    { this.post.points !== undefined
                        ? (
                            <div className="points">
                                <div className="carets">
                                    <i className="fa fa-caret-up"></i>
                                    <i className="fa fa-caret-down"></i>
                                </div>
                                <span className="point-score">
                                    {this.post.points}
                                </span>
                            </div>
                        ) : null
                    }
                </div>
            )
            :
            (
                <div className="meta-status">
                    <span className="text-muted">
                        Last edit: {humanizeTime(this.post.updated_at)}
                    </span>
                </div>
            )
    }

    update () {
        //
    }
}
