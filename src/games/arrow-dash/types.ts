export type GameState = 'ready' | 'playing' | 'paused' | 'gameover';

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  vx: number;
  vy: number;
  rotation: number;
}

export interface Obstacle {
  id: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  type: 'orb' | 'pulse' | 'bar';
  width?: number;
  height?: number;
}

export interface Collectible {
  id: number;
  x: number;
  y: number;
  radius: number;
  rotation: number;
  points: number;
  pulsingAngle: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  alpha: number;
  color: string;
}

export interface GameStats {
  score: number;
  starsCollected: number;
  timeSurvived: number; // in seconds
  level: number;
}
