# Three.js・expressを用いたWebVRコンテンツアプリケーション

## 概要
- VRアトラクション用に作成されたアプリケーション

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
|state      |varchar(50)|登録されたidのVRの稼働状態（waiting, inProgress, complete）|
|startTime  |time       |登録されたidのVRの開始時間|

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
※ Nginxの構築手順は余力があれば残しておく
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

### viteでプロジェクトを作成する
1. viteをインストールする
   ```sh
   npm install -g vite
   ```

2. ディレクトリを作成し開く

3. プロジェクトを作成する  
   プロジェクト名は任意
   Reactを選択 → JavaScriptを選択
   ```sh
   npm create vite@latest
   ```

### ビルドまで
1. Threejsをインストール
   ```sh
   npm install three
   ```

2. 完成したらビルド
   ```sh
   npm run build
   ```

### サーバーサイド
1. サーバー側のプログラムを用意する(今回はserver.jsというファイル名)

2. `node`+ファイル名コマンドでも起動できる
   ```sh
   node server.js
   ```
   コマンドを終了すると止まる

3. 常時実行するために`pm2`をインストール
   ```sh
   npm i -g pm2
   ```

4. `server.js`を`pm2`で起動
   ```sh
   pm2 start server.js
   ```

#### `pm2`のその他コマンド
-  起動しているアプリのリスト
   ```sh
   pm2 list
   ```
   
-  再起動（変更があれば更新される）
   ```sh
   pm2 restart アプリ名
   ``` 

-  起動しているアプリを停止する
   ```sh
   pm2 stop アプリ名
   ```