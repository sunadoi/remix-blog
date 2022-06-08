import { Card, Divider, Group, Text, Image, Badge } from "@mantine/core"
import type { FC } from "react"

import QAImage from "@/assets/qa.png"
import { useMediaQueryMax } from "@/hooks/useMediaQuery"

export const QACard: FC = () => {
  const [smallerThanMd] = useMediaQueryMax("sm", true)

  return (
    <Card radius="md" p="sm" pb="xl" shadow="xs">
      <Group position="center" direction="column" spacing="xs">
        <Image src={QAImage} alt="" fit="contain" />
      </Group>
      {qa.map((e, index) => (
        <Group direction="column" key={e.question} spacing="sm">
          <Divider mt="md" mb="sm" size="xs" className="w-[100%]" />
          <Group ml="md">
            <Badge radius="md" py="sm" variant="filled" size="md">
              <Text>Q{index + 1}</Text>
            </Badge>
            <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold">
              {e.question}
            </Text>
          </Group>
          <Group ml="md" align="start">
            <Badge radius="md" py="sm" variant="outline" size="md">
              <Text>A{index + 1}</Text>
            </Badge>
            <Text
              sx={(theme) => ({ color: theme.other.primary })}
              mt={smallerThanMd ? 0 : 4}
              className="max-w-[60vw] whitespace-pre-wrap break-words"
            >
              {e.answer}
            </Text>
          </Group>
        </Group>
      ))}
    </Card>
  )
}

//50mon.jp/q/513
const qa = [
  { question: "年齢", answer: "30代前半" },
  { question: "性別", answer: "おとこ" },
  { question: "血液型は？", answer: "B" },
  { question: "何型っぽいと言われる？", answer: "A？" },
  { question: "何月生まれっぽいと言われる？", answer: "夏っぽい？" },
  { question: "好きな食べ物は？", answer: "帰省した時に食べる寿司と大勢で食べるピザ" },
  {
    question: "嫌いな食べ物は？",
    answer: "漬物とか酢の物全般。たくあんにいたってはなんで大根が黄色いのか意味不明。いぶりがっこは許せる。",
  },
  { question: "好きな色は？", answer: "ネイビー" },
  { question: "好きな漫画・アニメは？", answer: "" },
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
  { question: "好きな季節は？", answer: "雨の少ない年の秋" },
  { question: "好きな花は？", answer: "" },
  { question: "犬派？猫派？", answer: "圧倒的柴犬派！！！" },
  { question: "お勧めのアプリは？", answer: "マックのモバイルオーダーはファストパス使ってるみたいで優越感ある" },
  { question: "どんな大人になりたい？(憧れた？)", answer: "威厳のある渋いダンディな大人(無理)" },
  {
    question: "好きなお菓子は？",
    answer: "ルマンド！開発した人を褒め称えたい。あと中身がギュッとなってるベイクドチーズケーキ",
  },
  { question: "マイコレクションは？", answer: "" },
  {
    question: "好きなTVは？",
    answer: "そもそもテレビを見ること自体ほぼないけどたまに見るのは東大王。あと昔はしゃべくり007だけはずっと見てた",
  },
  { question: "好きなキャラクターは？", answer: "" },
  { question: "あなたの趣味は？", answer: "最近はピアノ、ほぼ毎日弾いてる。あとボルダリング" },
  { question: "よく出没する場所は？", answer: "い、家…？" },
  {
    question: "好きな映画は？",
    answer:
      "バタフライエフェクト。セッション。ダイハード。ダークナイト。インセプション。アクション系はわりと全般的に好き",
  },
  { question: "あなたの持論は？", answer: "" },
  {
    question: "好きなジブリ映画は？",
    answer: "もののけ姫。幼少期に劇場で見たけど最初に出てくるタタリ神に軽くトラウマになったけど一番好き",
  },
  { question: "好きなディズニー映画は？", answer: "ほぼ見たことないけどラプンツェルよかったな" },
  { question: "ランド派？シー派？", answer: "もちろんシー。ビールが飲めるから。あと真ん中の海でやるパレード好き" },
  { question: "家族構成は？", answer: "3人兄弟末っ子" },
  { question: "初恋はいつで、どんな人だった？", answer: "小学校高学年。転校生だった。" },
  { question: "好きな異性のタイプは？", answer: "屈託なくよく笑う人" },
  { question: "恋愛は積極的？消極的？", answer: "ガンガン行こうぜ" },
  { question: "幸せを感じる瞬間は？", answer: "" },
  { question: "好きなアーティストは？", answer: "B'z。東京事変。緑黄色社会。SUPER BEABER" },
  { question: "好きな曲は？", answer: "" },
  { question: "好きな女優さんは？", answer: "" },
  { question: "好きな男優さんは？", answer: "香川照之" },
  { question: "インドア派？アウトドア派？", answer: "圧倒的にインドア" },
  { question: "似てるといわれたものは？", answer: "もの！？w" },
  { question: "好きな場所は？", answer: "" },
  { question: "思い出の場所は？", answer: "" },
  { question: "お化粧はナチュラル？ギャルメイク？", answer: "すっぴん" },
  { question: "血液型診断についてどう思う？", answer: "エンタメとして楽しむ分にはいいのでは" },
  { question: "異性の理想のファッションは？", answer: "夏はノースリーブ、冬はリブニットが最強" },
  { question: "甘えんぼう？", answer: "" },
  { question: "寂しがり屋？", answer: "全然" },
  { question: "寒いところor暑いところ", answer: "涼しいところ" },
  { question: "尊敬する有名人は？", answer: "森岡毅" },
  { question: "最後に日付を書いてね★", answer: "2022/06/08" },
]
