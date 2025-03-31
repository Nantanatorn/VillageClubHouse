export interface TimetableSlot {
    slot_ID: number;
    startTime: string;
    endTime: string;
    label: string;
    isAvailable: boolean;
  }
export interface EditableSlot {
  label: string;
  isAvailable: boolean;
  slot_ID?: number;
  start?: string;
  end?: string;
  editing?: boolean;
}

export interface ReservationPayment {
  id: number;         
  r_id: number;           
  fac_Name: string;       
  r_Date: string;        
  r_Time: string;         
  r_Status: string;       
  pay_Amount: number;     
  pay_Status: string;     
}

export interface myAcc  {
  id: number
  idCard: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  role: string
  password: string
  position: string
  address: string
  status: any
}

export interface UserData {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  BirthDate?: string;
  Password?: string;
}
