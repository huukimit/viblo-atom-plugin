/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class Header {
    constructor ({post}) {
        this.post = post
        etch.initialize(this)
    }

    render () {
        return (
            <div className="body">
                <div className="post-meta">
                    <a href="#" className="post-meta__link">
                        {this.post.user.data.name}
                    </a>
                    <div className="text-muted">{this.post.published_at}</div>
                </div>
                <h4>
                    <a href={this.post.url} className="post-title">
                        {this.post.title}
                    </a>
                </h4>
                { this.post.category
                    ? <p>
                        Category:&nbsp;
                        <span className="inline-block highlight">
                            {this.post.category.description}
                        </span>
                    </p>
                    : null
                }
            </div>
        )
    }

    update () {
        //
    }
}
