export default function ResponsiveRow({ children }: React.PropsWithChildren) {
  return (
    <tr className='grid border border-gray-400 rounded-2xl grid-cols-3 grid-rows-2 gap-2 p-2'>
      {children}
    </tr>
  );
}
