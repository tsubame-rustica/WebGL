## 動作環境
- Windows
- WSL2
- vite
- react
- threejs

## 手順
1.  powershellを開き`wsl`を実行する
2.  Node.jsをインストールするためにnvmをインストールする
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
3.  シェルを再読み込みする
    - bash
        ```bash
        source ~/.bash_profile
        ```
    - zsh
        ```bash
        source ~/.zshrc
        ```
4.  Node.jsをインストールする
    ```bash
    nvm install stable --latest-npm
    nvm alias default stable
    ```
5.  viteを用いて環境構築をする
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