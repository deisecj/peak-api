import { Request, Response } from "express";
import { CharacteristicRepository } from "../repositories/characteristicRepository";
import { errorHandler } from "./errorHandler";

export class CharacteristicController {

  async getCharacteristics(req: Request, res: Response) {
    
    try {
      const characteristics = await CharacteristicRepository.find();
      res.json(characteristics);
    }
    catch(err) {
      errorHandler(err, res);
    }
  }

}
