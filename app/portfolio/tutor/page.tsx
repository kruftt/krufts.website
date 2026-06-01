import {
	ArticleCarousel,
	CarouselItem,
} from "@/app/portfolio/_components/article-carousel";
import {
	SectionTabs,
	SectionTabsContent,
} from "@/app/portfolio/_components/article-tabs";
import JsdImage from "@/components/general/jsdelivr-image";
import Zoom from "@/components/general/zoom";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function TutorArticle() {
	return (
		<article className="min-h-250">
			<ArticleHeader article={data}>Tutoring</ArticleHeader>
			<div>
				<p>
					Over the past few years I've tutored high school and junior college
					students at various levels of proficiency in Mathematics and Computer
					Science. This has involved verbal communication and hand-drawn
					sketches while referencing material in their books and coursework.
					However, I have occasionally produced my own reference materials
					outside of these. Included here are a few examples.
				</p>
			</div>
			<br />
			<SectionTabs
				tabs={[
					"Dot Product",
					"Exterior Product",
					"Trig Derivatives",
					"Matrix Multiplication",
				]}
			>
				<br />

				<SectionTabsContent value="Matrix Multiplication">
					<h2 className="text-2xl text-center">Matrix Multiplication</h2>
					<ArticleCarousel>
						<CarouselItem>
							<Zoom label="Inner and Outer products">
								<JsdImage
									width={1777}
									height={1481}
									src="matrix1.jpg"
									className="m-auto"
									alt="Inner and Outer products"
								/>
							</Zoom>
						</CarouselItem>
						<CarouselItem>
							<Zoom label="Combinations of rows and columns">
								<JsdImage
									width={1697}
									height={1375}
									src="matrix2.jpg"
									className="m-auto"
									alt="Combinations of rows and columns"
								/>
							</Zoom>
						</CarouselItem>
					</ArticleCarousel>
				</SectionTabsContent>

				<SectionTabsContent value="Dot Product" className="text-center">
					<div className="max-w-7/8 m-auto">
						<p>
							An important concept in geometry and linear algebra is how
							parallel or perpendicular ("orthogonal") two vectors are. Let's
							examine two operations that tell us about each of these in turn.
						</p>
					</div>
					<h2 className="text-2xl">The Dot Product</h2>
					(aka the "Inner" or "Projection" Product)
					<br />
					<ArticleCarousel>
						<CarouselItem>
							<div className="max-w-7/8 m-auto">
								<p>
									First let's look at the dot product between two vectors. The
									dot product tells us about how parallel they are and is
									related to the cosine of the angle between them.
									<br />
								</p>
								<p>
									Consider a unit vector A, with coordinates (cos(α), sin(α))
									and a length of 1.
									<br />
								</p>
								<p>
									We can think of the coordinates cos(α) and sin(α) as the
									shadows A casts on the x and y axes:
								</p>
							</div>
							<Zoom label="Vector Components">
								<JsdImage
									width={545}
									height={294}
									src="dot1.jpg"
									className="m-auto"
									alt="Vector Components"
								/>
							</Zoom>
						</CarouselItem>
						<CarouselItem>
							<div className="max-w-7/8 m-auto">
								<p>
									Now consider a second unit vector B, with angle β, making
									angle θ with A.
									<br /> If A casts a shadow onto B, that is, if we "project" A
									onto B to form a right triangle, we know from trigonometry
									that the length of the projection will be cos(θ):
								</p>
							</div>
							<Zoom label="Vector Projection">
								<JsdImage
									width={550}
									height={538}
									src="dot2.jpg"
									className="m-auto"
									alt="Vector Projection"
								/>
							</Zoom>
							<div className="max-w-7/8 m-auto">
								<p>
									The more parallel the vectors are, the greater cos(θ) will be,
									with a maximum of 1.
									<br />
									The more perpendicular/orthogonal they are, the smaller
									cos(θ), with a minimum of 0.
									<br />
								</p>
								<p>
									The dot product allows us to calculate the value of cos(θ)
									piece by piece.
								</p>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div className="max-w-7/8 m-auto">
								<p>
									We know that A has x and y components, cos(α) and sin(α).
									<br />
									The trick here will be to calculate the projection of each
									component separately and add them together.
								</p>
							</div>
							<Zoom label="Vector Component Projection">
								<JsdImage
									width={634}
									height={559}
									src="dot3.jpg"
									className="m-auto"
									alt="Vector Component Projection"
								/>
							</Zoom>
							<div className="max-w-7/8 m-auto">
								<p>
									First consider the x component with length cos(α), on the x
									axis.
									<br />
									It forms a right triangle with B at an angle of β, with cos(α)
									as the hypotenuse.
									<br />
									Therefore we know the length of this portion is cos(α)cos(β).
									<br />
								</p>
								<p>
									Similarly, the y component, sin(α), forms the hypotenuse of a
									right triangle with B.
									<br />
									This time β is on the opposing corner of the triangle,
									therefore this portion of the shadow has length sin(α)sin(β).
								</p>
								<p>
									Now we can simply add the projections of both components to
									get the whole!
									<br />
									<br />
									<b>Â·B̂ = cos(θ) = cos(β-α) = cos(α)cos(β) + sin(α)sin(β)</b>
								</p>
							</div>
						</CarouselItem>
					</ArticleCarousel>
				</SectionTabsContent>

				<SectionTabsContent value="Exterior Product" className="text-center">
					<div className="max-w-7/8 m-auto">
						Next let's look at how orthogonal two vectors are.
						<br />
						<h2 className="text-2xl">The Exterior Product</h2>
					</div>
					(aka the "Wedge" product)
					<ArticleCarousel>
						<CarouselItem>
							<div className="max-w-7/8 m-auto">
								<p>
									Consider again two unit vectors A and B with angle θ between
									them.
									<br />
									The more perpendicular they are, the larger sin(θ) will be.
								</p>
								<p>
									Picture the parallelogram formed by A and B.
									<br />
									It's area is base*height = 1*sin(θ):
								</p>
							</div>
							<div className="max-w-7/8 m-auto">
								<Zoom label="Sine as side of Triangle">
									<JsdImage
										width={419}
										height={406}
										src="wedge1.jpg"
										className="m-auto"
										alt="Sine as side of Triangle"
									/>
								</Zoom>
								<p>
									We would like to express this area in terms of the vector
									components, like we did with the dot product.
								</p>
							</div>
						</CarouselItem>
						<CarouselItem>
							<div className="max-w-7/8 m-auto">
								<p>
									To calculate the area we can surround the parallelogram by a
									bounding box and substract out what we don't need. To make it
									easier to label we'll make the following substitutions:
									<br />
									<br />a = cos(α)
									<br />b = cos(β)
									<br />c = sin(α)
									<br />d = sin(β)
									<br />
									<br />
								</p>
							</div>
							<Zoom label="Sine as area">
								<JsdImage
									width={424}
									height={420}
									src="wedge2.jpg"
									className="m-auto"
									alt="Sine as area"
								/>
							</Zoom>
							<div className="max-w-7/8 m-auto">
								<p>
									Now we can start with the area of the whole and subtract out
									the parts we don't need.
									<br />
								</p>
								<code>
									sin(θ) = (a+b)(c+d) - 2bc - ac - bd
									<br />
									sin(θ) = ac + ad + bc + bd - 2bc - ac - bd
									<br />
									sin(θ) = ad - bc
								</code>
								<p>
									Plugging back in, we get:
									<br />
									<br />
									<b>Â^B̂ = sin(θ) = sin(β-α) = cos(α)sin(β) - cos(β)sin(α)</b>
									<br />
								</p>
							</div>
						</CarouselItem>
					</ArticleCarousel>
				</SectionTabsContent>

				<SectionTabsContent value="Trig Derivatives" className="text-center">
					<p className="max-w-7/8 m-auto">
						Let's consider a geometric picture of the sine, cosine, and arccos
						derivatives.
					</p>
					<ArticleCarousel>
						<CarouselItem>
							<h2 className="text-2xl">Derivatives for sine and cosine</h2>
							<div className="max-w-7/8 m-auto">
								<p>
									This image shows a right triangle in the unit circle as the
									angle θ increases.
									<br />
									The zoomed in region shows an approximation of the
									corresponding changes in the sides of the triangle.
								</p>
							</div>
							<Zoom label="Derivative for Sine">
								<JsdImage
									width={836}
									height={517}
									src="trig1.jpg"
									className="m-auto"
									alt="Derivative for Sine"
								/>
							</Zoom>
							<div className="max-w-7/8 m-auto">
								<p>
									Recall that the length of an arc on the unit circle is θ.
									<br />
									Therefore the change in the arc length is equivalent to dθ,
									the change in θ.
								</p>
								<p>
									During a small change in θ we can approximate the additional
									arc segment as a straight line with length dθ.
								</p>
								<p>
									This allows us to picture a triangle in the zoomed in picture
									that is a rotated version of the triangle in the big picture.
								</p>
								<p>
									Since we know the angle θ and hypotenuse length dθ, we can use
									sine and cosine to find the length of the changes in the x and
									y directions:
								</p>
							</div>
							<Zoom label="Derivative for Cosine">
								<JsdImage
									width={462}
									height={102}
									src="eq1.jpg"
									className="m-auto"
									alt="Derivative for Cosine"
								/>
							</Zoom>
						</CarouselItem>
						<CarouselItem>
							<h2 className="text-2xl">Derivative for arccos(θ)</h2>
							<div className="max-w-7/8 m-auto">
								<p>
									Now let's use this same picture to find the derivative for the
									inverse cosine function, arccos(x).
								</p>
								<p>
									Here we have the same picture as above, but we've now set θ =
									arccos(x).
									<br />
									Let's also label the x and y coordinates of our triangle in
									terms of x instead of θ:
								</p>
							</div>
							<Zoom label="Change Coordinates">
								<JsdImage
									width={831}
									height={512}
									src="trig2.jpg"
									className="m-auto"
									alt="Change Coordinates"
								/>
							</Zoom>
							<div className="max-w-7/8 m-auto">
								<p>
									In our zoomed in picture, we would like to know the new value
									for dθ as x changes.
									<br />
									From the previous exercise we already know that dx =
									-sin(θ)dθ.
									<br />
									All we need to do is substitute θ = arccos(x) and rearrange.
								</p>
							</div>
							<Zoom label="Find the unknown">
								<JsdImage
									width={419}
									height={122}
									src="eq2.jpg"
									className="m-auto"
									alt="Find the unknown"
								/>
							</Zoom>
							<div className="max-w-7/8 m-auto">
								<p>We're now left with -1/sin(arccos(x))</p>
								<p>
									To simplify this last step, remember that the sine of an angle
									refers to the opposing side of a right triangle.
								</p>
								<p>
									Therefore the sine of the inverse cosine takes us from the
									adjacent side of our zoomed out triangle to the opposing side.
								</p>
								<p>
									Refer back to the opposing side of our zoomed out triangle.
									Substituting in we're left with:
								</p>
							</div>
							<Zoom label="Derivative for Inverse Cosine">
								<JsdImage
									width={221}
									height={87}
									src="eq3.jpg"
									className="m-auto"
									alt="Derivative for Inverse Cosine"
								/>
							</Zoom>
						</CarouselItem>
					</ArticleCarousel>
				</SectionTabsContent>
			</SectionTabs>
		</article>
	);
}
