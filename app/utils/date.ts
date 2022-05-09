import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")

/**
 * SSRではサーバーの時間とブラウザの時間がずれうるので一致させるためにはtimezoneを考慮した処理にする必要がある
 * SSRするたびに上記のsetDefaultをするのは手間なので、SSRではここで設定したものを使用する
 */
export const dayjsSSR = (date?: Parameters<typeof dayjs>[0]) => {
  return dayjs(date).tz()
}
