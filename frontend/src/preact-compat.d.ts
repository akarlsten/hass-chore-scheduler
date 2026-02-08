/**
 * Make Preact's VNode a valid React.ReactNode.
 *
 * styled-components and framer-motion expect React.ReactNode for children.
 * Preact's VNode isn't structurally assignable to ReactNode because ReactPortal
 * (part of the ReactNode union) requires a top-level `children` property.
 *
 * React's types expose an extensibility interface for additional ReactNode types.
 * Adding VNode there makes it a first-class member of the ReactNode union,
 * eliminating all TS2769/TS2322 errors without any runtime impact.
 */
import { VNode } from 'preact'

declare module 'react' {
  interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES {
    preactVNode: VNode<any>
  }
}
