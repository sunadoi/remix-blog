import { Card, Divider, Group, Text, Badge, Grid } from "@mantine/core"
import type { FC } from "react"

import QAImage from "@/assets/qa.png"
import { Image } from "@/components/Image"
import { useMediaQueryMax } from "@/hooks/useMediaQuery"

export const QACard: FC = () => {
  const [smallerThanSm] = useMediaQueryMax("sm", true)

  return (
    <Card radius="md" p="sm" pb="xl" shadow="xs">
      <Group position="center" direction="column" spacing="xs">
        <Image src={QAImage} alt="" fit="contain" width={230} height={164} />
      </Group>
      {qa.map((e, index) => (
        <Group direction="column" key={e.question} spacing="sm">
          <Divider mt="md" mb="sm" size="xs" className="w-[100%]" />
          <Grid ml="md" align="start" className="w-[95%]" columns={smallerThanSm ? 24 : 20}>
            <Grid.Col span={4} md={2} px={0}>
              <Badge radius="md" py="sm" variant="filled" size="md">
                <Text>Q{index + 1}</Text>
              </Badge>
            </Grid.Col>
            <Grid.Col span={20} md={18}>
              <Text sx={(theme) => ({ color: theme.other.primary })} mt={smallerThanSm ? 2 : 4} weight="bold">
                {e.question}
              </Text>
            </Grid.Col>
          </Grid>
          <Grid ml="md" align="start" className="w-[95%]" columns={smallerThanSm ? 24 : 20}>
            <Grid.Col span={4} md={2} px={0}>
              <Badge radius="md" py="sm" variant="outline" size="md">
                <Text>A{index + 1}</Text>
              </Badge>
            </Grid.Col>
            <Grid.Col span={20} md={18}>
              <Text
                sx={(theme) => ({ color: theme.other.primary })}
                mt={smallerThanSm ? 2 : 4}
                className="whitespace-pre-wrap break-words"
              >
                {e.answer}
              </Text>
            </Grid.Col>
          </Grid>
        </Group>
      ))}
    </Card>
  )
}

//50mon.jp/q/513
const qa = [
  { question: "年齢は？", answer: "30代前半" },
  { question: "性別は？", answer: "おとこ" },
  { question: "血液型は？", answer: "B" },
  { question: "何型っぽいと言われる？", answer: "A？" },
  { question: "誕生日は？", answer: "7/2" },
  { question: "何月生まれっぽいと言われる？", answer: "夏っぽい？" },
  { question: "好きな食べ物は？", answer: "帰省した時に食べる寿司と大勢で食べるピザ" },
  {
    question: "嫌いな食べ物は？",
    answer: "漬物とか酢の物全般。たくあんにいたってはなんで大根が黄色いのか意味不明。いぶりがっこは許せる。",
  },
  { question: "好きな植物は？", answer: "モンステラ。家にあって成長著しいので見ていて楽しい" },
  {
    question: "好きなYouTuberは？",
    answer:
      "QuizKnock！これまでの動画全部見てる。「東大生100点は取り飽きたので人生最高得点を取る旅に出ます」って動画がかなり好き",
  },
  { question: "好きな色は？", answer: "ネイビー" },
  { question: "好きな四字熟語は？", answer: "諸行無常" },
  { question: "好きな漫画・アニメは？", answer: "ハガレン。ちょうどいい長さだし面白いし終わり方綺麗でかなり好き" },
  { question: "好きなゲームは？", answer: "モンハン。大学生の時1日20時間プレイしたことある。友達の家で(迷惑)" },
  { question: "ONE PIECEで好きなキャラクターは？", answer: "サボ" },
  { question: "NARUTOで好きなキャラクターは？", answer: "我愛羅" },
  {
    question: "銀魂で好きなキャラクターは？",
    answer: "沖田総悟と定春。大学の授業中に銀魂読んで笑いを堪えきれず吹き出したことがある",
  },
  {
    question: "好きな本は？",
    answer:
      "苦しかったときの話をしようか。これ読んで当時大企業から転職しようと思った。\n何度読み返しても泣けるくらいいい本。人生のバイブル",
  },
  { question: "好きな香りは？", answer: "レモン。グレープフルーツ。ゆず。柑橘系の香り全般的に好き" },
  { question: "好きなスポーツは？", answer: "ラケット系の競技は全般的に好き。あとスノボとボルダリング" },
  { question: "好きなサービスは？", answer: "Relux。旅行行くときは絶対ここで宿探す" },
  { question: "好きな季節は？", answer: "雨の少ない年の秋" },
  { question: "好きな時間は？", answer: "早起きできた時の早朝と夕方くらいの昼寝タイム" },
  { question: "犬派？猫派？", answer: "圧倒的柴犬派！！！" },
  {
    question: "好きなお菓子は？",
    answer: "ルマンド！開発した人を褒め称えたい。\nあと中身がギュッとなってるベイクドチーズケーキ",
  },
  {
    question: "お勧めのアプリは？",
    answer:
      "マックのモバイルオーダーはファストパス使ってるみたいで優越感ある。\n並んでる人みんな何で使わないのか不思議",
  },
  { question: "料理はしますか？", answer: "する。得意料理は大量に作る系のもの。おでん、肉じゃが、カレーなど" },
  { question: "あなたの趣味は？", answer: "最近はピアノ、ほぼ毎日弾いてる。" },
  {
    question: "好きな映画は？",
    answer:
      "バタフライエフェクト。セッション。ダイハード。ダークナイト。インセプション。アクション系はわりと全般的に好き",
  },
  { question: "得意だった教科は？", answer: "数学。理科。体育" },
  { question: "苦手だった教科は？", answer: "現代文" },
  { question: "弱点は？", answer: "くすぐりにはめっぽう弱い" },
  {
    question: "好きなジブリ映画は？",
    answer: "もののけ姫。幼少期に劇場で見た時、最初に出てくるタタリ神で軽くトラウマになったけど一番好き",
  },
  { question: "好きなディズニー映画は？", answer: "ディズニー映画あんま見たことないけどラプンツェルよかったな" },
  { question: "ランド派？シー派？", answer: "もちろんシー。ビールが飲めるから。あと真ん中の海でやるパレード好き" },
  { question: "初恋はいつで、どんな人だった？", answer: "小学校高学年。転校生だった。" },
  { question: "好きな異性のタイプは？", answer: "屈託なくよく笑う人" },
  { question: "幸せを感じる瞬間は？", answer: "2度寝する瞬間" },
  { question: "好きなアーティストは？", answer: "B'z。東京事変。緑黄色社会。SUPER BEAVER" },
  { question: "今一番気になっていることは？", answer: "ICL。視力めちゃくちゃ悪いからやろうか悩んでる" },
  {
    question: "これだけは絶対許せないこと",
    answer:
      "公的文書等における和暦。\n免許の更新日が平成32年で、令和に変換すると3年だと勘違いしてたけど実は令和2年が更新日だった。気づかず免許失効した。絶許。",
  },
  {
    question: "今までやってきた習い事は？",
    answer: "習い事ほとんどしてない。中学の時テニスやってたくらい。あと最近ピアノ習い始めた。",
  },
  { question: "インドア派？アウトドア派？", answer: "圧倒的にインドア派" },
  { question: "よく出没する場所は？", answer: "い、家…" },
  { question: "今1番行きたいところは？", answer: "ヨーロッパ旅行に行きたい。スペイン、イタリア、フランスあたり" },
  { question: "今1番欲しいものは？", answer: "自分に合ったワーキングチェア" },
  {
    question: "好きな場所は？",
    answer:
      "鴨川。綺麗だし散歩したり日向ぼっこするの気持ちいいしすごい落ち着く。\n天気の良い日にあそこで優雅に読書するのが最高に贅沢な時間に感じた",
  },
  { question: "人生で一度は行ってみたい場所は？", answer: "オーロラ見れるところ。ナイアガラの滝。ウユニ塩湖" },
  { question: "血液型診断についてどう思う？", answer: "エンタメとして楽しむ分にはいいのでは" },
  { question: "尊敬する人は？", answer: "森岡毅さん。ビジネスマンとして学ぶことしかない" },
]
