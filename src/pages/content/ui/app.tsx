import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleClick = event => {
      const element = event.target.closest('.Am.aiL.Al.editable.LW-avf.tS-tW');
      if (element) {
        console.log('Element was clicked');
        getSubject(element);
        // GET
        const output = 'test';
        // サジェストを表示
        element.textContent = output;
        element.style.color = 'gray';

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

function getSubject(element) {
  const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
  const subject = subjectInput.value;
  element.textContent = 'test';
  console.log(subject);

  return '';
}

export default App;
