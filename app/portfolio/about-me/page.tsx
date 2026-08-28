import JsdImage from "@/components/general/jsdelivr-image";

export default function AboutMe() {
  return (
    <div>
      <h2 className="text-center text-3xl mb-8">About Me</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <JsdImage
        className="max-h-100 mt-4"
        src="portrait.jpg"
        width={1300}
        height={1587}
        alt="A portrait of Marc"
        />
        <div className="max-w-164  lg:max-w-116 lg:text-left">
          <p className="mt-0!">
            I am a designer, engineer, and educator with an interdisciplinary education in Symbolic Systems from Stanford. It was there I developed my core engineering skills and broad perspectives on the incorporation of information technology into human life.
          </p>
          <p>
            I have experience as an automation engineer and with web development, including frameworks such as react, vue, and svelte.
          </p>
          <p>
            I'm interested in discovering how software can best be designed to support human needs, especially in areas like education and organizational management.
          </p>
          <p>
            I also love playing and working on games and think there is a lot that game design can still teach us about our computer systems more broadly.
          </p>
          <p>
            I'd be interested in hearing about any automation, UI/frontend, full stack, DevOps, game development, or related roles.
          </p>
          <p>
            I hope you enjoy looking at some of my projects. Please get in touch!
          </p>
					<p>- Marc Doucette</p>
        </div>
      </div>
    </div>
  );
}

// Through additional personal studies and projects, I have experience working with a wide variety of software architectures and user interfaces, from asynchronous, event-driven applications to real-time simulations.
