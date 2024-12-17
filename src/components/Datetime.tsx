import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  className?: string;
  action: string;
}

export default function Datetime({ datetime, className, action }: Props) {
  return (
    <div className={`flex ${className}`}>
      <span className="text-xs italic">
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
