# Three.js・expressを用いたWebVRコンテンツ制作

## 概要
- VRアトラクション用に作成されたアプリケーション
- `index.html`のGETパラーメータである`id`の値を使用することで、特定の`id`を持つ`index.html`を開いているユーザーにのみVRを開始できる
- `qr-generate.html`では`server.js`にリクエストを送信してデータベースに登録しidを取得  
取得したidがGETパラメータに含まれたURLをQRコードにして表示する
- `admin.html`でスタートボタンを押すと特定の`id`を持つ`index.html`のVRを開始することができる

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
- js-cookie

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



## データベース
|カラム名|型|説明|
|-----------|-----------|-|
|id         |int        |VRアトラクションを管理する用（登録時に自動で付与）|
|state      |varchar(50)|登録されたidのVRの稼働状態（waiting, inProgress, complete）|
|startTime  |time       |登録されたidのVRの開始時間|