// import type { CollectionEntry } from "astro:content";
import { build } from "./builder";

export const sortedPosts = await build();

// const _getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
//   posts
//     .filter(({ data }) => !data.draft)
//     .sort(
//       (a, b) =>
//         Math.floor(new Date(b.data.pubDatetime).getTime() / 1000) -
//         Math.floor(new Date(a.data.pubDatetime).getTime() / 1000)
//     );

// export default getSortedPosts;
