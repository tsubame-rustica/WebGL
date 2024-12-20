# Three.js・expressを用いたWebVRアプリケーション

## 概要

   このアプリケーションのテーマは宇宙旅行で様々な惑星や隕石を通りながら新たな惑星に向かうというテーマである。
   このアプリケーションを実行すると宇宙が映し出され、惑星の周りを回ったり隕石を避けながら新たな惑星に到着するまでアトラクションが続く。

## 工夫した点

   - スマートフォンでもVR体験ができるようにThreejsを使用して実装
   
   - 単純に進むだけではなく旋回や視点移動などの制御をしている

   - データベースを使用することでユーザーのステータスを管理しやすくしている

   - 任意の時間で開始できるようにポーリングでサーバーと通信している


## 詳細
- VRコンテンツのページ(index.html)

   - WebVRコンテンツを再生するためのページ

   - URLにidを持たせることで特定のユーザーのみにVRコンテンツを再生することができる

   - blenderで作成したワールドをThreejsで読み込んで表示している

   - 事前にデータの読み込みを行い、バックエンドに定期的に問い合わせをして自身のステータスが「進行中」になるとVRコンテンツが開始する

- 受付用ページ(qr-generate.html)

   - 利用者にQRコードを読み込んでもらいVRコンテンツのページに遷移してもらうためのページ

   - サーバーからデータベースに情報を登録しidを取得する

   - 取得したidをGETパラメータに持つVRコンテンツのページのURLをQRコードとして表示して利用者に遷移してもらう

- 管理者用ページ(admin.html)

   - 特定のユーザーのVRコンテンツを再生するためのページ

   - スタートボタンを押すと開始を待っている利用者のステータスを進行中に変更する

- サーバー(server.js)

   - expressを使用している

   - pm2で常時実行

   - 主な役割はデータベースと通信し、利用者のステータスを書き換えたり確認して値を返したりすることである

相関図
   ![相関図](https://github.com/user-attachments/assets/881c67d4-b2f9-4a14-9ada-7a361a703772)


## データベース
|カラム名|型|説明|
|-----------|-----------|-|
|id         |int        |VRアトラクションを管理する用（登録時に自動で付与）|
|state      |varchar(50)|登録されたidのVRコンテンツの稼働状態（waiting, inProgress, complete）|
|startTime  |time       |登録されたidのVRコンテンツの開始時間|

## 環境

- VPSサーバー（Ubuntu）- XVPS

- Nginx(1.18.0)

- Node.js(22.9.0)

- vite(10.9.0)

- MySQL(8.0.39)

### npmモジュール
#### フロントエンド

- three

- qrcode

#### サーバーサイド

- express

- mysql2

- cors

- pm2

## 環境構築
### Node.jsを導入する

1. サーバーにログインする

2. 好みのシェルを用意する

3. 以下のコマンドでnvmをインストールする
   ```sh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   ```

4. nvmからNode.jsをインストールする
   ```sh
   nvm install --lts
   ```

### このプロジェクトを実行する手順
1. 任意のディレクトリでリポジトリをクローンする
   ```sh
   git clone https://github.com/tsubame-rustica/WebGL.git
   ```

2. クローンしたディレクトリに移動して以下のコマンドでモジュールをインストールする
   ```sh
   npm install
   ```

3. 以下のコマンドを実行し<ins>[デモページ](http://localhost:5173/demo.html)</ins>を開く
   ```sh
   npm run dev
   ```
