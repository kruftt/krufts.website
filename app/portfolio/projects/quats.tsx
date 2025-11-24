import ArticleHeader from "@/components/portfolio/article-header"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import JsdImage from "@/components/general/jsdelivr-image";
import { QuatsCycle } from "@/components/quats/quats-cycle";
import QuaternionVisualizer from "@/components/quats/visualizer";
import ThreeSwapper from "@/components/quats/three-swap";
import { MathJaxContext } from "better-react-mathjax";

const data: ArticleData = {
  title: 'Quaternions',
  tags: ['webdev', 'gamedev', 'edu'],
  links: [['Full Article', '/articles/quats-from-scratch/']],
  Component
};

function Component() {
  return (
    <article>
      <ArticleHeader article={data}>
        Quaternions from Scratch
      </ArticleHeader>
      <SectionTabs tabs={['Overview', '3D Visualizer', 'Multiplication']}>
        <SectionTabsContent value='Overview'>
          <section>
            <p className="pb-8">
              Quaternions are a centrally important algebraic structure in domains that involve 3d rotations, such as computer vision and graphics, robotics, physics, and others. I took some time to organize my intuitions around them and write an article that builds up to quaternions from "scratch", attempting to show a way how both quaternions and the geometric algebras could be motivated. I've included numerous illustrations and interactive components to aid in intuition building, making use of React, Svg, Threejs, Mathjax + Latex, and finally Krita for the illustrations. 
            </p>
            <QuatsCycle>
              <JsdImage src="quats/ij_vs_ji.png" id="c1" className="m-auto cycle max-w-7/8 max-h-100" alt="ij vs ji." />
              <JsdImage src="quats/i_inverse.png" id="c2" className="cycle max-w-7/8 max-h-100" alt="i*j vs ji*." />
              <JsdImage src="quats/rotation_result.png" id="c3" className="cycle max-w-7/8 max-h-100" alt="The rotation result." />
            </QuatsCycle>
          </section>
        </SectionTabsContent>
        <SectionTabsContent value='3D Visualizer'>
          <section className="pt-4 pb-4">
            <QuaternionVisualizer></QuaternionVisualizer>
          </section>
        </SectionTabsContent>
        <SectionTabsContent value='Multiplication'>
          <section>
            <ThreeSwapper></ThreeSwapper>
          </section>
        </SectionTabsContent>
      </SectionTabs>
    </article>
  )
}

export default data