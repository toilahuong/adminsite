import axios from "axios";
import '../assets/scss/login.scss';
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { SERVER, SITE_NAME } from "../config";
import validateMsg from "../validateMsg";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slices/user";
import Loading from "./loading/Loading";
const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, () => validateMsg("Email", "min"))
      .max(50, () => validateMsg("Email", "max"))
      .required(() => validateMsg("Email", "required")),
    password: Yup.string()
      .min(6, () => validateMsg("Mật khẩu", "min"))
      .max(50, () => validateMsg("Mật khẩu", "max"))
      .required(() => validateMsg("Mật khẩu", "required")),
});
export default function Login() {
    const [initialValues,setInitialValues] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    const settings = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    useEffect(() => {
        document.title = `Đăng nhập - ${SITE_NAME}`;
    },[])
    useEffect(() => {
        (async () => {
            try {
                const csrf = await axios.get(`${SERVER}/form`, {withCredentials: true})
                let data = {
                    email: '',
                    password: '', 
                    _csrf: csrf.data.csrfToken
                }
                return setInitialValues(data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);
    return initialValues ?
    (
        <Container>
            <div className="form-login hide-loading">
                <h1> Đăng Nhập </h1>
                <div className="social-login">

                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        try {
                            
                            await axios.post(`${SERVER}/user/login-admin`, values,{ withCredentials: true });
                            toast.success("Đăng nhập thành công",settings);
                            dispatch(getUser())
                            setTimeout(() => {
                                history.push('/');
                            },2000)
                            
                        } catch (error) {
                            if(error.response.data.errors) {
                                error.response.data.errors.forEach((elm) => {
                                    toast.error(elm.msg,settings);
                                })
                            } else {
                                toast.error("Đã xảy ra lỗi, vui lòng thử lại",settings);
                            }
                        }
                    }}
                >   
                    {
                        props => (
                            <Form>
                                <FastField type="hidden" name="_csrf" value={props.values._csrf}/>
                                <div className="form-group">
                                    <FastField className="form-control" type="email" name="email" placeholder="Tên đăng nhập hoặc email"/>
                                    <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                                </div>
                                <div className="form-group">
                                    <FastField className="form-control" type="password" name="password" placeholder="********" autoComplete="off"/>
                                    <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                                </div>
                                <Button type="submit">Đăng nhập</Button>
                            </Form>
                        )
                    }
                    
                </Formik>
                <ToastContainer />
            </div>
        </Container>
    ) : <Loading />
}