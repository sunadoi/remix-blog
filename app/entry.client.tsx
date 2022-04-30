import { RemixBrowser } from "@remix-run/react"
import { hydrate } from "react-dom"

// NOTE: react18にupdateすると本番環境でindex.tsxのみエラーになる
// おそらくSSRでserverとclientに齟齬が出ているため。解消するまではreact17にする
// https://reactjs.org/docs/error-decoder.html/?invariant=418
hydrate(<RemixBrowser />, document)
