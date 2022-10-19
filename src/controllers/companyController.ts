import { Request, Response } from "express";
import { CompanyRepository } from "../repositories/companyRepository";
import { ReviewRepository } from "../repositories/reviewRepository";
import { errorHandler } from "./errorHandler";

export class CompanyController {
  
  async getCompany(req: Request, res: Response) {

    const id = parseInt(req.params.id);

    try {
      const companyInfo = await CompanyRepository.findById(id);
      //Total Reviews
      const totalReviews = await ReviewRepository.getTotalReviewByCompany(id);
      //Average Rating
      const averageRatings = await ReviewRepository.getAverageRatings(id);
      let calcAverage = 0;
      
      averageRatings.forEach(characteristic => { 
        calcAverage = parseInt(characteristic.rating) + calcAverage;
     });
     
     res.json({
       company: companyInfo,
       totalReviews: totalReviews,
       averageCharacteristicRating: calcAverage / averageRatings.length,
       ratings: averageRatings
     });

    } catch(err) {
      errorHandler(err, res);
    }

  }

  async getCompanyBySearch(req: Request, res: Response) {
    
    const keySearch = req.query.k as string;  

    try {
        const companyInfo = await CompanyRepository.findByName(keySearch);
        res.json(companyInfo);
    } catch(err) {
       errorHandler(err, res);
    }

  }
}