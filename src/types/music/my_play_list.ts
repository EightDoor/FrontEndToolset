export interface UserPlayList {
  version: string
  more: boolean
  playlist: Playlist[]
  code: number
}
export interface Playlist {
  subscribers: any[]
  subscribed: boolean
  creator: Creator
  artists?: any
  tracks?: any
  updateFrequency?: string
  backgroundCoverId: number
  backgroundCoverUrl?: string
  titleImage: number
  titleImageUrl?: string
  englishTitle?: string
  opRecommend: boolean
  recommendInfo?: RecommendInfo
  subscribedCount: number
  cloudTrackCount: number
  userId: number
  totalDuration: number
  coverImgId: number
  privacy: number
  trackUpdateTime: number
  trackCount: number
  updateTime: number
  commentThreadId: string
  coverImgUrl: string
  specialType: number
  anonimous: boolean
  createTime: number
  highQuality: boolean
  newImported: boolean
  trackNumberUpdateTime: number
  playCount: number
  adType: number
  description?: string
  tags: string[]
  ordered: boolean
  status: number
  name: string
  id: number
  coverImgId_str?: string
  sharedUsers?: any
  shareStatus?: any
}
interface RecommendInfo {
  alg: string
  logInfo: string
}
interface Creator {
  defaultAvatar: boolean
  province: number
  authStatus: number
  followed: boolean
  avatarUrl: string
  accountStatus: number
  gender: number
  city: number
  birthday: number
  userId: number
  userType: number
  nickname: string
  signature: string
  description: string
  detailDescription: string
  avatarImgId: number
  backgroundImgId: number
  backgroundUrl: string
  authority: number
  mutual: boolean
  expertTags?: string[]
  experts?: Expert
  djStatus: number
  vipType: number
  remarkName?: any
  authenticationTypes: number
  avatarDetail?: any
  backgroundImgIdStr: string
  avatarImgIdStr: string
  anchor: boolean
  avatarImgId_str?: string
}
interface Expert {
  '2': string
  '1'?: string
}

export interface DailyRecommendedSongData {
  code: number
  data: Data
}
interface Data {
  dailySongs: DailySong[]
  orderSongs: any[]
  recommendReasons: RecommendReason[]
}
interface RecommendReason {
  songId: number
  reason: string
}
export interface DailySong {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt?: string
  fee: number
  v: number
  crbt?: any
  cf: string
  al: Al
  dt: number
  h: H
  m: H
  l: H
  a?: any
  cd: string
  no: number
  rtUrl?: any
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData?: any
  single: number
  noCopyrightRcmd?: any
  mv: number
  rtype: number
  rurl?: any
  mst: number
  cp: number
  publishTime: number
  reason: string
  privilege: Privilege
  alg: string
  tns?: string[]
}
interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  rscl?: any
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: ChargeInfoList[]
}
interface ChargeInfoList {
  rate: number
  chargeUrl?: any
  chargeMessage?: any
  chargeType: number
}
interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
}
interface H {
  br: number
  fid: number
  size: number
  vd: number
}
interface Al {
  id: number
  name: string
  picUrl: string
  tns: any[]
  pic_str?: string
  pic: number
}
interface Ar {
  id: number
  name: string
  tns: any[]
  alias: any[]
}
