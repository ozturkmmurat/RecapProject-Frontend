import { CreditCard } from "./creditCart";
import { Rental } from "./rental";

export interface RentCarDto{
    rental:Rental,
    creditCart:CreditCard
  }
