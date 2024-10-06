## 動作環境
- UBUNTU(Xserver VPS)
- vite
- react
- threejs

## 手順
1.  Node.jsをインストールする
    ```bash
    nvm install stable --latest-npm
    nvm alias default stable
    ```
2.  viteを用いて環境構築をする
    ```bash
    npm create vite@latest
    ```
    - `Project Name`は任意の名前にする
    - フレームワークは`React`，`Select a variant`は`JavaScript`を選択
    - セットアップ完了後，指示に従い
        ```bash
        cd 環境構築したディレクトリ
        npm install
        ```
        を実行する
    - 動作検証は以下のコマンドを実行する
    ```bash
    npm run dev
    ```

## クローンして実行する場合
- 以下のコマンドでクローン
    ```bash
    git clone https://github.com/tsubame-rustica/WebGL.git
    ```
- クローンしたディレクトリを開き，以下のコマンドを実行する
    ```bash
    npm install
    ```
- 動作検証は以下のコマンドを実行する
    ```bash
    npm run dev
    ```
