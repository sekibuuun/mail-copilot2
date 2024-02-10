import React from 'react';
import './Popup.css';

const Popup = () => {
  return (
    <div className="popup">
      <h1>使い方</h1>
      <ol>
        <li>
          <a href="chrome-extension://ieemabahhjiffamhbjkpapdmpgigajei/src/pages/options/index.html" target="_blank">
            こちら
          </a>
          からOpenAIのAPIキーを設定
        </li>
        <li>
          <a href="https://mail.google.com/" target="_blank" rel="noreferrer">
            Gmail
          </a>
          にアクセス
        </li>
        <li>メールを新規作成</li>
        <li>件名を入力</li>
        <li>本文にカーソルを合わせる</li>
        <ul>
          <li>
            生成された文章を<span className="bold">反映</span>させる場合
          </li>
          <ul>
            <li>Shift と Enter を同時に押す</li>
          </ul>
          <li>
            生成された文章を<span className="bold">削除</span>する場合
          </li>
          <ul>
            <li>Shift と Backspace を同時に押す</li>
          </ul>
        </ul>
      </ol>
    </div>
  );
};

export default Popup;
