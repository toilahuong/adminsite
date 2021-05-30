import { Col, Form, Row } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
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
        uploadUrl: 'http://localhost:5000/api/library',
        withCredentials: true,

    }
};
export default function CreatePost() {
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
                </Col>
            </Row>
            
        </Form>
    )
}