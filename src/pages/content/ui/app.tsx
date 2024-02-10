import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const handleClick = event => {
      const element = event.target.closest('.Am.aiL.Al.editable.LW-avf.tS-tW');
      if (element) {
        console.log('Element was clicked');
        postSubject(element);
      }
    };

    // ドキュメント全体に対して一度だけイベントリスナーを追加
    document.addEventListener('click', handleClick);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <div></div>;
}

function postSubject(element: Element) {
  const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
  const subject = subjectInput.value;
  console.log(subject);

  const apply = (subject: string) => {
    if (subject === '') {
      alert('件名を入力してください');
    }
    const url = `http://127.0.0.1:3000/mail_copilot/${subject}`;
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

  apply(subject);

  return '';
}

export default App;
