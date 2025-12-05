import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://briete.me/", // replace this with your deployed domain
  author: "Sat Naing",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "briete.me",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/briete",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/briete5814/",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/briete/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/briete_ns",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
];
