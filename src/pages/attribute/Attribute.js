import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../assets/scss/category.scss';
const ShowAttributeParent = React.lazy(() => import('./parent/ShowAttributeParent'));
const EditAttributeParent = React.lazy(() => import('./parent/EditAttributeParent'));
const ShowAttributeChildren = React.lazy(() => import('./children/ShowAttributeChildren'));
const EditAttributeChildren = React.lazy(() => import('./children/EditAttributeChildren'));

export default function Attribute() {
    return (
        <> 
            <h1 className="mb-5"> Thuộc tính </h1>
            <Router basename="/attributes">
                <Switch>
                    <Route path="/:id/parent/edit" component={EditAttributeParent}/>
                    <Route path="/:id/children/edit" component={EditAttributeChildren}/>
                    <Route path="/:id" component={ShowAttributeChildren}/>
                    <Route exact path="/" component={ShowAttributeParent}/>
                </Switch>
            </Router>
        </>
    )
}