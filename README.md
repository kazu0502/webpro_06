# webpro_06

Webプログラミングの演習用リポジトリ。

## week9：データの詳細表示

`webpro_06`ディレクトリで、以下を実行する。

```sh
npm install
node app5.js
```

- 駅一覧：<http://localhost:8080/keiyo2>
- 駅詳細の例：<http://localhost:8080/keiyo2/0>
- 駅追加フォーム：<http://localhost:8080/public/keiyo2_add.html>

データは変数内に保存するため、再起動すると初期状態に戻る。
`npm start`は`app4.js`を起動するので、この演習では`node app5.js`を使用する。

## レポート用システムの設計

[MHXX関連システムの設計仕様書](mhxx_plan.md)

- モンスター図鑑
- 武器図鑑
- クエスト管理（クリア状況の記録を含む）

MHXX関連の3つの機能は設計段階であり、実装はREST APIの授業内容に合わせて進める。
