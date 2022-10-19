import { Request, Response } from "express";
import { Characteristic } from "../models/Characteristic";
import { User } from "../models/User";
import { CompanyRepository } from "../repositories/companyRepository";
import { ReviewRepository } from "../repositories/reviewRepository";
import { UserRepository } from "../repositories/userRepository";
import { errorHandler } from "./errorHandler";

export class ReviewController {

  async getReviews(req: Request, res: Response) {

    const companyId = parseInt(req.params.id);

    try {
      const reviewDetails = await ReviewRepository.getReviewDetails(companyId);
      res.json(reviewDetails);
        
    } catch(err) {
        errorHandler(err, res);
    }
  }

  async createReview(req: Request, res: Response) {

    try {
      const newReview = req.body;
      let companyId = newReview.company.id;
      let userId = undefined;

      const findCompany = companyId ? await CompanyRepository.findById(companyId): undefined;

      if (!findCompany) {
        companyId = await CompanyRepository.save(newReview.company);
      }

      const findUser = await UserRepository.findByEmail(newReview.user.email);

      if (!findUser) {
        userId = await UserRepository.save(newReview.user);
      } else {
        userId = findUser.id;
      }
      
      const ratings = newReview.reviews;
      const ratingsSavedPromises = ratings.map((element) => {
        const review = {
            rating: element.rating,
            reviewText: element.review_text,
            user: userId,
            company: companyId,
            characteristic: element.characteristic_id
        };

        console.log('aquiii', review)
        return ReviewRepository.save(review);
      });

      await Promise.all(ratingsSavedPromises);

      res.json({ message: 'Review was created successfully' });
    
    } catch(err) {
      errorHandler(err, res);
    }
  }
}
