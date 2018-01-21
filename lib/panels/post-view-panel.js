/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Loading from '../widgets/loading' // eslint-disable-line no-unused-vars
import PostView from '../widgets/posts/view' // eslint-disable-line no-unused-vars
import {getPost} from 'viblo-sdk/api/posts'

export default class PostViewPanel {
    constructor ({hash_id}) {
        this.loaded = false
        this.hash_id = hash_id

        this.fetchPost()
        etch.initialize(this)
    }

    async fetchPost () {
        const response = await getPost(this.hash_id)
        this.post = response.post.data
        this.loaded = true
        etch.update(this)
    }

    render () {
        return (
            <section className="section post-view-panel">
                <div className="section-container">
                    {
                        !this.loaded ? <Loading/> : <PostView post={this.post}/>
                    }
                </div>
            </section>
        )
    }

    update () {
        etch.update(this)
    }
}
