/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Loading from '../widgets/loading' // eslint-disable-line no-unused-vars
import {getDrafts} from 'viblo-sdk/api/me'
import PostList from '../widgets/posts/list' // eslint-disable-line no-unused-vars

export default class DraftPostsPanel {
    constructor (options = {}) {
        this.posts = options.posts || []
        this.pagination = options.pagination || null
        this.loaded = false
        this.fetchPosts()
        etch.initialize(this)
    }

    async fetchPosts () {
        // eslint-disable-next-line no-undef
        const response = await getDrafts({})
        this.posts = response.data
        this.pagination = response.meta.pagination
        this.loaded = true
        etch.update(this)
    }

    render () {
        return (
            <section className="section draft-posts-panel">
                <div className="section-container">
                    <div className="block section-heading icon icon-lock">
                        Drafts
                    </div>
                    {
                        this.loaded && !this.posts.length
                            ? <div>
                                <h3>Your post list is empty</h3>
                            </div> : null
                    }
                    <div className="section-body">
                        {
                            !this.loaded ? <Loading/> : <PostList posts={this.posts}/>
                        }
                    </div>
                </div>
            </section>
        )
    }

    update () {
        //
    }
}
