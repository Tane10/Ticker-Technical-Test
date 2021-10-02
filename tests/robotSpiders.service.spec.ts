import RobotService from "../app/services/robot.service";
import RobotSensorService from "../app/services/robotSensor.service";
import RobotMovementService from "../app/services/robotMovement.service";

import {
  startingCoordinates,
  validMovementCommands,
  invalidMovementCommands,
} from "./mocks";
import { I2DVector } from "../app/modules";

jest.mock("../app/services/robotSensor.service");
jest.mock("../app/services/robotMovement.service");

describe("robotSpiders.service test suit", () => {
  const gridSize: { X: number; Y: number } = { X: 100, Y: 100 };
  const startingCoordinates: I2DVector = {
    X: 50,
    Y: 50,
  };

  // let robotSensorService = new RobotSensorService(gridSize);
  // let robotMovementService = new RobotMovementService(gridSize, 2);

  describe("robotCommands", () => {
    test("is should return the final position for mk version 1", () => {
      const robotServiceMk1 = new RobotService("1");
      const mk1RobotCommands = robotServiceMk1.robotCommands(
        startingCoordinates,
        validMovementCommands
      );
      expect(mk1RobotCommands).toEqual([94, 50]);
    });

    test("is should return the final position for mk version 2", () => {
      let robotSensorService = new RobotSensorService(gridSize);
      let robotMovementService = new RobotMovementService(gridSize, 2);
      const robotServiceMk2 = new RobotService("2");
      const mk2RobotCommands = robotServiceMk2.robotCommands(
        startingCoordinates,
        validMovementCommands
      );
      expect(mk2RobotCommands).toEqual([94, 50]);
    });
  });
});

//   test("is should return the final position for mk version 2", () => {
//     const robotService = new RobotService();
//     const formate = formateRobotCommands(invalidMovementCommands);
//     expect(formate).toEqual(formattedMovementCommandsArray);
//   });
// });

// describe("robotMovement", () => {
//   test("should return number array with value X and Y", () => {
//     const movement = robotMovement(
//       startingCoordinates,
//       formattedMovementCommandsArray
//     );

//     expect(movement).toBe([10, 10]);
//   });
// });

// describe("robotCommands", () => {
//   test("", () => {});
// });
// })
