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
				As part of a group project focused on UI Design, I used the{" "}
				<a href="https://expo.dev">Expo framework</a> to help implement a mobile
				app which automated the process of queuing for help during office hours.
				For our interface we used React Native, Redux, and a cross-platform
				component library. This project involved successive design and
				prototyping iterations with focus on the design process and concluded
				with a live demonstration at a public exhibition.
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
