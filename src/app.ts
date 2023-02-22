class ProjectInput {
	templateElement: HTMLTemplateElement
	hostElement: HTMLDivElement
	element: HTMLFormElement

	constructor() {
		this.templateElement = document.getElementById(
			"project-input"
		)! as HTMLTemplateElement
		this.hostElement = document.getElementById("app")! as HTMLDivElement

		const importedNode = document.importNode(this.templateElement.content, true)
		this.element = importedNode.firstElementChild as HTMLFormElement
		this.attach()
	}

	private attach() {
		// this.hostElement.insertAdjacentElement("afterbegin", this.element as HTMLFormElement);
		this.hostElement.insertAdjacentElement(
			"afterbegin",
			this.templateElement.content.firstElementChild as HTMLFormElement
		)
	}
}

// instantiate it

const projectInput = new ProjectInput()
