import React from "react";
import parse from "html-react-parser";

interface HtmlRendererProps {
  html: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ html }) => {
  return <>{parse(html)}</>;
};

export default HtmlRenderer;
