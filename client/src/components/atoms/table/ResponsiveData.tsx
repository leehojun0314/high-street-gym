export default function ResponseiveData({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <td
      className={`p-0 flex flex-col justify-center items-center text-center text-xs ${className}`}
    >
      {children}
    </td>
  );
}
