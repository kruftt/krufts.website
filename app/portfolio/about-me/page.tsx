import JsdImage from "@/components/general/jsdelivr-image";

export default function AboutMe() {
  return (
			<div>
				<h2 className="text-center text-3xl mb-8">About Me</h2>
				<div className="flex flex-wrap gap-4 items-center justify-center">
					<JsdImage
						className="max-h-100"
						src="portrait.jpg"
						width={1300}
						height={1509}
						alt="A portrait of Marc"
					/>
					<div className="max-w-164  lg:max-w-116 lg:text-left">
						<p>
							Hello, I'm Marc Doucette, a designer, engineer, and educator with special interests in user interfaces and human-computer interaction.
						</p>
						<p>
							I studied Symbolic Systems at Stanford, specializing in computer
							music, including interdisciplinary studies in computer science,
							cognitive science, and linguistics.
						</p>
						<p>
							I'm interested in discovering how software can be designed to best support human needs, especially in fields like education and organizational knowledge management.
						</p>
						<p>
							I love playing and working on games and am very interested both in game design and in what game design can teach us about our systems more broadly.
						</p>
						<p>
							I hope you enjoy looking at some of my projects. Please get in touch!
						</p>
						<p>- Marc</p>
					</div>
				</div>
			</div>
		);
}

// Through additional personal studies and projects, I have experience working with a wide variety of software architectures and user interfaces, from asynchronous, event-driven applications to real-time simulations.