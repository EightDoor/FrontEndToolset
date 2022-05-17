export interface ListType {
  abstract: string
  action_list: Actionlist[]
  aggr_type: number
  allow_download: boolean
  article_sub_type: number
  article_type: number
  article_url: string
  article_version: number
  ban_comment: number
  ban_immersive: number
  behot_time: number
  bury_count: number
  bury_style_show: number
  cell_flag: number
  cell_layout_style: number
  cell_type: number
  comment_count: number
  content_decoration: string
  cursor: number
  digg_count: number
  display_url: string
  filter_words: Filterword[]
  forward_info: Forwardinfo
  gallary_image_count: number
  group_id: number
  group_source: number
  has_image: boolean
  has_m3u8_video: boolean
  has_mp4_video: number
  has_video: boolean
  hot: number
  ignore_web_transform: number
  image_list: Imagelist[]
  interaction_data: string
  is_key_video: boolean
  is_subject: boolean
  item_id: number
  item_version: number
  level: number
  log_pb: Logpb
  media_info: Mediainfo
  media_name: string
  middle_image: Imagelist
  need_client_impr_recycle: number
  publish_time: number
  raw_ad_data?: any
  read_count: number
  rid: string
  share_count: number
  share_info: Shareinfo
  share_large_image: Imagelist
  share_url: string
  show_dislike: boolean
  show_portrait: boolean
  show_portrait_article: boolean
  small_image?: any
  source: string
  source_icon_style: number
  source_open_url: string
  tag: string
  tag_id: number
  tip: number
  title: string
  ugc_recommend: Ugcrecommend
  url: string
  user_info: Userinfo
  user_repin: number
  user_verified: number
  verified_content: string
  video_style: number
  xi_related: boolean
}
interface Userinfo {
  avatar_url: string
  name: string
  description: string
  user_id: number
  user_verified: boolean
  verified_content: string
  follow: boolean
  follower_count: number
  user_auth_info: string
  schema: string
  live_info_type: number
  living_count: number
}
interface Ugcrecommend {
  activity: string
  reason: string
}
interface Shareinfo {
  share_url: string
  title: string
  description?: any
  cover_image?: any
  share_type: Sharetype
  weixin_cover_image?: any
  token_type: number
  on_suppress: number
  hidden_url?: any
  video_url?: any
  share_control?: any
}
interface Sharetype {
  pyq: number
  qq: number
  qzone: number
  wx: number
}
interface Mediainfo {
  avatar_url: string
  name: string
  user_verified: boolean
  media_id: number
  user_id: number
  verified_content: string
  is_star_user: boolean
  recommend_reason: string
  recommend_type: number
  follow: boolean
}
interface Logpb {
  impr_id: string
  is_following: string
}
interface Imagelist {
  url: string
  width: number
  url_list: Urllist[]
  uri: string
  height: number
}
interface Urllist {
  url: string
}
interface Forwardinfo {
  forward_count: number
}
interface Filterword {
  id: string
  name: string
  is_selected: boolean
}
interface Actionlist {
  action: number
  desc: string
  extra: Extra
}
interface Extra {
}
