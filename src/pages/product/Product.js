import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
const ShowProduct = React.lazy(() => import('./ShowProduct'))
const CreateProduct = React.lazy(() => import('./CreateProduct'))
const EditProduct = React.lazy(() => import('./EditProduct'))
export default function Product() {
    return (
        <>
            <h1> Sản phẩm </h1>
            <div className="router-content">
                <Router basename="/products">
                    <Switch>

                        <Route path="/create" component={CreateProduct} />
                        <Route path="/:id/edit" component={EditProduct} />
                        <Route exact path="/" component={ShowProduct} />
                    </Switch>
                </Router>
            </div>
        </>
    )
}