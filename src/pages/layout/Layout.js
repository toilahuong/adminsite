import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
const Dashboard = React.lazy(() => import('../dashboard/Dashboard'))
const Post = React.lazy(() => import('../post/Post'))
const Page = React.lazy(() => import('../page/Page'))
const Category = React.lazy(() => import('../category/Category'))
const Upload = React.lazy(() => import('../upload/Upload'))

export default function Layout() {
    const [isToggle, setToggle] = useState(false);
    const handleClick = () => setToggle(!isToggle);
    return (
        <div className={"wrapper" + (isToggle ? " sidebar-toggle" : "")}>
            <Header toggle={handleClick}/>
            <div className="wrapper-sidebar">
                <Sidebar toggle={handleClick}/>
            </div>
            <div className="wrapper-content">
                <Container>
                    <Switch>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/posts" component={Post}/>
                        <Route path="/pages" component={Page}/>
                        <Route path="/category" component={Category}/>
                        <Route path="/upload" component={Upload}/>
                        <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
                    </Switch>
                </Container>
                
            </div>
            
        </div>
    )
}