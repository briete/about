import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Parser from "rss-parser";

export const urlList = [
  "https://zenn.dev/briete/feed",
  "https://dev.classmethod.jp/author/sato-naoya/feed/",
];

export type Item = {
  title: string;
  url: string;
  date: string;
  action: string;
};

export type RSSItem = {
  title: string;
  url: string;
  date: string;
};

const parser = new Parser();

export async function build(): Promise<Item[]> {
  const feed: RSSItem[] = [];
  for (const url of urlList) {
    const items = await fetchFeedItems(url);
    feed.push(...(items as any));
  }

  const allRows = feed.map(item => {
    return {
      date: item.date,
      title: item.title,
      url: item.url,
      action: `Posted on ${getHostFromURL(item.url)}`,
    };
  });

  return allRows.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

async function fetchFeedItems(url: string) {
  try {
    const feed = await parser.parseURL(url);
    if (!feed?.items?.length) return [];
    return feed.items.map(({ title, link, isoDate }) => {
      return {
        title,
        url: link,
        date: dayjs(isoDate).format("YYYY-MM-DD"),
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

/*
  catnose99/timeline (catnose99/timeline)
  Copyright 2021 catnose99
  https://opensource.org/licenses/mit-license.php
*/
dayjs.extend(relativeTime);

export function getHostFromURL(url: string) {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

export function getFaviconSrcFromHostname(hostname: string) {
  return `https://www.google.com/s2/favicons?sz=128&domain=${hostname}`;
}

export function formatDate(dateText: string, format = "YYYY-MM-DD") {
  const date = dayjs(dateText);
  const isRecent = Math.abs(date.diff(Date.now(), "month")) < 6;

  return isRecent ? date.fromNow() : date.format(format);
}

export const groupByKey = <K, V>(
  array: readonly V[],
  getKeyFunc: (cur: V, idx: number, src: readonly V[]) => K
): [K, V[]][] =>
  Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKeyFunc(cur, idx, src);
      const items = map.get(key);
      if (items) items.push(cur);
      else map.set(key, [cur]);
      return map;
    }, new Map<K, V[]>())
  );
