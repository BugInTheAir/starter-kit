export interface LoginInfo {
  accessToken: string;
  idToken: string;
  scopes: string[];
  uniqueId: string;
  account: UserInfo;
}

export interface UserInfo {
  username: string;
  name: string;
  localAccountId: string;
}
