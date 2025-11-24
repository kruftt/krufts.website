import Apollo from './apollo';
import LostSkies from "./lost-skies";
import MetaView from "./meta-view";
import Tutoring from './tutoring'
import iQueue from './iQueue'
import IntMatMult from './IntMatMult'
import Valheim from './valheim'
import Riftbreaker from './riftbreaker'
import TethersEnd from './tethers-end'
import RibbitHole from './ribbit-hole'
import AIME from './aime'
import Lightbox from './lightbox'
import Quats from './quats'

const articleList = [
  Quats,
  LostSkies,
  Valheim,
  MetaView,
  Apollo,
  Tutoring,
  IntMatMult,
  Riftbreaker,
  TethersEnd,
  iQueue,
  RibbitHole,
  AIME,
  // Lightbox
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