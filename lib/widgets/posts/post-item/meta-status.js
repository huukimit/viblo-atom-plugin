/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class Meta {
    constructor ({post}) {
        this.post = post
        etch.initialize(this)
    }

    render () {
        return (
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
        )
    }

    update () {
        //
    }
}
