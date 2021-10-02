import { Direction, I2DVector, IRobotPositionAndAxis } from "../modules";
import RobotSensorService from "./robotSensor.service";
import RobotMovementService from "./robotMovement.service";

export default class RobotService {
  private movementCommandsArray: string[] = ["F", "B", "L", "R"];
  private gridSize: I2DVector = { X: 100, Y: 100 };
  private robotVersion: number;
  private robotSensorService: RobotSensorService;
  private robotMovementService: RobotMovementService;

  constructor(robotVersion?: string) {
    this.robotVersion = parseInt(robotVersion) || 1;
    this.robotSensorService = new RobotSensorService(this.gridSize);
    this.robotMovementService = new RobotMovementService(
      this.gridSize,
      this.robotVersion
    );
  }

  private formateRobotCommands(commands: string): string[] {
    if (commands.length != 0) {
      let formattedMovementCommandsArray: string[] = commands
        .toUpperCase()
        .split("")
        .filter((command) => this.movementCommandsArray.includes(command));

      return formattedMovementCommandsArray;
    } else {
      return null;
    }
  }

  private robotMovement(
    startPosition: I2DVector,
    movesArray: string[]
  ): number[] {
    //default assumption facing along the X axis
    let positionData: IRobotPositionAndAxis = {
      position: startPosition,
      rotationAxis: 0,
    };

    for (const [idx, value] of movesArray.entries()) {
      switch (value) {
        case "F": {
          if (this.robotVersion !== 1) {
            positionData = this.robotMovementService.moveRobot(
              positionData,
              Direction.Forward
            );
          } else {
            positionData.position.X++;
            break;
          }
        }
        case "B": {
          if (this.robotVersion !== 1) {
            positionData = this.robotMovementService.moveRobot(
              positionData,
              Direction.Backward
            );
          } else {
            positionData.position.X++;
            break;
          }

          break;
        }
        case "R": {
          if (this.robotVersion !== 1) {
            positionData.rotationAxis = this.robotSensorService.rotateRobot(
              positionData.rotationAxis,
              Direction.Right
            );
          } else {
            if (
              positionData.position.X++ >= 0 &&
              positionData.position.X++ < this.gridSize.X
            ) {
              positionData.position.X++;
            }
          }

          break;
        }
        case "L": {
          if (this.robotVersion !== 1) {
            positionData.rotationAxis = this.robotSensorService.rotateRobot(
              positionData.rotationAxis,
              Direction.Left
            );
          } else {
            if (positionData.position.X !== 0) {
              positionData.position.X++;
            }
            break;
          }
        }
        default:
          console.log("No movement");
      }
    }

    const finalPosition = [positionData.position.X, positionData.position.Y];

    return finalPosition;
  }

  public robotCommands(
    startingCoordinates: I2DVector,
    movementCommands: string
  ): number[] {
    const formattedMovementCommands =
      this.formateRobotCommands(movementCommands);

    const finalPosition = this.robotMovement(
      startingCoordinates,
      formattedMovementCommands
    );

    return finalPosition;
  }
}
