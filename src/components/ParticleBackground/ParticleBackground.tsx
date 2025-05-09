import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ParticleBackground.less';

// 定义粒子接口
interface IParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

// 定义鼠标位置接口
interface IMousePosition {
  x: number;
  y: number;
}

// 定义主题颜色类型
type ThemeColors = {
  particle: string;
  connection: string;
};

// 定义配置参数接口
interface ParticleConfig {
  maxDistance: number;
  particleDensity: number;
  mouseInfluenceRadius: number;
  mouseInfluenceStrength: number;
  particleSizeRange: [number, number];
  particleSpeedRange: [number, number];
  particleOpacityRange: [number, number];
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 使用useMemo缓存配置参数，根据设备类型调整
  const config = useMemo<ParticleConfig>(
    () => ({
      maxDistance: isMobile ? 80 : 100,
      particleDensity: isMobile ? 15000 : 10000, // 增加移动端粒子密度
      mouseInfluenceRadius: isMobile ? 70 : 100,
      mouseInfluenceStrength: isMobile ? 0.15 : 0.2,
      particleSizeRange: isMobile ? [0.5, 2.0] : [0.5, 2.5], // 增加移动端粒子大小
      particleSpeedRange: isMobile ? [-0.08, 0.08] : [-0.1, 0.1], // 增加移动端粒子速度
      particleOpacityRange: isMobile ? [0.3, 0.8] : [0.2, 0.7], // 增加移动端粒子不透明度
    }),
    [isMobile]
  );

  // 使用useMemo缓存主题颜色
  const themeColors = useMemo<ThemeColors>(() => {
    if (theme === 'dark') {
      return {
        particle: 'rgba(97, 218, 251, ',
        connection: 'rgba(97, 218, 251, ',
      };
    } else {
      return {
        particle: 'rgba(0, 112, 243, ',
        connection: 'rgba(0, 112, 243, ',
      };
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: IParticle[] = [];
    let animationFrameId: number;
    let mouse: IMousePosition = { x: 0, y: 0 };
    let isMouseMoving = false;
    let mouseTimer: number | null = null;
    let lastFrameTime = 0;
    
    // 设置帧率限制，移动设备使用更合理的帧率
    const targetFPS = isMobile ? 40 : 60; // 提高移动端帧率，确保流畅性
    const frameInterval = 1000 / targetFPS;

    // 设置画布大小
    const resizeCanvas = (): void => {
      // 使用设备像素比来优化高分辨率屏幕
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // 设置CSS尺寸
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // 调整上下文比例
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    // 粒子类
    class Particle implements IParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalX: number;
      originalY: number;

      constructor(
        x: number,
        y: number,
        size: number,
        speedX: number,
        speedY: number,
        color: string
      ) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
      }

      // 更新粒子位置
      update(): void {
        // 如果鼠标移动，应用鼠标影响
        if (isMouseMoving) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.mouseInfluenceRadius) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * config.mouseInfluenceStrength;
            this.y -= Math.sin(angle) * config.mouseInfluenceStrength;
          }
        } else {
          // 缓慢恢复到原始位置
          this.x += (this.originalX - this.x) * 0.02;
          this.y += (this.originalY - this.y) * 0.02;
        }

        // 正常移动
        this.originalX += this.speedX;
        this.originalY += this.speedY;
        if (!canvas) return;

        // 边界检测
        if (this.originalX > canvas.width) {
          this.originalX = 0;
          this.x = 0;
        } else if (this.originalX < 0) {
          this.originalX = canvas.width;
          this.x = canvas.width;
        }

        if (this.originalY > canvas.height) {
          this.originalY = 0;
          this.y = 0;
        } else if (this.originalY < 0) {
          this.originalY = canvas.height;
          this.y = canvas.height;
        }
      }

      // 绘制粒子
      draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // 初始化粒子
    const initParticles = (): void => {
      particles = [];
      const particleCount = Math.floor(
        (window.innerWidth * window.innerHeight) / config.particleDensity
      );

      // 限制最大粒子数量，防止在大屏幕上过多
      const maxParticles = isMobile ? 70 : 150; // 增加移动端最小粒子数量
      const minParticles = isMobile ? 30 : 50;  // 确保最小粒子数量
      const actualCount = Math.max(
        minParticles, 
        Math.min(particleCount, maxParticles)
      );

      for (let i = 0; i < actualCount; i++) {
        const [minSize, maxSize] = config.particleSizeRange;
        const size = Math.random() * (maxSize - minSize) + minSize;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        const [minSpeed, maxSpeed] = config.particleSpeedRange;
        const speedX = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        const speedY = Math.random() * (maxSpeed - minSpeed) + minSpeed;

        const [minOpacity, maxOpacity] = config.particleOpacityRange;
        const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;

        // 根据主题设置颜色
        const color = `${themeColors.particle}${opacity})`;

        particles.push(new Particle(x, y, size, speedX, speedY, color));
      }
    };

    // 连接粒子 - 使用四叉树或网格优化
    const connectParticles = (): void => {
      // 移动设备上减少连接线的绘制，但不要完全消除
      if (isMobile && particles.length > 30) {
        // 只绘制部分粒子之间的连接，但保持足够的可见性
        const sampleRate = 0.8; // 提高采样率，增加80%的粒子
        const sampledParticles = particles.filter(() => Math.random() < sampleRate);
        drawConnections(sampledParticles);
      } else {
        drawConnections(particles);
      }
    };
    
    // 抽取连接绘制逻辑为单独函数
    const drawConnections = (particleArray: IParticle[]): void => {
      const { maxDistance } = config;

      // 创建网格以优化粒子连接检测
      const gridSize = maxDistance;
      const grid: Record<string, IParticle[]> = {};

      // 将粒子放入网格
      for (const particle of particleArray) {
        const gridX = Math.floor(particle.x / gridSize);
        const gridY = Math.floor(particle.y / gridSize);
        const key = `${gridX},${gridY}`;

        if (!grid[key]) {
          grid[key] = [];
        }

        grid[key].push(particle);
      }

      // 检查相邻网格中的粒子
      for (const particle of particleArray) {
        const gridX = Math.floor(particle.x / gridSize);
        const gridY = Math.floor(particle.y / gridSize);

        // 检查当前网格和相邻网格
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const checkKey = `${gridX + i},${gridY + j}`;
            const cellParticles = grid[checkKey];

            if (!cellParticles) continue;

            for (const otherParticle of cellParticles) {
              // 避免重复连接
              if (particle === otherParticle) continue;

              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;

                // 增加移动端线条的不透明度
                const opacityMultiplier = isMobile ? 0.25 : 0.2;
                
                // 根据主题设置线条颜色
                ctx.strokeStyle = `${themeColors.connection}${opacity * opacityMultiplier})`;
                ctx.lineWidth = isMobile ? 0.4 : 0.5; // 增加移动端线条宽度
                
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    // 动画循环 - 使用requestAnimationFrame节流
    const animate = (timestamp: number = 0): void => {
      const deltaTime = timestamp - lastFrameTime;

      if (deltaTime >= frameInterval) {
        lastFrameTime = timestamp - (deltaTime % frameInterval);

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (const particle of particles) {
          particle.update();
          particle.draw(ctx);
        }

        connectParticles();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // 处理鼠标和触摸事件
    const handlePointerMove = (e: MouseEvent | TouchEvent): void => {
      if ('touches' in e) {
        // 触摸事件
        if (e.touches.length > 0) {
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
        }
      } else {
        // 鼠标事件
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      isMouseMoving = true;

      // 清除之前的定时器
      if (mouseTimer !== null) {
        window.clearTimeout(mouseTimer);
      }

      // 设置新的定时器，鼠标停止移动后恢复粒子
      mouseTimer = window.setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    // 初始化
    resizeCanvas();
    animate();

    // 事件监听 - 添加节流
    let resizeTimeout: number | null = null;
    const handleResize = (): void => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchstart', handlePointerMove);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);

      if (mouseTimer !== null) {
        window.clearTimeout(mouseTimer);
      }

      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout);
      }

      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, themeColors, config, isMobile]);

  return <canvas ref={canvasRef} className='particle-background' />;
};

export default ParticleBackground;
