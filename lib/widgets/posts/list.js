/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import categories from '../../config/categories'
import PostHeader from './post-item/header' // eslint-disable-line no-unused-vars
import PostMetaStatus from './post-item/meta-status' // eslint-disable-line no-unused-vars

export default class PostList {
    constructor ({posts = []}) {
        this.posts = this.normalize(posts)
        etch.initialize(this)
    }

    normalize (posts = []) {
        return _map(posts, (post) => {
            post.category = categories[post.category_id] || null
            return post
        })
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
