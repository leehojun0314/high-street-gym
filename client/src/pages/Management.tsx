import PrimaryBtn from '@/components/atoms/PrimaryBtn';
import SecondaryBtn from '@/components/atoms/SecondaryBtn';
import Skeleton from '@/components/atoms/Skeleton';
import Modal from '@/components/organisms/Modal';
import MTCard from '@/components/molecules/MTCard';
import Select from '@/components/molecules/Select';
import XMLUploader from '@/components/organisms/XMLUploader';
import useManagement from '@/hooks/useManagement';
import MTNewFields from '@/components/molecules/MTNewFields';
import MTFilterFields from '@/components/molecules/MTFilterFields';
export default function Management() {
  const {
    tables,
    handleTableChange,
    currentTable,
    isLoading,
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
  } = useManagement();

  return (
    <main className='p-4 flex flex-col gap-5'>
      <h1 className=' text-2xl font-bold text-center md:text-start'>
        Management
      </h1>
      <div className={`flex flex-row justify-center gap-1 w-full sticky`}>
        {isLoading ? (
          <Skeleton className='w-full h-12 rounded-full' />
        ) : (
          <Select onChange={handleTableChange} value={currentTable}>
            {tables.map((table) => (
              <option key={table} value={table}>
                {table}
              </option>
            ))}
          </Select>
        )}
        <PrimaryBtn
          className='w-20'
          onClick={() => {
            toggleNewModal();
          }}
        >
          New
        </PrimaryBtn>
        <button
          className='btn btn-warning w-20'
          onClick={() => {
            toggleUploadModal();
          }}
        >
          Upload
        </button>
        <SecondaryBtn
          className='w-20'
          onClick={() => {
            toggleFilterModal();
          }}
        >
          Filters
        </SecondaryBtn>
      </div>
      <Modal {...filterModalProps}>
        <div className='flex flex-col'>
          {Object.keys(fields).map((field) => (
            <MTFilterFields key={field} field={field} fields={fields} />
          ))}
        </div>
      </Modal>
      <Modal {...newModalProps}>
        <div className='flex flex-col'>
          {Object.keys(fields).map((field) => (
            <MTNewFields key={field} field={field} fields={fields} />
          ))}
        </div>
      </Modal>
      <Modal {...uploadModalProps}>
        <XMLUploader
          tableName={currentTable}
          onSuccess={onUploadSuccess}
          ref={xmlInputRef}
        />
      </Modal>
      <div className='flex flex-col gap-4'>
        {isLoading ? (
          <Skeleton className='w-full h-20' />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tableDatas.map((data, index) => (
              <MTCard
                tableData={data}
                key={index}
                handleEditSubmit={handleEditSubmit}
                handleDeleteSubmit={handleDeleteSubmit}
                fields={fields}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
