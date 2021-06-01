import React from "react"
import { Nav } from "react-bootstrap"
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from "react-router-dom"
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
    return (
        <> 
            <h1> Bài viết </h1>
            
                <Nav variant="pills" defaultActiveKey={defaultKey()}>
                    <Nav.Item>
                        <Nav.Link eventKey="/" as={Link} to="/posts">Tất cả bài viết</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="create" as={Link} to="/posts/create">Tạo bài viết</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="category" as={Link} to="/category/product">Chuyên mục</Nav.Link>
                    </Nav.Item>
                </Nav>
            <Router basename="/posts">
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