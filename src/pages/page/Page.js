import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
const ShowPage = React.lazy(() => import('./ShowPage'))
const CreatePage = React.lazy(() => import('./CreatePage'))
const EditPage = React.lazy(() => import('./EditPage'))

export default function Page() {
    return (
        <>
            <h1> Trang </h1>
            <div className="router-content">
                <Router basename="/pages">
                    <Switch>

                        <Route path="/create" component={CreatePage} />
                        <Route path="/:id/edit" component={EditPage} />
                        <Route exact path="/" component={ShowPage} />
                    </Switch>
                </Router>

            </div>
        </>
    )
}