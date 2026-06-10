declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css";

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?react" {
  import type React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
  export { ReactComponent };
}
