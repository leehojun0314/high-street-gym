export default function ResponseiveData({
  children,
  className,
  style,
}: React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>) {
  return (
    <td
      className={`p-0 flex flex-col justify-center items-center text-center text-xs ${
        className ? '' : className
      }`}
      style={style}
    >
      {children}
    </td>
  );
}
