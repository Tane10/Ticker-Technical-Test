import { I2DVector } from "../modules";

export default class RobotSensorService {
  private gridSize: I2DVector;

  constructor(gridSize) {
    this.gridSize = gridSize;
  }

  // checking if robot is in the grid
  public positionedInGrid(currentPosition: I2DVector): boolean {
    if (
      currentPosition.Y > 0 &&
      currentPosition.Y < this.gridSize.Y &&
      currentPosition.X > 0 &&
      currentPosition.X < this.gridSize.X
    ) {
      return true;
    } else {
      false;
    }
  }

  // checking if robot is in the corners of the grid
  public inTheCorner(currentPosition: I2DVector, rotation: number): boolean {
    //(0,0)
    if (currentPosition.X === 0 && currentPosition.Y === 0) {
      if (rotation == 0 || rotation === 90) {
        return true;
      } else {
        false;
      }
    }

    // (0, MAX Y)
    if (currentPosition.X === 0 && currentPosition.Y === this.gridSize.Y) {
      if (rotation === 0 || rotation === 90 || rotation === -90) {
        return true;
      } else {
        false;
      }
    }

    //(MAX X, 0)
    if (currentPosition.X === this.gridSize.X && currentPosition.Y === 0) {
      if (rotation === 180 || rotation === 90) {
        return true;
      } else {
        false;
      }
    }

    //(MAX, MAX)
    if (
      currentPosition.X === this.gridSize.X &&
      currentPosition.Y === this.gridSize.Y
    ) {
      if (rotation === 180 || rotation === -90) {
        return true;
      } else {
        false;
      }
    }
  }

  // checking if robot is on the edge
  public movingOnTheEdge(
    currentPosition: I2DVector,
    rotation: number
  ): boolean {
    // checking on the line movement i.e. (0,10)
    if (
      currentPosition.X === 0 &&
      currentPosition.Y > this.gridSize.Y &&
      currentPosition.Y !== 0
    ) {
      if (rotation === 0 || rotation === 90 || rotation === -90) {
        return true;
      } else {
        false;
      }
    }

    // checking on the line movement i.e. (90,0)
    if (
      currentPosition.Y === 0 &&
      currentPosition.X > this.gridSize.X &&
      currentPosition.Y !== 0
    ) {
      if (rotation === 0 || rotation === 90 || rotation === 180) {
        return true;
      } else {
        false;
      }
    }

    // checking on the line movement i.e. (100,90)
    if (
      currentPosition.Y === 0 &&
      currentPosition.X > this.gridSize.X &&
      currentPosition.Y !== 0
    ) {
      if (rotation === 90 || rotation === 180 || rotation === -90) {
        return true;
      } else {
        false;
      }
    }

    // checking on the line movement i.e. (50,100)
    if (
      currentPosition.Y === 0 &&
      currentPosition.X > this.gridSize.X &&
      currentPosition.Y !== 0
    ) {
      if (rotation === 0 || rotation === -90 || rotation === 180) {
        return true;
      } else {
        false;
      }
    }
  }

  // setting new rotationAxis
  public rotateRobot(rotationAxis: number, direction: string): number {
    let newRotationAxis: number;

    switch (rotationAxis) {
      case 0: {
        if (direction === "R") {
          newRotationAxis = -90;
          break;
        } else if (direction === "L") {
          newRotationAxis = 90;
          break;
        }
      }
      case 90: {
        if (direction === "R") {
          newRotationAxis = 0;
          break;
        } else if (direction === "L") {
          newRotationAxis = 180;
          break;
        }
      }
      case 180: {
        if (direction === "R") {
          newRotationAxis = 90;
          break;
        } else if (direction === "L") {
          newRotationAxis = -90;
          break;
        }
      }
      case -90: {
        if (direction === "R") {
          newRotationAxis = 180;
          break;
        } else if (direction === "L") {
          newRotationAxis = 0;
          break;
        }
      }
    }
    return newRotationAxis;
  }
}
