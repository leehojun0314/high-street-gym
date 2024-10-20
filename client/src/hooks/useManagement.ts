import { AppContext } from '@/contexts/AppContext';
import { axiosAPI } from '@/libs/axiosAPI';
import { TFields, TTable, TTableData } from '@/types';
import { excludeNulls, generateQueryString, remapData } from '@/utils';
import { AxiosError } from 'axios';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

export default function useManagement() {
  const navigate = useNavigate();
  const { user, isLoading: isLoadingContext } = useContext(AppContext);
  const [currentTable, setCurrentTable] = useState<string>('class');
  const [tables, setTables] = useState<TTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const xmlInputRef = useRef<HTMLInputElement>(null);
  const [tableDatas, setTableDatas] = useState<TTableData[]>([]);
  const [fields, setFields] = useState<TFields>({});

  const { modalProps: uploadModalProps, toggleModal: toggleUploadModal } =
    useModal({
      title: 'XML Upload',
      clickOutside: true,
      cancelBtn: true,

      onClose: () => {
        console.log('on modal close: ', xmlInputRef);
        if (xmlInputRef.current) {
          xmlInputRef.current.value = '';
        }
      },
    });
  const { modalProps: newModalProps, toggleModal: toggleNewModal } = useModal({
    title: 'New Data',
    clickOutside: true,
    cancelBtn: true,
    closeBtn: true,
    submitBtn: true,
    onSubmit: (evt: React.FormEvent<HTMLFormElement>) => {
      console.log('on submit: ', evt);
      evt.preventDefault();
      const form = new FormData(evt.currentTarget);
      console.log('form entries: ', form.entries());
      const data: Record<string, FormDataEntryValue | null> =
        Object.fromEntries(form.entries());
      console.log('data: ', data);
      const [error, remappedData] = remapData(data);
      if (error) {
        return;
      }
      axiosAPI
        .post(`/management/new/${currentTable}`, remappedData)
        .then((res) => {
          console.log('res:', res);
          return fetchData();
        })
        .then(() => {
          alert('Data created successfully.');
          toggleNewModal();
        })
        .catch((err: AxiosError) => {
          console.log('err: ', err);
          alert(err.response?.data);
        });
    },
    onClose: () => {
      console.log('on modal close: ', xmlInputRef);
      if (xmlInputRef.current) {
        xmlInputRef.current.value = '';
      }
    },
  });
  const { modalProps: filterModalProps, toggleModal: toggleFilterModal } =
    useModal({
      title: 'Filter',
      clickOutside: true,
      cancelBtn: true,
      closeBtn: true,
      submitBtn: true,
      onSubmit: (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log('on submit');
        const formdata = new FormData(evt.currentTarget);
        const data = Object.fromEntries(formdata.entries());
        console.log('data: ', data);
        const validatedData = excludeNulls(data);
        const queryString = new URLSearchParams(
          generateQueryString(validatedData),
        );
        axiosAPI
          .get(`/management?table=${currentTable}&${queryString}`)
          .then((res) => {
            console.log('filter res: ', res);
            setTableDatas(res.data.tableDatas);
            setFields(res.data.fields);
            toggleFilterModal();
          })
          .catch((err) => {
            console.log('filter error : ', err);
          });
      },
    });
  function handleTableChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentTable(e.target.value);
  }

  const fetchData = useCallback(async () => {
    const dataRes = await axiosAPI.get(`/management?table=${currentTable}`);
    console.log('data res: ', dataRes);
    setTableDatas(dataRes.data.tableDatas);
    setFields(dataRes.data.fields);
  }, [currentTable, setTableDatas, setFields]);
  const onUploadSuccess = useCallback(() => {
    console.log('upload success');
    window.alert('XML file uploaded successfully.');
    toggleUploadModal(false);
    fetchData();
  }, [fetchData, toggleUploadModal]);
  const handleEditSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const formData = new FormData(evt.currentTarget);
      const entries = formData.entries();
      const data = Object.fromEntries(entries);
      console.log('form data: ', formData);
      console.log('data: ', data);
      console.log('entries: ', entries);
      const [error, remappedData] = remapData(data);
      if (error) {
        return;
      }
      console.log('remappedData: ', remappedData);
      return axiosAPI
        .patch(`/management/${currentTable}`, remappedData)
        .then((res) => {
          console.log('patch res: ', res);
          alert('Data updated successfully.');
          return fetchData();
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    },
    [currentTable, fetchData],
  );
  const handleDeleteSubmit = useCallback(
    (tableData: TTableData) => {
      return (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        console.log('tableData: ', tableData);
        console.log('current table: ', currentTable);
        axiosAPI
          .delete(
            `/management/${currentTable}/${tableData[`${currentTable}_id`]}`,
          )
          .then((res) => {
            console.log('delete res: ', res);
            alert('Data deleted successfully.');
            return fetchData();
          });
      };
    },
    [currentTable, fetchData],
  );
  useEffect(() => {
    console.log('is loading context:', isLoadingContext);
    if (isLoadingContext) {
      setIsLoading(true);
      return;
    } else {
      console.log('user in management: ', user);
      if (user?.user_role !== 'ADMIN' && user?.user_role !== 'TRAINER') {
        alert('You are not authorized to access this page');
        navigate('/');
      } else {
        setIsLoading(true);
        if (user?.user_role === 'ADMIN') {
          setTables([
            'activity',
            'class',
            'location',
            'blog',
            'user',
            'booking',
          ]);
        } else {
          setTables(['class', 'activity']);
        }
        fetchData()
          .catch((err: AxiosError) => {
            console.log('err: ', err);
            alert(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [user, navigate, fetchData, isLoadingContext]);
  return {
    currentTable,
    tables,
    handleTableChange,
    isLoading: isLoading,
    onUploadSuccess,
    xmlInputRef,
    tableDatas,
    fields,
    handleDeleteSubmit,
    handleEditSubmit,
    uploadModalProps,
    toggleUploadModal,
    newModalProps,
    toggleNewModal,
    filterModalProps,
    toggleFilterModal,
  };
}
