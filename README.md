# Mail Copilot

## 概要
- メールの件名を入力すると、そのメールの本文を生成
- メールの本文を入力すると、そのメールの件名を生成

するGmail用のChrome拡張機能
## 開発背景
- 企業の方や大学の先生とメールを送る際に、本文を考える手間を省きたい
- メールの本文の概要となる、件名を考える手間を省きたい

## 使い方
1. OpenAIのAPIキーを取得
2. オプションページに、APIキーを入力して保存
3. Gmailのメール作成画面に行く
4. 件名から本文を生成したい場合
    - 生成モード選択で本文を選択
    - 件名を入力する
    - 本文をクリックすると、生成された本文が入力される
5. 本文から件名を生成したい場合
    - 生成モード選択で件名を選択
    - 本文を入力する
    - 件名をクリックすると、生成された件名が入力される
6. 生成されたものが気に入った場合
    - Shift + Enterを入力
    - 生成されたものを編集し、送信
7. 生成されたものが気に入らなかった場合
    - Shift + BackSpaceを入力
    - もう一度生成されるのを待つ

## 使用技術
- Vite + React + TypeScript
  - [https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)
- OpenAI API
- Ruby on Rails
  - [https://github.com/doora1202/mail-copilot-back](https://github.com/doora1202/mail-copilot-back)