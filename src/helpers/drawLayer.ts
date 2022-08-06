import { HEITH, WIDTH } from 'src/consts';
import { Animation } from 'src/modules/Home';

export const drawLayer = ({
  ctx,
  animation = 30,
  imageUrl,
  sx = 0,
  sy = 0,
  sw = WIDTH,
  sh = HEITH,
  dx = 0,
  dy = 0,
  dw = WIDTH,
  dh = HEITH,
  speed = 0,
  w = 640,
  isChar,
}: {
  ctx: any;
  animation?: number;
  imageUrl: CanvasImageSource;
  sx?: number;
  sy?: number;
  sw?: number;
  sh?: number;
  dx?: number;
  dy?: number;
  dw?: number;
  dh?: number;
  speed?: number;
  w?: number;
  isChar?: boolean;
}) => {
  const layer = new Animation(animation);
  let frameNum = 0;

  layer.render = () => {
    ctx.drawImage(imageUrl, sx, sy, sw, sh, dx, dy, dw, dh);
  };
  if (w) {
    layer.update = () => {
      dx += speed;
      if (dx > w) {
        dx -= w;
      }
    };
    layer.render = () => {
      ctx.drawImage(imageUrl, sx + dx, sy, sw, sh, 0, dy, dw, dh);
      if (dx > w - WIDTH) {
        ctx.drawImage(imageUrl, sx, sy, sw, sh, w - dx, 0, dw, dh);
      }
    };
  }
  if (isChar) {
    layer.update = () => {
      frameNum += 1;
      if (frameNum > 9) frameNum = 0;
    };
    layer.get_frame = () => {
      if (frameNum > 4) {
        return { x: (frameNum - 5) * 300, y: 2880 };
      }
      return { x: frameNum * 300, y: 2560 };
    };
    layer.render = () => {
      const frame = layer.get_frame?.();
      ctx.drawImage(imageUrl, frame?.x, frame?.y, 300, 320, 150, 200, 300, 320);
    };
  }
  return { layer };
};
