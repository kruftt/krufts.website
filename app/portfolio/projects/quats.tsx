import ArticleHeader from "@/components/portfolio/article-header"
import { SectionTabs, SectionTabsContent } from "@/components/portfolio/article-tabs"
import JsdImage from "@/components/general/jsdelivr-image";
import { QuatsCycle } from "@/components/quats/quats-cycle";
import QuaternionVisualizer from "@/components/quats/visualizer";
import ThreeSwapper from "@/components/quats/three-swap";
import { MathJaxContext } from "better-react-mathjax";

const data: ArticleData = {
  title: 'Quats',
  tags: ['edu', 'gamedev'],
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
            <p>
              I've often found that quaternions are a point of confusion among people getting into game development and 3d work, so I took some time to organize my intuitions around them and write an article that builds up to quaternions from "scratch". I included numerous illustrations and interactive components to aid in intuition building around the various topics that are discussed. 
            </p>
            <p>
              To author this article and the various visualizations, I made use of React, Svg, Threejs, Mathjax + Latex, and finally Krita for the illustrations. 
            </p>
            <QuatsCycle>
              <JsdImage src="quats/ij_vs_ji.png" id="c1" className="m-auto cycle max-w-7/8 max-h-100" alt="ij vs ji." />
              <JsdImage src="quats/i_inverse.png" id="c2" className="cycle max-w-7/8 max-h-100" alt="i*j vs ji*." />
              <JsdImage src="quats/rotation_result.png" id="c3" className="cycle max-w-7/8 max-h-100" alt="The rotation result." />
            </QuatsCycle>
          </section>
        </SectionTabsContent>
        <SectionTabsContent value='3D Visualizer'>
          <section>
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