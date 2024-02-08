import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
          const element = document.querySelector('.Am.aiL.Al.editable.LW-avf.tS-tW');
          if (element) {
            element.addEventListener('click', () => {
              console.log('Element was clicked');
              // ここに関数を書く
              element.textContent = 'aaa'; // Set the text content to 'aaa'
              console.log(localStorage.getItem('apiKey'));
              // optionsにあるものをpopupに移動させ、apikeyが取得できるか確認する
            });
          }
        }
      });
      // for (const mutation of mutationsList) {
      //   if (mutation.type === 'childList') {
      //     const element = document.querySelector('.Am.aiL.Al.editable.LW-avf.tS-tW');
      //     if (element) {
      //       element.addEventListener('click', () => {
      //         console.log('Element was clicked');
      //       });
      //     }
      //   }
      // }
    });

    //  ドキュメントに設定されたパラメータで観察を開始
    observer.observe(document.body, { childList: true, subtree: true });

    //  コンポーネントがアンマウントされたときにオブザーバーを切断
    return () => observer.disconnect();
  }, []);

  return <div></div>;
}

export default App;
