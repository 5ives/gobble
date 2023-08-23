import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

// ref: https://beta.reactjs.org/reference/react-dom/server/renderToString#removing-rendertostring-from-the-client-code
const reactElementToString = (reactElement: React.ReactElement): string => {
    const div = document.createElement('div');
    const root = createRoot(div);
    flushSync(() => root.render(reactElement));
    return div.innerHTML;
};

export default reactElementToString;
