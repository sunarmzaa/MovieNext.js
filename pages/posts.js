import React, { Component } from 'react'
import { getPosts } from '../actions'

class Posts extends Component {
    state = {}

    static async getInitialProps() {
        const posts = await getPosts()
        return { posts }
    }

    render() {
        const { posts } = this.props
        return (
            <div>
                <div className="container">
                    <h2>I am posts page</h2>
                    {/* {JSON.stringify(posts)} */}
                    <ul>
                        {posts.map(p => (

                            <li key={p.id}>
                                <span>{p.id}: {p.title}</span>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Posts;