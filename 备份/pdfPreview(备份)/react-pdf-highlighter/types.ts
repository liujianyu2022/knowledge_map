export interface LTWH {     //light width height   设置标注区域的位置和大小
  left: number;   // left 和 top 控制位置
  top: number;
  width: number;    // width 和 height 控制 标注的大小
  height: number;
}

export interface LTWHP extends LTWH {
  pageNumber?: number;
}

export interface Scaled {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  width: number;
  height: number;

  pageNumber?: number;
}

export interface Position {
  boundingRect: LTWHP;
  rects: Array<LTWHP>;
  pageNumber: number;
}

export interface ScaledPosition {
  boundingRect: Scaled;
  rects: Array<Scaled>;
  pageNumber: number;
  usePdfCoordinates?: boolean;
}

export interface Content {
  text?: string;
  image?: string;
}

export interface HighlightContent {
  content: Content;
}

export interface Comment {
  text: string;
}

export interface HighlightComment {
  comment: Comment;
}

export interface NewHighlight extends HighlightContent, HighlightComment {
  position: ScaledPosition;
}

export interface IHighlight extends NewHighlight {
  id: string;
  isEdit?: boolean
}

export interface ViewportHighlight extends HighlightContent, HighlightComment {
  position: Position;
}

export interface Viewport {
  convertToPdfPoint: (x: number, y: number) => Array<number>;
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>;
  width: number;
  height: number;
}

export interface Page {
  node: HTMLElement;
  number: number;
}
