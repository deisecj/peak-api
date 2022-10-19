import { Response } from 'express';
import { RecordNotFound } from '../errors';

export const errorHandler = (err: Error, res: Response): void => {
  console.error(err.stack);
  if (err instanceof RecordNotFound) {
    res.status(404).send('Data not found');
  } else {
    res.status(500).send('Something broke!');
  }
};
