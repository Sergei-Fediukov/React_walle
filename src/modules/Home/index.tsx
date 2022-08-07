import { useCallback, useEffect, useRef, useState } from 'react';

import { Canvas } from 'src/components/Canvas';
import { Sidebar } from 'src/components/Sidebar';
import { Spinner } from 'src/components/Spinner';
import { drawLayer } from 'src/helpers/drawLayer';
import { useProgressiveImage } from 'src/hooks/useProgressiveImage';

import styles from './styles.module.scss';

export class Animation {
  constructor(
    public rate: number,
    public LastTime?: any,
    public update?: any,
    public render?: any,
    public run?: any,
    public get_frame?: () => { x: number; y: number },
  ) {
    this.LastTime = 0;
    this.rate = rate;
    this.update = () => {};
    this.render = () => {};
    this.run = function fn(time: number) {
      if (time - this.LastTime > this.rate) {
        this.LastTime = time;
        this.update();
      }
      this.render();
    };
  }
}

export const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bg = useProgressiveImage(
    'https://res.cloudinary.com/dg6nys3ff/image/upload/v1658006916/react_walle/bg_xtapyk.jpg',
  );
  const art = useProgressiveImage(
    'https://res.cloudinary.com/dg6nys3ff/image/upload/v1659868664/react_walle/art_s8h4v9.png',
  );
  const art2 = useProgressiveImage(
    'https://res.cloudinary.com/dg6nys3ff/image/upload/v1659806976/react_walle/art2_ovm4jg.png',
  );
  const buttonEarthBg = useProgressiveImage(
    'https://res.cloudinary.com/dg6nys3ff/image/upload/v1659819962/react_walle/walle_on_earth_gw0ehw.jpg',
  );
  const buttonSpaceBg = useProgressiveImage(
    'https://res.cloudinary.com/dg6nys3ff/image/upload/v1659821762/react_walle/walle_in_space_qmg8kh.jpg',
  );

  const [state, setState] = useState(null);
  const handleCreateSplotch = useCallback(() => {
    if (canvasRef.current && state) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const image = new Image();
      image.src = state;

      const { layer: layer1 } = drawLayer({ ctx, imageUrl: image });
      const { layer: layer2 } = drawLayer({ ctx, imageUrl: image, sx: 640, speed: 0.2, w: 1280 });
      const { layer: layer3 } = drawLayer({ ctx, imageUrl: image, sy: 640, speed: 1, w: 1280 });
      const { layer: layer4 } = drawLayer({ ctx, imageUrl: image, sy: 1280, speed: 3, w: 1920 });
      const { layer: layer5 } = drawLayer({ ctx, imageUrl: image, sy: 1920, speed: 10, w: 1920 });
      const { layer: char } = drawLayer({ ctx, imageUrl: image,  animation: 150, isChar: true });

      const animate = (time: number) => {
        layer1.run(time);
        layer2.run(time);
        layer3.run(time);
        layer4.run(time);
        char.run(time);
        if (state === art2) {
          layer1.run(time);
        }
        layer5.run(time);
        requestAnimationFrame(animate);
      };
      animate(60);
    }
  }, [state, art2]);

  const allAssetsDownloaded =
    bg && art && art2 && buttonEarthBg && buttonSpaceBg;

  useEffect(() => {
    if (!state) {
      setState(art);
    }
    handleCreateSplotch();
  }, [art, state, allAssetsDownloaded, handleCreateSplotch]);

  const handleChoose = useCallback((image) => {
    return () => setState(image);
  }, []);

  return (
    <>
      {allAssetsDownloaded ? (
        <div className={styles.home}>
          <div
            className={styles.home__bg}
            style={{ backgroundImage: `url(${bg || ''})` }}
          >
            <Sidebar>
              <div className={styles.test}>
                <div
                  className={styles.button}
                  role="presentation"
                  style={{ backgroundImage: `url(${buttonEarthBg || ''})` }}
                  onClick={handleChoose(art)}
                />
              </div>
              <div className={styles.test}>
                <div
                  className={styles.button}
                  role="presentation"
                  style={{ backgroundImage: `url(${buttonSpaceBg || ''})` }}
                  onClick={handleChoose(art2)}
                />
              </div>
            </Sidebar>
          </div>
          <Canvas ref={canvasRef} />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
