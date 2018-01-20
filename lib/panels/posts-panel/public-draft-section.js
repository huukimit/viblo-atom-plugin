/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Badge from '../../widgets/badge' // eslint-disable-line no-unused-vars
import Loading from '../../widgets/loading' // eslint-disable-line no-unused-vars

export default class PublicDraftSection {
    constructor ({posts}) {
        this.posts = posts || []
        etch.initialize(this)
    }

    render () {
        return (
            <section
                ref="draftPublicSection"
                className="sub-section draft-public-posts"
            >
                <h3
                    ref="draftPublicPostsHeader"
                    className="sub-section-heading icon viblo-unlocked"
                >
                    Public Draft Posts <Badge ref="draftPublicCount"/>
                </h3>
                <div ref="draftPublicPosts" className="container posts-container">
                    <Loading/>
                </div>
            </section>
        )
    }

    update () {
        //
    }
}
