import { readFileSync } from "fs";
import * as nodePath from "path";

const srcFolderDate = nodePath.resolve(`${nodePath.resolve()}/src/date`);

export const date = {
  menu: JSON.parse(readFileSync(`src/date/menu.json`, "utf8")),
  phone: JSON.parse(readFileSync(`${srcFolderDate}/phone.json`, "utf8")),
  social: JSON.parse(readFileSync(`${srcFolderDate}/social.json`, "utf8")),
  lang: JSON.parse(readFileSync(`${srcFolderDate}/lang.json`, "utf8")),
  competence: JSON.parse(
    readFileSync(`${srcFolderDate}/competence.json`, "utf8"),
  ),
  principle: JSON.parse(
    readFileSync(`${srcFolderDate}/principle.json`, "utf8"),
  ),
  project: JSON.parse(readFileSync(`${srcFolderDate}/project.json`, "utf8")),
  benefits: JSON.parse(readFileSync(`${srcFolderDate}/benefits.json`, "utf8")),
  how_work: JSON.parse(readFileSync(`${srcFolderDate}/how-work.json`, "utf8")),
  specialists: JSON.parse(
    readFileSync(`${srcFolderDate}/specialists.json`, "utf8"),
  ),
  career: JSON.parse(readFileSync(`${srcFolderDate}/career.json`, "utf8")),
  news: JSON.parse(readFileSync(`${srcFolderDate}/news.json`, "utf8")),
  contacts: JSON.parse(readFileSync(`${srcFolderDate}/contacts.json`, "utf8")),
};
