export interface I2DVector {
  X: number;
  Y: number;
}

export enum Location {
  Grid,
  Corner,
  Edge,
}

export enum Direction {
  Right,
  Left,
  Backward,
  Forward,
  Up,
  Down,
}

export enum Sides {
  Bottom,
  Right,
  Left,
  Top,
  BottomLeft,
  BottomRight,
  TopRight,
  TopLeft,
}

export interface IRobotPlacement {
  switch?: boolean;
  side?: Sides;
}

export interface IRobotPositionAndAxis {
  position: I2DVector;
  rotationAxis: number;
}

export interface IRobotPosition extends IRobotPlacement {
  location: Location; // Grid, Corner, Edge
  currentDirectionFacing?: Direction; // direction facing
  positionAndAxis: IRobotPositionAndAxis;
  requestedMovement?: Direction;
}
