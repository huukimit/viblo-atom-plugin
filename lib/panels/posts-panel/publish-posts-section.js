/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Badge from '../../widgets/badge' // eslint-disable-line no-unused-vars
import Loading from '../../widgets/loading' // eslint-disable-line no-unused-vars

export default class PublishPostsSection {
    constructor ({posts}) {
        this.posts = posts || []
        etch.initialize(this)
    }

    render () {
        return (
            <section ref="publicSection" className="sub-section public-posts">
                <h3 ref="publicPostsHeader" className="sub-section-heading icon icon-eye">
                    Public posts <Badge ref="publicCount"/>
                </h3>
                <div ref="publicPosts" className="container posts-container">
                    <Loading/>
                </div>
            </section>
        )
    }

    update () {
        //
    }
}
