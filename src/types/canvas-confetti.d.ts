declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    ticks?: number;
    gravity?: number;
    decay?: number;
    startVelocity?: number;
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  interface ConfettiFunction {
    (options?: ConfettiOptions): Promise<null>;
    reset(): void;
    create(canvas: HTMLCanvasElement, options?: ConfettiOptions): ConfettiFunction;
  }

  const confetti: ConfettiFunction;
  export = confetti;
}
