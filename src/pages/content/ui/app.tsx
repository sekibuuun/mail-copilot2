import React, { useState, useEffect, CSSProperties } from 'react';
import axios from 'axios';

type mode = 'text' | 'subject';

const App: React.FC = () => {
  const [mode, setMode] = useState<mode>('text');

  const textMode = () => {
    chrome.storage.sync.set({ mode: 'text' }); // 本文
    chrome.storage.sync.get(['mode'], result => {
      setMode(result.mode);
    });
  };

  const subjectMode = () => {
    chrome.storage.sync.set({ mode: 'subject' }); // 件名
    chrome.storage.sync.get(['mode'], result => {
      setMode(result.mode);
    });
  };
  useEffect(() => {
    if (mode === 'text') {
      const handleTextClick = async (event: MouseEvent) => {
        const textElement = event.target as HTMLElement;
        const element = textElement.closest('.Am.aiL.Al.editable.LW-avf.tS-tW') as HTMLElement;
        if (!element) return;

        const apiKey = await chrome.storage.sync.get(['key']).then(result => result.key);
        const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
        const subject = subjectInput.value;

        getSuggest(element, apiKey, mode, subject);

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            element.style.color = 'black';
            document.removeEventListener('click', handleTextClick);
          } else if (e.shiftKey && e.key === 'Backspace') {
            e.preventDefault();
            element.textContent = '';
            element.style.color = 'black';
            getSuggest(element, apiKey, mode, subject);
          }
        };

        element.addEventListener('keydown', handleKeyDown);
      };

      document.addEventListener('click', handleTextClick);

      return () => {
        document.removeEventListener('click', handleTextClick);
      };
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'subject') {
      const handleSubjectClick = async (event: MouseEvent) => {
        const subjectElement = event.target as HTMLElement;
        const element = subjectElement.closest('.aoT') as HTMLInputElement;
        if (!element) return;

        const textInput = document.querySelectorAll('.Am.aiL.Al.editable.LW-avf.tS-tW');
        const text = textInput[0].textContent;

        const apiKey = await chrome.storage.sync.get(['key']).then(result => result.key);

        getSuggest(element, apiKey, mode, text);

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            element.style.color = 'black';
            document.removeEventListener('click', handleSubjectClick);
          } else if (e.shiftKey && e.key === 'Backspace') {
            e.preventDefault();
            element.value = '';
            element.style.color = 'black';
            getSuggest(element, apiKey, mode, text);
          }
        };

        element.addEventListener('keydown', handleKeyDown);
      };

      document.addEventListener('click', handleSubjectClick);

      return () => {
        document.removeEventListener('click', handleSubjectClick);
      };
    }
  }, [mode]);

  return (
    <div style={styles.selectMode}>
      <h3>生成モード選択</h3>
      <div style={styles.modeWrapper}>
        <label>
          <input type="radio" value="本文" checked={mode === 'text'} onChange={textMode} />
          本文
        </label>
        <label>
          <input type="radio" value="件名" checked={mode === 'subject'} onChange={subjectMode} />
          件名
        </label>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  selectMode: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '10px',
    gap: '10px',
  },
  modeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5px',
  },
};

function getSuggest(element: HTMLElement, apiKey: string, mode: mode, input: string) {
  if (mode === 'text') {
    postSubject(element, apiKey, mode, input);
  } else if (mode === 'subject') {
    postText(apiKey, mode, input, element);
  }

  element.style.color = 'gray';

  return element;
}

function postSubject(element: HTMLElement, apiKey: string, mode: mode, subject: string) {
  if (subject === '') {
    alert('件名を入力してください');
    return;
  }

  const url = `http://127.0.0.1:3000/mail_copilot/${apiKey}/${subject}/${mode}`;

  axios
    .get(url)
    .then(response => {
      const lines = response.data.split('\n');
      element.textContent = '';
      lines.forEach(line => {
        if (line.trim() !== '') {
          const newDiv = document.createElement('div');
          newDiv.textContent = line;
          element.appendChild(newDiv);
        }
      });
    })
    .catch(error => {
      if (error.message === 'Network Error') {
        alert('サーバーに接続できませんでした');
      } else if (error.message === 'Request failed with status code 500') {
        alert('APIキーが正しくありません');
      }
    });
}

function postText(apiKey: string, mode: mode, text: string, element: HTMLElement) {
  if (text === '') {
    alert('本文を入力してください');
    return;
  }

  const url = `http://127.0.0.1:3000/mail_copilot/${apiKey}/${text}/${mode}`;

  axios
    .get(url)
    .then(response => {
      const subjectInput = document.getElementsByName('subjectbox')[0] as HTMLInputElement;
      const lines = response.data.split('\n');
      const subjectLine = lines.find(line => line.trim() !== '');
      if (subjectLine && subjectInput) {
        subjectInput.value = subjectLine;
      }
      element.textContent = subjectLine;
    })
    .catch(error => {
      if (error.message === 'Network Error') {
        alert('サーバーに接続できませんでした');
      } else if (error.message === 'Request failed with status code 500') {
        alert('APIキーが正しくありません');
      }
    });
}

export default App;
