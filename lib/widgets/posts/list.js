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

    normalizePost (post) {
        post.hash_id = post.slug
        delete post.slug

        return post
    }

    render () {
        return (
            <div className="posts-list">
                { _map(this.posts, (post) => {
                    post = this.normalizePost(post)
                    return (
                        <div className="post-card" style="cursor: default">
                            <PostHeader post={post}/>
                            <PostMetaStatus post={post}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    update () {
        // this
    }
}
