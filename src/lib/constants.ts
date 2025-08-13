import {
  BarChart3Icon,
  FolderClosedIcon,
  GlobeIcon,
  LinkIcon,
  MousePointerClickIcon,
  SquareArrowUpRightIcon,
  TagIcon,
} from "lucide-react";

export const colors = Object.freeze({
  "s-secondary": "#eb5e28",
});

export const shortLinksMenuItems = [
  {
    title: "Links",
    url: "/links",
    icon: LinkIcon,
  },
  {
    title: "Domains",
    url: "/links/domains",
    icon: GlobeIcon,
  },
];

export const insightsMenuItems = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3Icon,
  },
];

export const libraryMenuItems = [
  {
    title: "Folders",
    url: "/links/folders",
    icon: FolderClosedIcon,
  },
  {
    title: "Tags",
    url: "/links/tags",
    icon: TagIcon,
  },
  {
    title: "UTM Templates",
    url: "/links/utm",
    icon: SquareArrowUpRightIcon,
  },
];
