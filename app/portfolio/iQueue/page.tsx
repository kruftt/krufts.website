import Image from "next/image";
import { ArticleHeader } from "../_components/article-header";
import { data } from "./data";

export default function IQueueArticle() {
	return (
		<article>
			<ArticleHeader article={data}>
				<h2>iQueue</h2>
			</ArticleHeader>
			<div>
				As part of a group project focused on UI Design, <b>I used the{" "}
					<a href="https://expo.dev">Expo framework</a>
				{" "}
				to help implement a mobile app which automated the process of queuing
				for help during office hours</b>. For our interface we used{" "}
				<b>React Native</b>, <b>Redux</b>, and a{" "}
				<b>cross-platform component library</b>. This project involved{" "}
				<b>successive design and prototyping iterations</b> with focus on the
				design process and concluded with a live demonstration at a public
				exhibition.
			</div>
			<div className="mt-8">
				<Image
					width={494}
					height={969}
					className="max-h-200 w-auto h-auto m-auto"
					src="https://hci.stanford.edu/courses/cs147/2017/au/projects/education/iqueue/images/iqueuemain.png"
					alt="iQueue"
				/>
			</div>
		</article>
	);
}
