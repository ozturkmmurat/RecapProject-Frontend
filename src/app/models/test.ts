export interface RentalDto{
    rental:{
        rentalId:number,
        carId:number,
        customerName:string,
        rentDate:Date,
        returnDate:Date
    }
    creditCart:{
        id:number,
        cartNumber:string,
        expirationMonth:string,
        expirationYear:string,
        cvv:string
    }
  }
  