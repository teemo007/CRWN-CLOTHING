declare module '*.svg?react' { // recognizing any pathways, 
    import React = require('react');
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
    // const src: string;
    // export default src;
  }