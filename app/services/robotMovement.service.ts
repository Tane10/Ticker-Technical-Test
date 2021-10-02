import {
  Direction,
  I2DVector,
  IRobotPositionAndAxis,
  Location,
  IRobotPosition,
  Sides,
} from "../modules";
import RobotSensorService from "./robotSensor.service";

export default class RobotMovementService {
  private robotSensorService: RobotSensorService;
  public gridSize: I2DVector;
  public robotVersion: number;

  constructor(gridSize: I2DVector, robotVersion?: number) {
    this.robotVersion = robotVersion || 1;
    this.gridSize = gridSize;
    this.robotSensorService = new RobotSensorService(this.gridSize);
  }

  // build complete robot data
  private calculatePosition(
    positionData: IRobotPositionAndAxis
  ): IRobotPosition {
    let robotLocation: IRobotPosition;
    const currentDirectionFacing: Direction =
      this.robotSensorService.getDirection(positionData.rotationAxis);

    // here we wanna check if we are on the  grid, edge or corner
    const positionedInGrid = this.robotSensorService.positionedInGrid(
      positionData.position
    );

    const inTheCorner = this.robotSensorService.inTheCorner(
      positionData.position,
      positionData.rotationAxis
    );
    const movingOnTheEdge = this.robotSensorService.movingOnTheEdge(
      positionData.position,
      positionData.rotationAxis
    );

    if (positionedInGrid) {
      robotLocation.robotLocation = Location.Grid;
    } else if (inTheCorner.switch) {
      robotLocation.robotLocation = Location.Corner;
      robotLocation.side = inTheCorner.side;
    } else if (movingOnTheEdge.switch) {
      robotLocation.robotLocation = Location.Edge;
      robotLocation.side = movingOnTheEdge.side;
    }

    // building robot location data
    robotLocation.positionAndAxis = {
      position: positionData.position,
      rotationAxis: positionData.rotationAxis,
    };

    robotLocation.currentDirectionFacing = currentDirectionFacing;

    return robotLocation;
  }

  private increasesPosition(
    direction: Direction,
    position: I2DVector
  ): I2DVector {
    switch (direction) {
      case Direction.Right: {
        position.X++;
        break;
      }
      case Direction.Up: {
        position.Y++;
        break;
      }
      case Direction.Left: {
        position.X--;
        break;
      }
      case Direction.Down: {
        position.Y--;
        break;
      }
    }
    return position;
  }

  private invertDirection(currentDirectionFacing: Direction): Direction {
    let newDirection: Direction;

    switch (currentDirectionFacing) {
      case Direction.Right: {
        newDirection = Direction.Left;
        break;
      }
      case Direction.Up: {
        newDirection = Direction.Down;
        break;
      }
      case Direction.Left: {
        newDirection = Direction.Right;
        break;
      }
      case Direction.Down: {
        newDirection = Direction.Up;
        break;
      }
    }
    return newDirection;
  }

  private calculateForwardMovement(
    robotData: IRobotPosition
  ): IRobotPositionAndAxis {
    if (robotData.robotLocation === Location.Grid) {
      switch (robotData.currentDirectionFacing) {
        case Direction.Right: {
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
        case Direction.Up: {
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
        case Direction.Left: {
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
        case Direction.Down: {
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
      }
    } else if (robotData.robotLocation === Location.Edge) {
      switch (robotData.side) {
        case Sides.Right: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.Left: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.Top: {
          if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.Bottom: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
      }
    } else if (robotData.robotLocation === Location.Corner) {
      switch (robotData.side) {
        case Sides.TopRight: {
          if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.TopLeft: {
          if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.BottomLeft: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.BottomRight: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
      }
    }
    return robotData.positionAndAxis;
  }

  private calculateBackwardMovement(
    robotData: IRobotPosition
  ): IRobotPositionAndAxis {
    // invert direction
    robotData.currentDirectionFacing = this.invertDirection(
      robotData.currentDirectionFacing
    );

    if (robotData.robotLocation === Location.Grid) {
      switch (robotData.currentDirectionFacing) {
        case Direction.Right: {
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
        case Direction.Up: {
          robotData.currentDirectionFacing = Direction.Down;
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
        case Direction.Left: {
          robotData.currentDirectionFacing = Direction.Right;
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
        case Direction.Down: {
          robotData.currentDirectionFacing = Direction.Up;
          robotData.positionAndAxis.position = this.increasesPosition(
            robotData.currentDirectionFacing,
            robotData.positionAndAxis.position
          );
          break;
        }
      }
    } else if (robotData.robotLocation === Location.Edge) {
      switch (robotData.side) {
        case Sides.Right: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.currentDirectionFacing = Direction.Down;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.currentDirectionFacing = Direction.Up;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.currentDirectionFacing = Direction.Left;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.Left: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.currentDirectionFacing = Direction.Down;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.currentDirectionFacing = Direction.Up;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.currentDirectionFacing = Direction.Right;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.Top: {
          if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.currentDirectionFacing = Direction.Right;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.currentDirectionFacing = Direction.Down;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.currentDirectionFacing = Direction.Left;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.Bottom: {
          if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.currentDirectionFacing = Direction.Right;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.currentDirectionFacing = Direction.Left;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.currentDirectionFacing = Direction.Up;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
      }
    } else if (robotData.robotLocation === Location.Corner) {
      switch (robotData.side) {
        case Sides.TopRight: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.currentDirectionFacing = Direction.Down;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Right) {
            robotData.currentDirectionFacing = Direction.Left;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.TopLeft: {
          if (robotData.currentDirectionFacing === Direction.Up) {
            robotData.currentDirectionFacing = Direction.Down;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.currentDirectionFacing = Direction.Right;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.BottomLeft: {
          if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.currentDirectionFacing = Direction.Up;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.currentDirectionFacing = Direction.Right;
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
        case Sides.BottomRight: {
          if (robotData.currentDirectionFacing === Direction.Down) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          } else if (robotData.currentDirectionFacing === Direction.Left) {
            robotData.positionAndAxis.position = this.increasesPosition(
              robotData.currentDirectionFacing,
              robotData.positionAndAxis.position
            );
            break;
          }
        }
      }
    }
    return robotData.positionAndAxis;
  }

  private calculateMove(robotData: IRobotPosition): IRobotPositionAndAxis {
    if (robotData.requestedMovement === Direction.Forward) {
      this.calculateForwardMovement(robotData);
    } else {
      this.calculateBackwardMovement(robotData);
    }
    return robotData.positionAndAxis;
  }

  public moveRobot(
    positionData: IRobotPositionAndAxis,
    requestedMovement: Direction
  ): IRobotPositionAndAxis {
    // build data needed for movement
    let calculatedRobotPosition = this.calculatePosition(positionData);
    calculatedRobotPosition.requestedMovement = requestedMovement;

    let calculatedMove = this.calculateMove(calculatedRobotPosition);

    return calculatedMove;
  }
}
