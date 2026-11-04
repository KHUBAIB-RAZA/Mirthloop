import { Player, Obstacle, Collectible, Particle, FloatingText, GameStats } from '../types';
import { soundEffects } from './audio';

export interface GameEngineCallbacks {
  onScoreUpdate: (score: number) => void;
  onStarsUpdate: (stars: number) => void;
  onGameOver: (finalStats: GameStats) => void;
  onLevelUp: (level: number) => void;
}

export class ArrowDashEngine {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private callbacks: GameEngineCallbacks;

  // Viewport virtual dimension
  public readonly width = 800;
  public readonly height = 600;

  // Game entities
  public player: Player;
  public obstacles: Obstacle[] = [];
  public collectibles: Collectible[] = [];
  public particles: Particle[] = [];
  public floatingTexts: FloatingText[] = [];
  public bgStars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];

  // Input states
  public keys = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  // Direct On-Screen Touch Joystick state
  public touchInput = {
    active: false,
    originX: 0,
    originY: 0,
    knobX: 0,
    knobY: 0,
    vx: 0,
    vy: 0,
  };

  // Game loop & timing
  private lastTime: number = 0;
  private animationFrameId: number | null = null;
  public isRunning: boolean = false;
  public isPaused: boolean = false;

  // Timers & Spawn rates
  private obstacleSpawnTimer: number = 0;
  private starSpawnTimer: number = 0;
  private nextObstacleId: number = 1;
  private nextCollectibleId: number = 1;
  private nextTextId: number = 1;

  // Game progression stats
  public score: number = 0;
  public starsCollected: number = 0;
  public timeSurvived: number = 0;
  public level: number = 1;

  constructor(canvas: HTMLCanvasElement, callbacks: GameEngineCallbacks) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context from canvas');
    this.ctx = context;
    this.callbacks = callbacks;

    this.player = this.createInitialPlayer();
    this.initBackgroundStars();
  }

  private createInitialPlayer(): Player {
    return {
      x: this.width / 2,
      y: this.height - 120,
      width: 26,
      height: 30,
      speed: 340, // pixels per second
      vx: 0,
      vy: 0,
      rotation: -Math.PI / 2, // Facing upwards
    };
  }

  private initBackgroundStars() {
    this.bgStars = [];
    for (let i = 0; i < 65; i++) {
      this.bgStars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 25 + 10,
      });
    }
  }

  public updateTouch(active: boolean, originX = 0, originY = 0, knobX = 0, knobY = 0, vx = 0, vy = 0) {
    this.touchInput.active = active;
    this.touchInput.originX = originX;
    this.touchInput.originY = originY;
    this.touchInput.knobX = knobX;
    this.touchInput.knobY = knobY;
    this.touchInput.vx = vx;
    this.touchInput.vy = vy;
  }

  public reset() {
    this.player = this.createInitialPlayer();
    this.obstacles = [];
    this.collectibles = [];
    this.particles = [];
    this.floatingTexts = [];
    this.score = 0;
    this.starsCollected = 0;
    this.timeSurvived = 0;
    this.level = 1;
    this.obstacleSpawnTimer = 0;
    this.starSpawnTimer = 0;
    this.keys = { up: false, down: false, left: false, right: false };
    this.touchInput.active = false;

    // Initial stars
    this.spawnStar();
    this.spawnStar();
  }

  public start() {
    this.reset();
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    soundEffects.playStart();
    this.loop(this.lastTime);
  }

  public pause() {
    this.isPaused = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public resume() {
    if (!this.isRunning) return;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  public stop() {
    this.isRunning = false;
    this.isPaused = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = (currentTime: number) => {
    if (!this.isRunning || this.isPaused) return;

    // Delta time in seconds, clamped to avoid huge jumps on frame drops
    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.08);
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    this.timeSurvived += dt;

    // Continuous survival score (+15 points per second)
    const prevScore = Math.floor(this.score);
    this.score += dt * 15;
    if (Math.floor(this.score) !== prevScore) {
      this.callbacks.onScoreUpdate(Math.floor(this.score));
    }

    // Dynamic Level calculation based on survival time and score
    const newLevel = Math.min(10, Math.floor(this.timeSurvived / 18) + 1);
    if (newLevel !== this.level) {
      this.level = newLevel;
      this.callbacks.onLevelUp(this.level);
      this.addFloatingText(`LEVEL ${this.level}! SPEED UP`, this.width / 2, this.height / 2 - 40, '#06B6D4');
    }

    // 1. Update Player Movement (Touch Screen Vector or Keyboard)
    let dx = 0;
    let dy = 0;

    if (this.touchInput.active) {
      dx = this.touchInput.vx;
      dy = this.touchInput.vy;
    } else {
      if (this.keys.left) dx -= 1;
      if (this.keys.right) dx += 1;
      if (this.keys.up) dy -= 1;
      if (this.keys.down) dy += 1;

      // Normalize diagonal movement for keyboard
      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }
    }

    this.player.vx = dx * this.player.speed;
    this.player.vy = dy * this.player.speed;

    this.player.x += this.player.vx * dt;
    this.player.y += this.player.vy * dt;

    // Clamp inside viewport
    const padding = 16;
    this.player.x = Math.max(padding, Math.min(this.width - padding, this.player.x));
    this.player.y = Math.max(padding, Math.min(this.height - padding, this.player.y));

    // Target angle based on movement direction
    if (dx !== 0 || dy !== 0) {
      const targetAngle = Math.atan2(dy, dx);
      // Smooth rotation interpolation
      let diff = targetAngle - this.player.rotation;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.player.rotation += diff * Math.min(1, dt * 14);

      // Spawn propulsion neon particles
      if (Math.random() < 0.6) {
        this.particles.push({
          x: this.player.x - Math.cos(this.player.rotation) * 16,
          y: this.player.y - Math.sin(this.player.rotation) * 16,
          vx: -Math.cos(this.player.rotation) * 80 + (Math.random() - 0.5) * 40,
          vy: -Math.sin(this.player.rotation) * 80 + (Math.random() - 0.5) * 40,
          size: Math.random() * 3 + 2,
          color: Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6',
          alpha: 0.9,
          life: 0,
          maxLife: 0.3,
        });
      }
    }

    // 2. Update Background Stars
    for (const star of this.bgStars) {
      star.y += star.speed * dt;
      if (star.y > this.height) {
        star.y = 0;
        star.x = Math.random() * this.width;
      }
    }

    // 3. Spawn Obstacles
    const spawnInterval = Math.max(0.45, 1.4 - (this.level - 1) * 0.1);
    this.obstacleSpawnTimer += dt;
    if (this.obstacleSpawnTimer >= spawnInterval) {
      this.obstacleSpawnTimer = 0;
      this.spawnObstacle();
    }

    // 4. Update & Check Obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.x += obs.vx * dt;
      obs.y += obs.vy * dt;

      // Check collision with player
      const dist = Math.hypot(obs.x - this.player.x, obs.y - this.player.y);
      const collisionThreshold = obs.radius + 12; // player radius approx 12

      if (dist < collisionThreshold) {
        this.handlePlayerCollision();
        return;
      }

      // Remove offscreen
      if (
        obs.x < -60 ||
        obs.x > this.width + 60 ||
        obs.y < -60 ||
        obs.y > this.height + 60
      ) {
        this.obstacles.splice(i, 1);
      }
    }

    // 5. Spawn & Update Collectibles
    this.starSpawnTimer += dt;
    if (this.starSpawnTimer >= 3.0 && this.collectibles.length < 4) {
      this.starSpawnTimer = 0;
      this.spawnStar();
    }

    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const star = this.collectibles[i];
      star.rotation += dt * 2.5;
      star.pulsingAngle += dt * 5;

      // Check pickup
      const dist = Math.hypot(star.x - this.player.x, star.y - this.player.y);
      if (dist < star.radius + 16) {
        // Collect!
        this.collectibles.splice(i, 1);
        this.starsCollected += 1;
        this.score += star.points;
        this.callbacks.onScoreUpdate(Math.floor(this.score));
        this.callbacks.onStarsUpdate(this.starsCollected);
        soundEffects.playStarPickup();

        this.addFloatingText(`+${star.points}`, star.x, star.y - 10, '#FBBF24');

        // Burst particles
        for (let p = 0; p < 14; p++) {
          const angle = (p / 14) * Math.PI * 2 + Math.random() * 0.2;
          const speed = Math.random() * 120 + 60;
          this.particles.push({
            x: star.x,
            y: star.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 3 + 2,
            color: p % 2 === 0 ? '#FBBF24' : '#22D3EE',
            alpha: 1,
            life: 0,
            maxLife: 0.5,
          });
        }
      }
    }

    // 6. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life += dt;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }

    // 7. Update Floating Text
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= dt * 40;
      ft.alpha -= dt * 1.2;
      if (ft.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  private spawnObstacle() {
    const speedMultiplier = 1 + (this.level - 1) * 0.12;
    const baseSpeed = (Math.random() * 80 + 130) * speedMultiplier;

    // Random spawn edge (0: Top, 1: Left, 2: Right)
    const edge = Math.floor(Math.random() * 3);
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    if (edge === 0) {
      // Top falling down toward player
      x = Math.random() * (this.width - 80) + 40;
      y = -20;
      vx = (Math.random() - 0.5) * 120;
      vy = baseSpeed;
    } else if (edge === 1) {
      // Left across
      x = -20;
      y = Math.random() * (this.height - 150) + 40;
      vx = baseSpeed;
      vy = (Math.random() - 0.5) * 80;
    } else {
      // Right across
      x = this.width + 20;
      y = Math.random() * (this.height - 150) + 40;
      vx = -baseSpeed;
      vy = (Math.random() - 0.5) * 80;
    }

    const isLarge = Math.random() < 0.2;
    const radius = isLarge ? 22 : Math.random() * 8 + 10;
    const color = isLarge ? '#F43F5E' : (Math.random() > 0.5 ? '#EC4899' : '#A855F7');

    this.obstacles.push({
      id: this.nextObstacleId++,
      x,
      y,
      radius,
      vx,
      vy,
      color,
      type: 'orb',
    });
  }

  private spawnStar() {
    const padding = 60;
    const x = Math.random() * (this.width - padding * 2) + padding;
    const y = Math.random() * (this.height - padding * 2 - 40) + padding;

    this.collectibles.push({
      id: this.nextCollectibleId++,
      x,
      y,
      radius: 12,
      rotation: 0,
      points: 100,
      pulsingAngle: 0,
    });
  }

  private addFloatingText(text: string, x: number, y: number, color: string) {
    this.floatingTexts.push({
      id: this.nextTextId++,
      text,
      x,
      y,
      alpha: 1,
      color,
    });
  }

  private handlePlayerCollision() {
    this.isRunning = false;
    soundEffects.playGameOver();

    // Explosion particles
    for (let i = 0; i < 35; i++) {
      const angle = (i / 35) * Math.PI * 2 + Math.random() * 0.3;
      const speed = Math.random() * 220 + 80;
      this.particles.push({
        x: this.player.x,
        y: this.player.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        color: i % 3 === 0 ? '#EF4444' : i % 2 === 0 ? '#EC4899' : '#06B6D4',
        alpha: 1,
        life: 0,
        maxLife: 0.8,
      });
    }

    this.render(); // draw explosion state

    this.callbacks.onGameOver({
      score: Math.floor(this.score),
      starsCollected: this.starsCollected,
      timeSurvived: Math.floor(this.timeSurvived),
      level: this.level,
    });
  }

  // --- Rendering Functions ---

  public render() {
    const ctx = this.ctx;

    // Background Clear
    ctx.fillStyle = '#0A0D18';
    ctx.fillRect(0, 0, this.width, this.height);

    // Subtle Grid lines
    ctx.strokeStyle = 'rgba(35, 44, 79, 0.3)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Render Starfield
    for (const star of this.bgStars) {
      ctx.fillStyle = `rgba(148, 163, 184, ${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Render Collectible Stars
    for (const star of this.collectibles) {
      this.drawStar(ctx, star);
    }

    // Render Obstacles
    for (const obs of this.obstacles) {
      this.drawObstacle(ctx, obs);
    }

    // Render Particles
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Render Player (if alive)
    if (this.isRunning || this.isPaused) {
      this.drawPlayer(ctx);
    }

    // Render On-Screen Touch Joystick when finger is on the screen
    if (this.touchInput.active) {
      this.drawTouchJoystick(ctx);
    }

    // Render Floating Texts
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = ft.alpha;
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = ft.color;
      ctx.shadowColor = ft.color;
      ctx.shadowBlur = 8;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  private drawPlayer(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.player.x, this.player.y);
    ctx.rotate(this.player.rotation);

    // Glowing aura
    ctx.shadowColor = '#06B6D4';
    ctx.shadowBlur = 14;

    // Futuristic Arrow / Delta fighter body
    ctx.beginPath();
    ctx.moveTo(18, 0); // Tip
    ctx.lineTo(-14, -13); // Left wing
    ctx.lineTo(-8, 0); // Engine indent
    ctx.lineTo(-14, 13); // Right wing
    ctx.closePath();

    // Body gradient
    const gradient = ctx.createLinearGradient(-14, 0, 18, 0);
    gradient.addColorStop(0, '#8B5CF6');
    gradient.addColorStop(0.5, '#06B6D4');
    gradient.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Outline
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cockpit / Core glowing diamond
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  private drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
    ctx.save();
    ctx.translate(obs.x, obs.y);

    // Plasma glow
    ctx.shadowColor = obs.color;
    ctx.shadowBlur = 12;

    // Outer pulsating orb
    ctx.beginPath();
    ctx.arc(0, 0, obs.radius, 0, Math.PI * 2);
    ctx.fillStyle = obs.color;
    ctx.fill();

    // Hot inner core
    ctx.beginPath();
    ctx.arc(0, 0, obs.radius * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  private drawStar(ctx: CanvasRenderingContext2D, star: Collectible) {
    ctx.save();
    ctx.translate(star.x, star.y);
    ctx.rotate(star.rotation);

    const scale = 1 + Math.sin(star.pulsingAngle) * 0.15;
    ctx.scale(scale, scale);

    // Golden halo
    ctx.shadowColor = '#FBBF24';
    ctx.shadowBlur = 16;

    // Draw 5-pointed star
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = star.radius;
    const innerRadius = star.radius * 0.45;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.closePath();

    ctx.fillStyle = '#FBBF24';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  private drawTouchJoystick(ctx: CanvasRenderingContext2D) {
    const { originX, originY, knobX, knobY } = this.touchInput;
    ctx.save();

    // Outer boundary base circle
    ctx.beginPath();
    ctx.arc(originX, originY, 52, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#06B6D4';
    ctx.shadowBlur = 12;
    ctx.stroke();

    // Subtle crosshairs on base
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX - 16, originY);
    ctx.lineTo(originX + 16, originY);
    ctx.moveTo(originX, originY - 16);
    ctx.lineTo(originX, originY + 16);
    ctx.stroke();

    // Connecting vector ray
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(knobX, knobY);
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner thumb knob
    ctx.beginPath();
    ctx.arc(knobX, knobY, 22, 0, Math.PI * 2);
    const knobGrad = ctx.createRadialGradient(knobX, knobY, 2, knobX, knobY, 22);
    knobGrad.addColorStop(0, '#FFFFFF');
    knobGrad.addColorStop(0.5, '#06B6D4');
    knobGrad.addColorStop(1, '#8B5CF6');
    ctx.fillStyle = knobGrad;
    ctx.shadowColor = '#8B5CF6';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}
