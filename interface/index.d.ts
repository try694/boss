export interface IUser {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  country: string;
  metamask: string;
  autotrade: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string;
  role: "ADMIN" | "USER";
  approved: boolean;
  whitelisted: boolean | null;
  groupId: string | null;
  allowedTradingAmountFrom: number | null;
  allowedTradingAmountTo: number | null;
  adminFee: number | null;
  userProfit: number | null;
  introducerFee: number | null;
  createdAt: Date;
  updatedAt: Date;
}
