import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
const ShowPost = React.lazy(() => import('./ShowPost'))
const CreatePost = React.lazy(() => import('./CreatePost'))
const EditPost = React.lazy(() => import('./EditPost'))

export default function Post() {
    return (
        <>
            <h1> Bài viết </h1>
            <div className="router-content">
                <Router basename="/posts">
                    <Switch>

                        <Route path="/create" component={CreatePost} />
                        <Route path="/:id/edit" component={EditPost} />
                        <Route exact path="/" component={ShowPost} />
                    </Switch>
                </Router>

            </div>
        </>
    )
}