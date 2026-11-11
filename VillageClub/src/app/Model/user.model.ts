export interface MyAccount {
  id: number;
  idCard: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  position: string;
  address: string;
  status: string;
}

export interface UserData {
  FirstName: string;
  LastName: string;
  Phone: string;
  Email: string;
  BirthDate?: string;
  Password?: string;
}
