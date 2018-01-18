/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Badge from '../../widgets/badge' // eslint-disable-line no-unused-vars
import Loading from '../../widgets/loading' // eslint-disable-line no-unused-vars

export default class DraftPostSection {
    constructor () {
        etch.initialize(this)
    }

    render () {
        return (
            <section ref="draftSection" className="sub-section draft-posts">
                <h3
                    ref="draftPostsHeader"
                    className="sub-section-heading icon icon-lock"
                >
                    Draft Posts <Badge ref="draftCount"/>
                </h3>
                <div ref="draftPosts" className="container posts-container">
                    <Loading/>
                </div>
            </section>
        )
    }

    update () {
        //
    }
}
