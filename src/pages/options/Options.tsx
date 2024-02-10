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
      console.log('apiKeyが保存されました');
    });
  };

  return (
    <div className="options">
      <h1>APIキー入力画面</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="apiKey">APIキー</label>
        <input id="apiKey" {...register('apiKey')} />
        <button type="submit">保存</button>
      </form>
    </div>
  );
};

export default Options;
