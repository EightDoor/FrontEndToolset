export interface LoginInfo {
  loginType: number;
  code: number;
  account: Account;
  token: string;
  profile: Profile;
  bindings: Binding[];
  cookie: string;
}
interface Binding {
  url: string;
  userId: number;
  bindingTime: number;
  tokenJsonStr: string;
  refreshTime: number;
  expiresIn: number;
  expired: boolean;
  id: number;
  type: number;
}
interface Profile {
  followed: boolean;
  backgroundUrl: string;
  detailDescription: string;
  userType: number;
  backgroundImgIdStr: string;
  avatarImgIdStr: string;
  userId: number;
  backgroundImgId: number;
  nickname: string;
  birthday: number;
  city: number;
  expertTags?: any;
  experts: Experts;
  mutual: boolean;
  remarkName?: any;
  authStatus: number;
  djStatus: number;
  accountStatus: number;
  vipType: number;
  gender: number;
  avatarImgId: number;
  avatarUrl: string;
  defaultAvatar: boolean;
  province: number;
  description: string;
  signature: string;
  authority: number;
  avatarImgId_str: string;
  followeds: number;
  follows: number;
  eventCount: number;
  avatarDetail?: any;
  playlistCount: number;
  playlistBeSubscribedCount: number;
}
interface Experts {
}
interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  salt: string;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  viptypeVersion: number;
  anonimousUser: boolean;
}

export interface UserInfo {
  level: number;
  listenSongs: number;
  userPoint: UserPoint;
  mobileSign: boolean;
  pcSign: boolean;
  profile: Profile;
  peopleCanSeeMyPlayRecord: boolean;
  bindings: Binding[];
  adValid: boolean;
  code: number;
  createTime: number;
  createDays: number;
  profileVillageInfo: ProfileVillageInfo;
}
interface ProfileVillageInfo {
  title: string;
  imageUrl: string;
  targetUrl: string;
}

interface UserPoint {
  userId: number;
  balance: number;
  updateTime: number;
  version: number;
  status: number;
  blockBalance: number;
}
