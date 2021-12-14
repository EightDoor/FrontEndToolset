export interface SongIdsDetail {
  songs: Song[];
  privileges: Privilege[];
  code: number;
}
export interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  rscl?: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}
interface ChargeInfoList {
  rate: number;
  chargeUrl?: any;
  chargeMessage?: any;
  chargeType: number;
}
interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}
export interface Song {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: any[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt?: any;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: H;
  l: H;
  a?: any;
  cd: string;
  no: number;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  tagPicList?: any;
  resourceState: boolean;
  version: number;
  songJumpInfo?: any;
  single: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}
interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}
interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str: string;
  pic: number;
}
interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

export interface SongPalyList {
  data: Datum[];
  code: number;
}
export interface Datum {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  fee: number;
  uf?: any;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo?: any;
  level: string;
  encodeType: string;
  freeTrialPrivilege: FreeTrialPrivilege;
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
  urlSource: number;
}
interface FreeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}
interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}
