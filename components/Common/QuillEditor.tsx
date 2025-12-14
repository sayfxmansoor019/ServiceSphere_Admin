import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TQuillEditorProps = {
  index: any;
  input: any;
  onChange: (data: any, index: any) => void;
};

const QuillEditor = ({ index, input, onChange }: TQuillEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "link",
  ];

  return (
    <div className="quill-editor" style={{ height: 300 }}>
      <ReactQuill
        value={input}
        onChange={(content) => onChange(content, index)}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Enter text here"
      />
    </div>
  );
};

export default QuillEditor;
