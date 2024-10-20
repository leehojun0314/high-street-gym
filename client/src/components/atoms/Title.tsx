export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`text-3xl font-bold text-center ${className}`}>
      {children}
    </h1>
  );
}
