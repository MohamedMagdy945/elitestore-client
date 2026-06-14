export interface CheckoutRequest {
  userName: string;
  totalPrice: number;

  firstName: string;
  lastName: string;
  email: string;

  address: string;
  addressLine: string;
  country: string;
  city: string;
  zipCode: string;

  cardName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;

  paymentMethod: number;
}