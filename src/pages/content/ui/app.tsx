import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleClick = event => {
      const element = event.target.closest('.Am.aiL.Al.editable.LW-avf.tS-tW');
      if (element) {
        console.log('Element was clicked');
        getSubject(element);
      }
    };

    // ドキュメント全体に対して一度だけイベントリスナーを追加
    document.addEventListener('click', handleClick);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <div></div>;
}

function getSubject(element) {
  const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
  const subject = subjectInput.value;
  element.textContent = 'test';
  console.log(subject);

  return '';
}

export default App;
