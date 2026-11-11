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

export interface ReservationStatusView {
  r_id: number;           // รหัสการจอง
  fac_Name: string;       // ชื่อสถานที่
  firstName: string;      // ชื่อผู้ใช้
  lastName: string;       // นามสกุลผู้ใช้
  r_Date: string;         // วันที่จอง (ISO date string)
  r_Time: string;         // ช่วงเวลา เช่น 10:00 - 12:00
  r_Status: string;       // สถานะการจอง เช่น Pending, Approved
}

export interface ReserveResponse {
  message: string;
  reservation: { r_id: number };
}
