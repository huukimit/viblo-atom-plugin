/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Badge from '../../widgets/badge' // eslint-disable-line no-unused-vars
import {TextEditorView} from 'atom-space-pen-views' // eslint-disable-line no-unused-vars
import PublishPostsSection from './publish-posts-section' // eslint-disable-line no-unused-vars
import DraftPostsSection from './draft-posts-section' // eslint-disable-line no-unused-vars
import PublicDraftSection from './public-draft-section' // eslint-disable-line no-unused-vars

export default class PublishPostsPanel {
    constructor () {
        etch.initialize(this)
    }

    render () {
        return (
            <div className="panels-item posts-panel">
                <section className="section">
                    <div className="section-container">
                        <div className="section-heading icon icon-pencil">
                            My posts <Badge ref="totalPosts"/>
                        </div>
                        <div ref="emptySection" className="hidden">
                            <h3>You post list is empty</h3>
                            <button ref="createButton" className="btn icon icon-pencil">
                                Create Post
                            </button>
                        </div>
                        <div ref="searchSection" className="editor-container">
                            <TextEditorView
                                ref="filterEditor"
                                mini={true}
                                placeholderText="Filter posts by title"
                            />
                        </div>

                        <div ref="updateErrors"></div>

                        <PublishPostsSection posts={[]}/>
                        <DraftPostsSection posts={[]}/>
                        <PublicDraftSection posts={[]}/>
                    </div>
                </section>
            </div>
        )
    }

    update () {
        //
    }

    show () {
        this.element.style.display = 'block'
    }

    focus () {
        //
    }
}
