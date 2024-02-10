import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const handleClick = event => {
      const element = event.target.closest('.Am.aiL.Al.editable.LW-avf.tS-tW');
      if (element) {
        console.log('Element was clicked');
        postSubject();
      }
    };

    // ドキュメント全体に対して一度だけイベントリスナーを追加
    document.addEventListener('click', handleClick);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <div></div>;
}

function postSubject() {
  const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
  const subject = subjectInput.value;
  console.log(subject);

  const apply = (subject: string) => {
    const url = `http://127.0.0.1:3000/mail_copilot/${subject}`;
    axios
      .get(url)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  apply(subject);

  return '';
}

export default App;
