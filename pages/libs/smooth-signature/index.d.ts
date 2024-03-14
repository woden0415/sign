interface IOptions {
  width?: number;
  height?: number;
  color?: string;
  bgColor?: string;
  scale?: number;
  openSmooth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  minSpeed?: number;
  maxWidthDiffRate?: number;
  maxHistoryLength?: number;
  onStart?: (event: any) => void;
  onEnd?: (event: any) => void;
}
interface IPoint {
  x: number;
  y: number;
  t: number;
  speed?: number;
  distance?: number;
  lineWidth?: number;
}
interface IRadianData {
  val: number;
  pos: -1 | 1;
}
declare class SmoothSignature {
  constructor(canvas: HTMLCanvasElement, options: IOptions);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  scale: number;
  color: string;
  bgColor: string;
  canDraw: boolean;
  openSmooth: boolean;
  minWidth: number;
  maxWidth: number;
  minSpeed: number;
  maxWidthDiffRate: number;
  points: IPoint[];
  canAddHistory: boolean;
  historyList: string[];
  maxHistoryLength: number;
  onStart: any;
  onEnd: any;
  init(canvas: HTMLCanvasElement, options?: IOptions): void;
  addListener: () => void;
  removeListener: () => void;
  onDrawStart: (e: any) => void;
  onDrawMove: (e: any) => void;
  onDraw: (prePoint: any, point: any) => void;
  onDrawEnd: (e: any) => void;
  getLineWidth: (speed: number) => number;
  getRadianData: (x1: number, y1: number, x2: number, y2: number) => IRadianData;
  getRadianPoints: (radianData: IRadianData, x: number, y: number, halfLineWidth: number) => {
      x: number;
      y: number;
  }[];
  initPoint: (event: any) => void;
  drawSmoothLine: (prePoint: any, point: any) => void;
  drawNoSmoothLine: (prePoint: any, point: any) => void;
  drawCurveLine: (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, lineWidth: number) => void;
  drawTrapezoid: (point1: any, point2: any, point3: any, point4: any) => void;
  drawBgColor: () => void;
  drawByImageUrl: (url: string) => void;
  addHistory: () => void;
  clear: () => void;
  undo: () => void;
  toDataURL: (type?: string, quality?: number) => string;
  getPNG: () => string;
  getJPG: (quality?: number) => string;
  isEmpty: () => boolean;
  getRotateCanvas: (degree?: number) => HTMLCanvasElement;
}
export default SmoothSignature;
