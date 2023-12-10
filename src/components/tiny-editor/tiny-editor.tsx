import { Editor, IAllProps } from '@tinymce/tinymce-react'

type TinyEditorProps = Omit<IAllProps, 'apiKey' | 'init'>

export default function TinyEditor(props: TinyEditorProps) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_KEY}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists table wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      {...props}
    />
  )
}
