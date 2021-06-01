import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
const ShowCategory = React.lazy(() => import("./ShowCategory"));
export default function Category() {
    return (
        <> 
            <h1 className="mb-5"> Chuyên mục </h1>
            <Router basename="/category">
                <Switch>
                    <Route path="/:categoryType" component={ShowCategory}/>
                </Switch>
            </Router>
        </>
    )
}