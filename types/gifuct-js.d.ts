declare module "gifuct-js" {
  export interface GifFrame {
    dims: { left: number; top: number; width: number; height: number };
    patch: Uint8ClampedArray;
    disposalType?: number;
  }

  export function parseGIF(source: ArrayBuffer): unknown;
  export function decompressFrames(gif: unknown, buildImagePatches: boolean): GifFrame[];
}
