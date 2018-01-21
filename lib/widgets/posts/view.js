/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import PostMetaStatus from './post-item/meta-status' // eslint-disable-line no-unused-vars
import Markdown from '../markdown' // eslint-disable-line no-unused-vars

export default class PostView {
    constructor ({post}) {
        this.post = post || null
        etch.initialize(this)
    }

    render () {
        return !this.post
            ? (
                <div className="post-view">
                    <h4>Sorry, we could not found this post.</h4>
                </div>
            )
            : (
                <div className="post-view">
                    <div className="section-heading block">
                        {this.post.title}
                    </div>
                    <PostMetaStatus post={this.post} format="include-time"/>
                    <div className="section-body">
                        <Markdown contents={this.post.contents}/>
                    </div>
                </div>
            )
    }

    update () {
        etch.update(this)
    }
}
