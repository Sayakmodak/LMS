import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ input, setInput }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false,
    }),
    );

    const handleOnChange = (content) => {
        setInput({ ...input, description: content })
    }

    return (
        <JoditEditor
            ref={editor}
            value={input.description}
            config={config}
            tabIndex={1} // tabIndex of textarea
            // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={handleOnChange}
        />
    );
};

export default Editor;