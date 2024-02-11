import React from 'react';
import '@pages/options/Options.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  apiKey: string;
};

const Options: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => {
    chrome.storage.sync.set({ key: data.apiKey }).then(() => {
      alert('APIキーが保存されました');
    });
  };

  return (
    <div className="options-container">
      <div className="options-content">
        <h1 className="options-title">Mail Copilot</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="options-form">
          <label htmlFor="apiKey" className="options-label">
            APIキー
          </label>
          <input id="apiKey" type="password" {...register('apiKey')} className="options-input" />
          <button type="submit" className="options-button">
            保存
          </button>
        </form>
      </div>
    </div>
  );
};

export default Options;
