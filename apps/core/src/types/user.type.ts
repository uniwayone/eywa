import { Document } from 'mongoose';

export interface ProfileTypeDef
  extends Document,
    AuthTypeDef,
    NotificationTypeDef {
  first_name: string;
  last_name: string;
  user_name: string;
  dob: Date;
  address: string;
  country: string;
  phone_mumber: string;
  created_at: Date;
  updated_at: Date;
  ip: string;
}

export interface AuthTypeDef extends Document {
  email: string;
  password: string;
  verified: boolean;
  verification_token: string;
  role: string;
  method: string;
}

export interface NotificationTypeDef extends Document {
  receive_promotions: boolean;
  receive_email: boolean;
  receive_sms: boolean;
  receive_phone: boolean;
}

// Todo: Move this to a seperate file for the wallet module
export interface WalletTypeDef extends Document {
  currency: string;
  balance: number;
  deposits: Array<DepositTypeDef>;
  withdrawals: Array<WithdrawalTypeDef>;
}

export interface DepositTypeDef extends Document {
  amount: number;
  currency: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface WithdrawalTypeDef extends Document {
  amount: number;
  currency: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
