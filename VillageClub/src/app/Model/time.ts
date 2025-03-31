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

