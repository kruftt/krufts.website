import ArticleHeader from "@/components/portfolio/article-header"

const data: ArticleData = {
  title: 'iQueue',
  tags: ['edu', 'webdev'],
  links: [
    ['Github', 'https://github.com/kruftt/iQueue'],
    ['Project Page', 'https://hci.stanford.edu/courses/cs147/2017/au/projects/education/iqueue/'],
  ],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        <h2>iQueue</h2>
      </ArticleHeader>
      <div>
        As part of a group project focused on UI Design we used the <a href="https://expo.dev">Expo framework</a> to implement a mobile app that automated the process of queuing for help during office hours. For our interface we used React Native, Redux, and a cross-platform component library. This project involved successive design and prototyping iterations with focus on the design process and concluded with a live demonstration at a public exhibition.
      </div>
      <div className="mt-4">
        <img
          className="max-h-150 m-auto"
          src="https://hci.stanford.edu/courses/cs147/2017/au/projects/education/iqueue/images/iqueuemain.png"
          alt="iQueue"
        />
      </div>
    </article>
  )
}

export default data