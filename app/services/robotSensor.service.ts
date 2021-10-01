import {
  I2DVector,
  Location,
  Direction,
  Sides,
  IRobotPlacement,
  IMoveRobot,
} from "../modules";

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
  public inTheCorner(
    currentPosition: I2DVector,
    rotation: number
  ): IRobotPlacement {
    let robotPlacement: IRobotPlacement;
    //(0,0)
    if (currentPosition.X === 0 && currentPosition.Y === 0) {
      if (rotation == 0 || rotation === 90) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.BottomLeft;
        return robotPlacement;
      } else {
        false;
      }
    }

    // (0, MAX Y)
    else if (currentPosition.X === 0 && currentPosition.Y === this.gridSize.Y) {
      if (rotation === 0 || rotation === 90 || rotation === -90) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.TopLeft;
        return robotPlacement;
      } else {
        false;
      }
    }

    //(MAX X, 0)
    else if (currentPosition.X === this.gridSize.X && currentPosition.Y === 0) {
      if (rotation === 180 || rotation === 90) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.BottomRight;
        return robotPlacement;
      } else {
        false;
      }
    }

    //(MAX, MAX)
    else if (
      currentPosition.X === this.gridSize.X &&
      currentPosition.Y === this.gridSize.Y
    ) {
      if (rotation === 180 || rotation === -90) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.TopRight;
        return robotPlacement;
      } else {
        false;
      }
    }
  }

  // checking if robot is on the edge
  public movingOnTheEdge(
    currentPosition: I2DVector,
    rotation: number
  ): IRobotPlacement {
    let robotPlacement: IRobotPlacement;
    // checking on the line movement i.e. (0,10)
    if (
      currentPosition.X === 0 &&
      currentPosition.Y > this.gridSize.Y &&
      currentPosition.Y !== 0
    ) {
      if (rotation === 0 || rotation === 90 || rotation === -90) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.Left;
        return robotPlacement;
      } else {
        false;
      }
    }

    // checking on the line movement i.e. (90,0)
    else if (
      currentPosition.Y === 0 &&
      currentPosition.X > this.gridSize.X &&
      currentPosition.Y !== 0
    ) {
      if (rotation === 0 || rotation === 90 || rotation === 180) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.Bottom;
        return robotPlacement;
      } else {
        false;
      }
    }

    // checking on the line movement i.e. (100,90)
    else if (
      currentPosition.Y === this.gridSize.Y &&
      currentPosition.X > this.gridSize.X
    ) {
      if (rotation === 90 || rotation === 180 || rotation === -90) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.Top;
        return robotPlacement;
      } else {
        false;
      }
    }

    // checking on the line movement i.e. (50,100)
    else if (
      currentPosition.X === this.gridSize.X &&
      currentPosition.Y > this.gridSize.Y
    ) {
      if (rotation === 0 || rotation === -90 || rotation === 180) {
        robotPlacement.switch = true;
        robotPlacement.side = Sides.Left;
        return robotPlacement;
      } else {
        false;
      }
    }
  }

  // setting new rotationAxis
  public rotateRobot(rotationAxis: number, direction: Direction): number {
    let newRotationAxis: number;

    switch (rotationAxis) {
      case 0: {
        if (direction === 0) {
          newRotationAxis = -90;
          break;
        } else if (direction === 1) {
          newRotationAxis = 90;
          break;
        } else if (direction === 2) {
          newRotationAxis = 180;
          break;
        }
      }
      case 90: {
        if (direction === 0) {
          newRotationAxis = 0;
          break;
        } else if (direction === 1) {
          newRotationAxis = 180;
          break;
        } else if (direction === 2) {
          newRotationAxis = -90;
          break;
        }
      }
      case 180: {
        if (direction === 0) {
          newRotationAxis = 90;
          break;
        } else if (direction === 1) {
          newRotationAxis = -90;
          break;
        } else if (direction === 2) {
          newRotationAxis = 180;
          break;
        }
      }
      case -90: {
        if (direction === 0) {
          newRotationAxis = 180;
          break;
        } else if (direction === 1) {
          newRotationAxis = 0;
          break;
        } else if (direction === 2) {
          newRotationAxis = 90;
          break;
        }
      }
    }
    return newRotationAxis;
  }

  public getDirection(rotationAxis: number): Direction {
    switch (rotationAxis) {
      case 0: {
        return Direction.Right;
      }
      case 90: {
        return Direction.Up;
      }
      case 180: {
        return Direction.Left;
      }
      case -90: {
        return Direction.Down;
      }
      default:
        break;
    }
  }

  public moveRobot(
    currentPosition: I2DVector,
    rotationAxis: number,
    location: Location,
    direction: Direction
  ): IMoveRobot {
    if (direction === Direction.Forward) {
    }

    if (direction === Direction.Backward)
      if (location === Location.Grid) {
        rotationAxis = this.rotateRobot(rotationAxis, Direction.Backward);
        if (rotationAxis === 0) {
          currentPosition.X++;
        } else if (rotationAxis === 180) {
          currentPosition.X--;
        } else if (rotationAxis === 90) {
          currentPosition.Y++;
        } else if (rotationAxis === -90) {
          currentPosition.Y--;
        }
      } else if (location === Location.Corner) {
        rotationAxis = this.rotateRobot(rotationAxis, Direction.Backwards);
        if (currentPosition.X === 0) {
        }
        if (rotationAxis === 0) {
          currentPosition.X++;
        }
        if (rotationAxis === 180) {
          currentPosition.X--;
        }
        if (rotationAxis === 90) {
          currentPosition.Y++;
        }
        if (rotationAxis === -90) {
          currentPosition.Y--;
        }
      }

    return { newPosition: { currentPosition, rotationAxis } };
  }
}
