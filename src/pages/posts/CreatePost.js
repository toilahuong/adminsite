import { Button, Card, Col, Form, Nav, Row } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { SERVER, SITE_NAME } from "../../config";
import { useEffect } from "react";
const editorConfiguration = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'highlight',
            'exportWord',
            'fontBackgroundColor',
            'fontColor',
            'code',
            'codeBlock'
        ]
    },
    language: 'vi',
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    licenseKey: '',
    simpleUpload: {
        uploadUrl: `${SERVER}/library`,
        withCredentials: true,

    }
};
export default function CreatePost() {
    useEffect(() => {
        document.title = `Tạo bài viết mới - ${SITE_NAME}`
    },[])
    useEffect(() => {
        window.removeEventListener("beforeunload", (e) => {
            e.preventDefault();
            console.log("hi")
        });
    })
    return (
        <Form className="p-3">
            <Row>
                <Col md={8}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" placeholder="Enter...." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nội dung</Form.Label>
                        <CKEditor
                            editor={ Editor }
                            config={editorConfiguration}
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={ editor => {
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { data } );
                            } }
                            onFocus={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { data } );
                            } }
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Header>
                            <Card.Title>Đăng </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-primary" size="sm">Lưu nháp</Button>
                            <Nav className="flex-column">
                                <Nav.Item>Trạng thái:</Nav.Item>
                                <Nav.Item>Hiển thị:</Nav.Item>
                                <Nav.Item>Đăng ngay lập tức:</Nav.Item>
                            </Nav>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button variant="primary" size="sm">Đăng bài</Button>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Card.Title>Chuyên mục </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Button variant="outline-primary" size="sm">Lưu nháp</Button>
                            <Nav className="flex-column">
                                <Nav.Item>Trạng thái:</Nav.Item>
                                <Nav.Item>Hiển thị:</Nav.Item>
                                <Nav.Item>Đăng ngay lập tức:</Nav.Item>
                            </Nav>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button variant="primary" size="sm">Đăng bài</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            
        </Form>
    )
}