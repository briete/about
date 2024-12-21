import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Parser from "rss-parser";

export type Item = {
  title: string;
  url: string;
  date: string;
  action: string;
};

export type RSSItem = Pick<Item, "title" | "url" | "date">;

export const urlList = [
  "https://zenn.dev/briete/feed",
  "https://dev.classmethod.jp/author/sato-naoya/feed/",
  "https://speakerdeck.com/briete.rss",
];

export const fixedItems: Item[] = [
  {
    title:
      "クラスメソッドメンバーズポータルのバックエンドAPIをリプレイスしました",
    url: "https://dev.classmethod.jp/articles/classmethod-members-backend-replace/",
    date: "2024-06-18",
    action: `Posted on dev.classmethod.jp`,
  },
  {
    title:
      "[資料公開] Cloudflare Workersのユースケースと開発方法というタイトルで登壇しました #devio2023",
    url: "https://dev.classmethod.jp/articles/devio2023-cloudflare-workers-usecase/",
    date: "2023-07-15",
    action: `Posted on dev.classmethod.jp`,
  },
  {
    title: "ユーザーをAuth0に自動マイグレーションする",
    url: "https://dev.classmethod.jp/articles/oauth2-user-auth0-auto-migration/",
    date: "2023-03-22",
    action: `Posted on dev.classmethod.jp`,
  },
  {
    title:
      "KotlinとSpring Security 6.xを使って、Introspection Endpointでトークンを検証するOAuth2のリソースサーバ−を実装する",
    url: "https://dev.classmethod.jp/articles/kotlin-spring-security-6-x-oauth2-token-introspection/",
    date: "2023-03-01",
    action: `Posted on dev.classmethod.jp`,
  },
  {
    title:
      "Cloudflare Workers + Hono + Cloudflare D1を使って、CDNエッジのみで動くWebAPIを作ってみた",
    url: "https://dev.classmethod.jp/articles/getting-started-cloudflare-workers-hono-cloudflare-d1/",
    date: "2022-12-23",
    action: `Posted on dev.classmethod.jp`,
  },
  {
    title: "Auth0 を使って ID Token と Access Token の違いをざっくり理解する",
    url: "https://dev.classmethod.jp/articles/auth0-access-token-id-token-difference/",
    date: "2022-09-07",
    action: `Posted on dev.classmethod.jp`,
  },
  {
    title: "最近の業務での AWS サーバーレス開発を振り返ってみた",
    url: "https://dev.classmethod.jp/articles/serverless-develop-review/",
    date: "2022-05-16",
    action: `Posted on dev.classmethod.jp`,
  },
];

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

  allRows.push(...fixedItems);

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

dayjs.extend(relativeTime);

export function getHostFromURL(url: string) {
  const urlObj = new URL(url);
  return urlObj.hostname;
}
