export interface Facility {
  fac_ID: number;
  fac_Name: string;
  fac_Description: string;
  fac_Capacity: number;
  fac_Status: string;
  fac_price: number;
  fac_img?: string;
  fac_Used?: number;
  fac_Empty?: number;
}

export interface NewFacility {
  fac_Name: string;
  fac_Description: string;
  fac_Capacity: number;
  fac_Status: string;
}

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
