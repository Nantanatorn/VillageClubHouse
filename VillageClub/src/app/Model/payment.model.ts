export interface PaymentView {
  pay_ID: number;
  fac_Name: string;
  firstName: string;
  lastName: string;
  pay_Date: string;
  pay_Amount: number;
  pay_Method: string;
  pay_Status: string;
}

export interface PayResponse {
  message: string;
}
