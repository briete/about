import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { Item } from "@utils/builder";

export interface Props {
  href?: string;
  frontmatter: Item;
}

export default function Card({ href, frontmatter }: Props) {
  const { title, date, action } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-sm hover:underline",
  };

  return (
    <li className="my-2">
      <a
        href={href}
        className="inline-block font-medium text-skin-accent underline-offset-4"
      >
        <h3 {...headerProps}>{title}</h3>
      </a>
      <div>
        <Datetime datetime={date} action={action} />
      </div>
    </li>
  );
}
