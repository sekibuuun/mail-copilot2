import React, { useEffect, useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  useEffect(() => {
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'childList' && !isLogged) {
          const element = document.querySelector('.Am.aiL.Al.editable.LW-avf.tS-tW');
          if (element) {
            element.addEventListener('click', () => {
              console.log('Element was clicked');
            });
            setIsLogged(true);
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
  }, [isLogged]);

  return (
    <div>
      <h1>App</h1>
    </div>
  );
}

export default App;
