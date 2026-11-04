export interface GameMetadata {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  releaseDate: string;
  version: string;
  ratingScore: number;
  featured: boolean;
  controls: {
    desktop: string[];
    mobile: string[];
  };
  features: string[];
  thumbnail: string;
}

export interface PlayerScore {
  score: number;
  starsCollected: number;
  timeSurvivedSeconds: number;
  date: string;
}
