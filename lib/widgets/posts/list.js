/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import PostHeader from './post-item/header' // eslint-disable-line no-unused-vars
import PostMetaStatus from './post-item/meta-status' // eslint-disable-line no-unused-vars

export default class PostList {
    constructor ({posts = []}) {
        this.posts = posts
        etch.initialize(this)
    }

    render () {
        return (
            <div className="posts-list">
                { _map(this.posts, (post) => (
                    <div className="post-card" style="cursor: default">
                        <PostHeader post={post}/>
                        <PostMetaStatus post={post}/>
                    </div>
                )) }
            </div>
        )
    }

    update () {
        // this
    }
}
