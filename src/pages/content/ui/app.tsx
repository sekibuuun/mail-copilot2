import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const handleClick = event => {
      const element = event.target.closest('.Am.aiL.Al.editable.LW-avf.tS-tW');
      if (element) {
        console.log('Element was clicked');
        chrome.storage.sync.get(['key']).then(result => {
          const apiKey = result.key;

          // ここにGETリクエストを送る処理を書いて
          const output = postSubject(element, apiKey);

          // サジェストを表示
          element.textContent = output;
          element.style.color = 'gray';
        });

        element.addEventListener('keydown', function (e) {
          if (e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            console.log('shift + Enterが押された');
            // サジェストを決定
            element.style.color = 'black';
          }
          if (e.shiftKey && e.key === 'Backspace') {
            e.preventDefault();
            console.log('shift + Backspaceが押された');
            // サジェストを削除
            element.textContent = '';
            element.style.color = 'black';
          }
        });
      }
    };

    // ドキュメント全体に対して一度だけイベントリスナーを追加
    document.addEventListener('click', handleClick);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <div></div>;
}

function postSubject(element: Element, apiKey: string) {
  const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
  const subject = subjectInput.value;
  console.log(subject);

  const apply = (subject: string) => {
    if (subject === '') {
      alert('件名を入力してください');
    }
    const url = `http://127.0.0.1:3000/mail_copilot/${apiKey}/${subject}`;
    axios
      .get(url)
      .then(response => {
        console.log(response);
        element.textContent = response.data;
      })
      .catch(error => {
        console.log(error);
        if (error.message === 'Network Error') {
          alert('サーバーに接続できませんでした');
        }
        if (error.message === 'Request failed with status code 500') {
          alert('APIキーが正しくありません');
        }
      });
  };

  const response = apply(subject);

  return response;
}

export default App;
