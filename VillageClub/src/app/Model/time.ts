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
