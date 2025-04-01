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

export interface ReservationStatusView {
  r_id: number;           // รหัสการจอง
  fac_Name: string;       // ชื่อสถานที่
  firstName: string;      // ชื่อผู้ใช้
  lastName: string;       // นามสกุลผู้ใช้
  r_Date: string;         // วันที่จอง (ISO date string)
  r_Time: string;         // ช่วงเวลา เช่น 10:00 - 12:00
  r_Status: string;       // สถานะการจอง เช่น Pending, Approved
}
