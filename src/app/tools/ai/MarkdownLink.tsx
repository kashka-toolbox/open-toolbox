import Link from "next/link";

const MarkdownLink = ({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={props.href as string}
      className="underline underline-offset-3"
    >
      {children}
    </Link>
  );
};

export default MarkdownLink;  