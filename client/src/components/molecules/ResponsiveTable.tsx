export default function ResponsiveTable({ children }: React.PropsWithChildren) {
  return (
    <div className='w-full border-none overflow-visible md:border md:border-black md:rounded-2xl md:overflow-auto'>
      <table className='block w-full'>
        <tbody className='flex flex-col gap-2'>{children}</tbody>
      </table>
    </div>
  );
}
