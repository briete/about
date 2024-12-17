import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
  action: string;
}

export default function Datetime({
  datetime,
  size = "sm",
  className,
  action,
}: Props) {
  return (
    <div className={`flex basis-1 space-x-2 opacity-80 ${className}`}>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime datetime={datetime} />
        <span> {action}</span>
      </span>
    </div>
  );
}

const FormattedDatetime = ({ datetime }: { datetime: string | Date }) => {
  const myDatetime = new Date(datetime);

  const date = myDatetime.toLocaleDateString(LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {date}
      <span className="sr-only">&nbsp;at&nbsp;</span>
    </>
  );
};
