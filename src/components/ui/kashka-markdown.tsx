import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Options } from "react-markdown";


export default function KashkaMarkdown(options?: Options) {
    return (
        <Markdown
            components={{
                h1: ({ node, ...props }) => <h1 className="header-section-1" {...props} />,
                h2: ({ node, ...props }) => <h2 className="header-section-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="header-section-3" {...props} />,
                h4: ({ node, ...props }) => <h4 className="header-section-4" {...props} />,
            }}
            remarkPlugins={[remarkGfm]}
            {...options} />
    );
}
