import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
const Home = React.lazy(() => import('./Home'))

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
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </Container>
                
            </div>
            
        </div>
    )
}