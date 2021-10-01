import {
  formateRobotCommands,
  robotCommands,
  robotMovement,
} from "../app/services/robotSpiders.service";

import {
  startingCoordinates,
  validMovementCommands,
  invalidMovementCommands,
} from "./mocks";

describe("robotSpiders.service test suit", () => {
  let formattedMovementCommandsArray: string[];
  const gridSize: { X: number; Y: number } = { X: 100, Y: 100 };
  const startingCoordinates = {
    X: 50,
    Y: 50,
  };

  beforeAll(() => {
    formattedMovementCommandsArray = validMovementCommands.split("");
  });

  describe("formateRobotCommands", () => {
    test("is should remove any none commands and return formatted commands array", () => {
      const formate = formateRobotCommands(invalidMovementCommands);
      expect(formate).toEqual(formattedMovementCommandsArray);
    });
    test("is should return formatted commands array", () => {
      const formate = formateRobotCommands(validMovementCommands);
      expect(formate).toEqual(formattedMovementCommandsArray);
    });
    test("is should return null if string is empty", () => {
      const formateEmpty = formateRobotCommands("");
      expect(formateEmpty).toBeNull();
    });
    test("is should return empty array is string only contains white space", () => {
      const formateWhitespace = formateRobotCommands(" ");
      expect(formateWhitespace).toBe([]);
    });
  });

  describe("robotMovement", () => {
    test("should return number array with value X and Y", () => {
      const movement = robotMovement(
        startingCoordinates,
        formattedMovementCommandsArray
      );

      expect(movement).toBe([10, 10]);
    });
  });

  describe("robotCommands", () => {
    test("", () => {});
  });
});
