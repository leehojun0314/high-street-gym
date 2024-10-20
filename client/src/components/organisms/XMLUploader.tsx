import React, { forwardRef, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import FileInput from '../atoms/FileInput';
import PrimaryBtn from '../atoms/PrimaryBtn';
import ErrorMsg from '../atoms/ErrorMsg';
import { axiosAPI } from '@/libs/axiosAPI';
const XMLUploader = forwardRef(function (
  {
    tableName,
    onSuccess,
  }: // onError,
  {
    tableName: string;
    onSuccess: () => void;
    // onError: (message: string) => void;
  },
  ref: React.Ref<HTMLInputElement>,
) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select an XML file first');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);

      setIsUploading(true);
      setUploadProgress(0);

      await axiosAPI
        .post('/xml/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
            setUploadProgress(progress);
          },
        })
        .then((res) => {
          console.log('upload success:', res);
          setError('');
          onSuccess();
        })
        .catch((err: AxiosError) => {
          console.error('Error submitting class data:', err);
          // onError(err.response?.data as string);

          setError(err.response?.data as string);
        })
        .finally(() => {
          setIsUploading(false);
        });
    } catch (error) {
      console.log('unexpected error:', error);
      setError('Unexpected error');
    }
  };
  useEffect(() => {
    setError('');
  }, [file]);
  return (
    <div className='px-4 flex flex-col justify-center items-center'>
      {/* <input
				type='file'
				accept='.xml'
				onChange={handleFileChange}
				className='mb-4'
			/> */}
      <FileInput onChange={handleFileChange} ref={ref} />

      {isUploading && (
        <div className='py-4 w-full'>
          <progress
            className='progress progress-primary w-full'
            value={uploadProgress}
            max='100'
          ></progress>
          <span className='block text-center mt-2'>{uploadProgress}%</span>
        </div>
      )}
      {error && <ErrorMsg className='w-full block pt-4'>{error}</ErrorMsg>}
      <div className='w-full flex justify-center flex-row py-4'>
        <PrimaryBtn
          onClick={handleSubmit}
          className='text-white px-4 py-2 w-full'
          disabled={isUploading}
        >
          Submit {tableName} Data
        </PrimaryBtn>
      </div>
    </div>
  );
});
export default XMLUploader;
