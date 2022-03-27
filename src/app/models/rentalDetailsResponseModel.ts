import { RentalDetails } from "./rentalDetails";
import { ResponseModel } from "./responseModel";
export interface RentalDetailsResponseModel extends ResponseModel{
 data:RentalDetails[];
}
