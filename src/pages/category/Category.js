import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import '../../assets/scss/category.scss';
const ShowCategory = React.lazy(() => import("./ShowCategory"));
const EditCategory = React.lazy(() => import("./EditCategory"));
export default function Category() {
    return (
        <> 
            <h1 className="mb-5"> Chuyên mục </h1>
            <Router basename="/category">
                <Switch>
                    <Route path="/:id/edit" component={EditCategory}/>
                    <Route path="/:categoryType" component={ShowCategory}/>
                    <Route exact path="/" render={() => <Redirect to="/post"/>}/>
                </Switch>
            </Router>
        </>
    )
}