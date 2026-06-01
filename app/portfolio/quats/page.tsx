import { QuatsCycle } from "@/app/articles/quats-from-scratch/_components/quats-cycle";
import ThreeSwapper from "@/app/articles/quats-from-scratch/_components/three-swap";
import QuaternionVisualizer from "@/app/articles/quats-from-scratch/_components/visualizer";
import {
	SectionTabs,
	SectionTabsContent,
} from "@/app/portfolio/_components/article-tabs";
import JsdImage from "@/components/general/jsdelivr-image";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function QuatsArticle() {
	return (
		<article>
			<ArticleHeader article={data}>Quaternions from Scratch</ArticleHeader>
			<SectionTabs tabs={["Overview", "3D Visualizer", "Multiplication"]}>
				<SectionTabsContent value="Overview">
					<section>
						<p className="pb-8">
							Quaternions are an important algebraic structure in domains that
							involve 3d rotations, such as computer vision, graphics, robotics,
							physics, and others. I took some time to organize my intuitions
							around quaternions and write an article that builds them up from
							"scratch". In addition to clarifying the ideas through writing,
							I've produced numerous illustrations and interactive components to
							help give readers a sense of how quaternions <i>feel</i>. To
							author this article I made use of tools like React, Svg, Threejs,
							Latex, and Krita.
						</p>
							<QuatsCycle>
								<JsdImage
									width={1415}
									height={661}
									src="quats/ij_vs_ji.png"
									id="c1"
									className="m-auto cycle max-w-7/8 max-h-100 bg-white rounded-xl"
									alt="ij vs ji."
								/>
								<JsdImage
									width={1415}
									height={661}
									src="quats/i_inverse.png"
									id="c2"
									className="cycle max-w-7/8 max-h-100 bg-white rounded-xl"
									alt="i*j vs ji*."
								/>
								<JsdImage
									width={1415}
									height={661}
									src="quats/rotation_result.png"
									id="c3"
									className="cycle max-w-7/8 max-h-100 bg-white rounded-xl"
									alt="The rotation result."
								/>
							</QuatsCycle>
						<div className="flex justify-center">
							<p className="max-w-4/5 text-center">
								Quaternions leverage commutative and anticommutative behaviors
								to rotate in the plane of rotation while "staying still" along
								the axis.
							</p>
						</div>
					</section>
				</SectionTabsContent>
				<SectionTabsContent value="3D Visualizer">
					<section className="pt-4 pb-4">
						<QuaternionVisualizer></QuaternionVisualizer>
						<div className="flex justify-center">
							<p className="max-w-4/5 text-center">
								Quaternion rotation can be visualized as a two-step operation
								which involves a twisting and untwisting along the axis of
								rotation.
							</p>
						</div>
					</section>
				</SectionTabsContent>
				<SectionTabsContent value="Multiplication">
					<section>
						<ThreeSwapper></ThreeSwapper>
						<div className="flex justify-center">
							<p className="max-w-5/6 text-center">
								Multiplying on the left causes both cycles to move in the same
								direction.
								<br />
								Multiplying on the right causes them to move in opposite
								directions.
								<br />
								Combining them together allows one to cycle and the other to
								stay.
							</p>
						</div>
					</section>
				</SectionTabsContent>
			</SectionTabs>
		</article>
	);
}
