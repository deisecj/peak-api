import express, { Express } from "express";
import { CharacteristicController } from "./controllers/characteristicController";
import { CompanyController } from "./controllers/companyController";
import { errorHandler } from "./controllers/errorHandler";
import { ReviewController } from "./controllers/reviewController";

const companyController = new CompanyController();
const characteristicController = new CharacteristicController();
const reviewController = new ReviewController();

export const initializeApiServer = (): Express => {

  const app = express();

  app.use(express.json());

  app.get('/companies/search', (req, res, next) => companyController.getCompanyBySearch(req, res).catch(next));

  app.get('/companies/:id', (req, res, next) => companyController.getCompany(req, res).catch(next));

  app.get('/characteristics', (req, res, next) => characteristicController.getCharacteristics(req, res).catch(next));

  app.get('/companies/:id/reviews/', (req, res, next) => reviewController.getReviews(req, res).catch(next));

  app.post('/reviews', (req, res, next) => reviewController.createReview(req, res).catch(next));
  
  app.use((err, req, res, next) => errorHandler(err, res));

  return app;
}
