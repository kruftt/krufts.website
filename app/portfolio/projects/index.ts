import Tutoring from './tutoring'
import TethersEnd from './tethers-end'
import ComputerMusic from './computer-music'
import Quats from './quats'
import Unity6 from './unity-6.3'
import UnityMods from './unity-mods'
import MiscMods from './misc-mods'
import EdTech from './edtech-tools'

const articleList = [
  Quats,
  Unity6,
  Tutoring,
  ComputerMusic,
  
  EdTech,
  UnityMods,
  MiscMods,
  TethersEnd,
]

const tags: Record<string, TagData> = {
  webdev: {
    name: 'webdev',
    color: 'bg-blue-500 hover:bg-blue-400',
    articles: [],
  },
  gamedev: {
    name: 'gamedev',
    color: 'bg-emerald-600 hover:bg-emerald-500',
    articles: [],
  },  
  edu: {
    name: 'edu',
    color: 'bg-yellow-600 hover:bg-yellow-500',
    articles: [],
  },
  music: {
    name: 'music',
    color: 'bg-red-500 hover:bg-red-400',
    articles: [],
  },
}
const articles: Record<string, ArticleData> = {}

for (const article of articleList) {
  articles[article.title] = article;
  for (const tagName of article.tags) {
    const tag = tags[tagName];
    if (!tag) {
      // tag = tags[tagName] = {
      //   name: tagName,
      //   articles: [],
      // };
    }
    tag.articles.push(article.title);
  }
}

const articleData = {
  articles,
  articleList: articleList.map((a) => a.title),
  tags
}

export default articleData