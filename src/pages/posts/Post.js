import React, { useEffect } from "react"
import { Nav } from "react-bootstrap"
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from "react-router-dom"
import { SITE_NAME } from "../../config"
const ShowPost = React.lazy(() => import('./ShowPost'))
const CreatePost = React.lazy(() => import('./CreatePost'))

export default function Post() {
    const location = useLocation();
    const path = location.pathname;
    const defaultKey = () => {
        if(/create/i.test(path)) return 'create';
        if(/category/i.test(path)) return 'category';
        return "/"
    }
    useEffect(() => {
        document.title = `Tất cả bài biết - ${SITE_NAME}`
    },[])
    return (
        <> 
            <h1> Bài viết </h1>
            <Router basename="/posts">
                <Nav variant="pills" defaultActiveKey={defaultKey()}>
                    <Nav.Item>
                        <Nav.Link eventKey="/" as={Link} to="/">Tất cả bài viết</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="create" as={Link} to="/create">Tạo bài viết</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="category" as={Link} to="/category">Chuyên mục</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="tab-content">
                    <Switch>
                        <Route exact path="/" component={ShowPost}/>
                        <Route exact path="/create" component={CreatePost}/>
                    </Switch>
                </div>
            </Router>
            
        </>
    )
}