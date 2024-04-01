export function Metric(props: Readonly<{
  label: string;
  value: number;
}>) {
  return (
    <span className="basis-1/3 flex flex-row items-center justify-center">
      <span className="flex flex-col sm:flex-row items-center sm:items-baseline">
        <span className="text-2xl sm:text-4xl">{props.value}</span>
        <span className="ml-1 text-muted-foreground">{props.label}</span>
      </span>
    </span>
  );
}