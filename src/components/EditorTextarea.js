import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { SERVER } from '../config';
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
export default function EditorTextarea(props) {
    let config = {
        ...editorConfiguration
    }
    if(props.autosave) 
        config = {
            ...config,
            autosave: {
                save( editor ) {
                    return props.autosave(editor.getData());
                }
            },
        }
    return (
        <CKEditor
            editor={Editor}
            config={config}
            data={props.data}
            onReady={editor => {
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                props.action(data)
            }}
            onBlur={(event, editor) => {
                const data = editor.getData();
                props.action(data)
            }}
            onFocus={(event, editor) => {
                const data = editor.getData();
                props.action(data)
            }}
        />
    );
}