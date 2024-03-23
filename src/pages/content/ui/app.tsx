import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [judgeMode, setJudgeMode] = useState<number>(1);

  const textMode = () => {
    chrome.storage.sync.set({ mode: 1 }); // 本文
    chrome.storage.sync.get(['mode'], result => {
      setJudgeMode(result.mode);
    });
    console.log('本文を生成');
  };

  const subjectMode = () => {
    chrome.storage.sync.set({ mode: 2 }); // 件名
    chrome.storage.sync.get(['mode'], result => {
      setJudgeMode(result.mode);
    });
    console.log('件名を生成');
  };

  useEffect(() => {
    // 本文を生成
    if (judgeMode === 1) {
      const textHandleClick = async event => {
        const element = event.target.closest('.Am.aiL.Al.editable.LW-avf.tS-tW');
        if (element) {
          chrome.storage.sync.get(['mode'], result => {
            setJudgeMode(result.mode);
          });
          console.log('本文がクリックされた');
          const apiKey = await chrome.storage.sync.get(['key']).then(result => result.key);
          const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
          const subject = subjectInput.value;

          getSuggest(element, apiKey, judgeMode, subject);

          element.addEventListener('keydown', function (e) {
            if (e.shiftKey && e.key === 'Enter') {
              e.preventDefault();
              console.log('shift + Enterが押された');
              // サジェストを決定
              element.style.color = 'black';
              document.removeEventListener('click', textHandleClick);
            }
            if (e.shiftKey && e.key === 'Backspace') {
              e.preventDefault();
              console.log('shift + Backspaceが押された');
              // サジェストを削除
              element.textContent = '';
              element.style.color = 'black';

              getSuggest(element, apiKey, judgeMode, subject);
            }
          });
        }
      };
      // ドキュメント全体に対して一度だけイベントリスナーを追加
      document.addEventListener('click', textHandleClick);

      // コンポーネントがアンマウントされたときにイベントリスナーを削除
      return () => document.removeEventListener('click', textHandleClick);
    }
  }, [judgeMode]);

  useEffect(() => {
    if (judgeMode === 2) {
      // 件名を生成
      const subjectHandleClick = async event => {
        const element = event.target.closest('.aoT');
        if (element) {
          chrome.storage.sync.get(['mode'], result => {
            setJudgeMode(result.mode);
          });
          const textInput = document.querySelectorAll('.Am.aiL.Al.editable.LW-avf.tS-tW');
          const text = textInput[0].textContent;
          console.log('本文：' + text);
          console.log('件名がクリックされた');

          const apiKey = await chrome.storage.sync.get(['key']).then(result => result.key);

          getSuggest(element, apiKey, judgeMode, text);

          element.addEventListener('keydown', function (e) {
            if (e.shiftKey && e.key === 'Enter') {
              e.preventDefault();
              console.log('shift + Enterが押された');
              // サジェストを決定
              element.style.color = 'black';
              document.removeEventListener('click', subjectHandleClick);
            }
            if (e.shiftKey && e.key === 'Backspace') {
              e.preventDefault();
              console.log('shift + Backspaceが押された');

              // サジェストを削除
              element.value = '';
              element.style.color = 'black';

              getSuggest(element, apiKey, judgeMode, text);
            }
          });
        }
      };

      // ドキュメント全体に対して一度だけイベントリスナーを追加
      document.addEventListener('click', subjectHandleClick);

      // コンポーネントがアンマウントされたときにイベントリスナーを削除
      return () => document.removeEventListener('click', subjectHandleClick);
    }
  }, [judgeMode]);

  return (
    <div>
      <h3>生成モード選択</h3>
      <button onClick={() => subjectMode()}>件名</button>
      <button onClick={() => textMode()}>本文</button>
    </div>
  );
}

function getSuggest(element, apiKey, judgeMode, input) {
  if (judgeMode === 1) {
    const text = postSubject(element, apiKey, judgeMode, input);
    element.textContent = text;
  }
  if (judgeMode === 2) {
    const subject = postText(apiKey, judgeMode, input);
    element.textContent = subject;
  }
  // ここにGETリクエストを送る処理を書いて
  element.style.color = 'gray';

  return element;
}

function postSubject(element: Element, apiKey: string, judgeMode: number, subject: string) {
  const applyText = (subject: string, judgeMode: number) => {
    if (subject === '') {
      alert('件名を入力してください');
    }
    const url = `http://127.0.0.1:3000/mail_copilot/${apiKey}/${subject}/${judgeMode}`;
    console.log(url);
    axios
      .get(url)
      .then(response => {
        console.log(response);
        const lines = response.data.split('\n');
        lines.forEach(line => {
          const newDiv = document.createElement('div');
          newDiv.textContent = line;
          element.appendChild(newDiv);
          // 空行を削除
          if (line === '') {
            newDiv.remove();
          }
        });
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

  const response = applyText(subject, judgeMode);

  return response;
}

function postText(apiKey: string, judgeMode: number, text: string) {
  const applyText = (text: string, judgeMode: number) => {
    if (text === '') {
      alert('本文を入力してください');
    }
    const url = `http://127.0.0.1:3000/mail_copilot/${apiKey}/${text}/${judgeMode}`;
    console.log(url);

    axios
      .get(url)
      .then(response => {
        const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
        console.log(response);
        const lines = response.data.split('\n');
        const subjectLine = lines.find(line => line.trim() !== '');
        if (subjectLine && subjectInput) {
          subjectInput.value = subjectLine;
        }
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

  const response = applyText(text, judgeMode);

  return response;
}

export default App;
