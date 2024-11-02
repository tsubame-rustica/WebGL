# Three.js・expressを用いたWebVRコンテンツ制作

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