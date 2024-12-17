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
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h3 {...headerProps}>{title}</h3>
      </a>
      <div>
        <Datetime datetime={date} action={action} />
      </div>
    </li>
  );
}
