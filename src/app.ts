/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />
/// <reference path="project-state.ts" />
/// <reference path="validation.ts" />
/// <reference path="autobind-decorator.ts" />

namespace App {
	// Component Base Class/ Generics
	// - does all the general rendering
	// - but the concrete configuration needs to happen in the place where we inherit

	// --mark this class as ABSTRACT class, because ppl should never directly instantiate it, should always be used for inheritance
	abstract class Component<T extends HTMLElement, U extends HTMLElement> {
		templateElement: HTMLTemplateElement
		hostElement: T
		element: U

		constructor(
			templateId: string,
			hostElementId: string,
			insertAtStart: boolean,
			newElementId?: string
		) {
			this.templateElement = document.getElementById(
				templateId
			)! as HTMLTemplateElement
			// cast it: as T instead of as HTMLDivElement
			this.hostElement = document.getElementById(hostElementId)! as T

			const importedNode = document.importNode(
				this.templateElement.content,
				true
			)
			this.element = importedNode.firstElementChild as U
			if (newElementId) {
				this.element.id = newElementId
			}
			this.attach(insertAtStart)
		}

		private attach(insertAtBeginning: boolean) {
			this.hostElement.insertAdjacentElement(
				insertAtBeginning ? "afterbegin" : "beforeend",
				this.element
			)
		}

		abstract configure(): void
		abstract renderContent(): void
	}

	// ProjectItem Class
	class ProjectItem
		extends Component<HTMLUListElement, HTMLLIElement>
		implements Draggable
	{
		private project: Project

		// using a getter
		// getter - function
		get persons() {
			if (this.project.people === 1) {
				return "1 person"
			} else {
				return `${this.project.people} persons`
			}
		}

		constructor(hostId: string, project: Project) {
			super("single-project", hostId, false, project.id)
			this.project = project
		}

		@autobind
		dragStartHandler(event: DragEvent) {
			console.log(event)
			event.dataTransfer!.setData("text/plain", this.project.id)
			event.dataTransfer!.effectAllowed = "move"
		}

		dragEndHandler(_: DragEvent): void {
			console.log("dragEnd")
		}

		configure(): void {
			this.element.addEventListener("dragstart", this.dragStartHandler)
			this.element.addEventListener("dragend", this.dragEndHandler)
		}

		renderContent(): void {
			this.element.querySelector("h2")!.textContent = this.project.title
			this.element.querySelector("h3")!.textContent = this.persons + " assigned"
			this.element.querySelector("p")!.textContent = this.project.description
		}
	}

	// ProjectList Class
	class ProjectList
		extends Component<HTMLDivElement, HTMLElement>
		implements DragTarget
	{
		assignedProjects: Project[]

		constructor(private type: "active" | "finished") {
			super("project-list", "app", false, `${type}-projects`)
			this.assignedProjects = []

			// projectState.addListener((projects: Project[]) => {
			// 	const relevantProjects = projects.filter(prj => {
			// 		if (this.type === "active") {
			// 			return prj.status === ProjectStatus.Active
			// 		}
			// 		return prj.status === ProjectStatus.Finished
			// 	})
			// 	this.assignedProjects = projects
			// 	this.renderProjects()
			// })

			// this.attach()
			this.configure()
			this.renderContent()
		}

		@autobind
		dragOverHandler(event: DragEvent): void {
			if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
				event.preventDefault()
				const listEl = this.element.querySelector("ul")!
				listEl.classList.add("droppable")
			}
		}

		@autobind
		dropHandler(event: DragEvent) {
			const prjId = event.dataTransfer!.getData("text/plain")
			projectState.moveProject(
				prjId,
				this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
			)
		}

		@autobind
		dragLeaveHandler(_: DragEvent): void {
			const listEl = this.element.querySelector("ul")!
			listEl.classList.remove("droppable")
		}

		configure() {
			this.element.addEventListener("dragover", this.dragOverHandler)
			this.element.addEventListener("dragleave", this.dragLeaveHandler)
			this.element.addEventListener("drop", this.dropHandler)

			projectState.addListener((projects: Project[]) => {
				const relevantProjects = projects.filter(prj => {
					if (this.type === "active") {
						return prj.status === ProjectStatus.Active
					}
					return prj.status === ProjectStatus.Finished
				})
				this.assignedProjects = projects
				this.renderProjects()
			})
		}

		renderContent() {
			const listId = `${this.type}-projects-list`
			this.element.querySelector("ul")!.id = listId
			this.element.querySelector("h2")!.textContent =
				this.type.toUpperCase() + " PROJECTS"
		}
		private renderProjects() {
			const listEl = document.getElementById(
				`${this.type}-projects-list`
			)! as HTMLUListElement
			listEl.innerHTML = ""
			for (const prjItem of this.assignedProjects) {
				new ProjectItem(this.element.querySelector("ul")!.id, prjItem)
				// const listItem = document.createElement("li")
				// listItem.textContent = prjItem.title
				// listEl.appendChild(listItem)
			}
		}
	}

	// Project Input Class
	// restructure prj input to take advantage of inheritance and let the base class do a lot of the job
	class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
		titleInputElement: HTMLInputElement
		descriptionInputElement: HTMLInputElement
		peopleInputElement: HTMLInputElement

		constructor() {
			super("project-input", "app", true, "user-input")
			// this.templateElement = document.getElementById(
			// 	"project-input"
			// )! as HTMLTemplateElement
			// this.hostElement = document.getElementById("app")! as HTMLDivElement

			// const importedNode = document.importNode(this.templateElement.content, true)
			// this.element = importedNode.firstElementChild as HTMLFormElement
			// this.element.id = "user-input"

			this.titleInputElement = this.element.querySelector(
				"#title"
			) as HTMLInputElement
			this.descriptionInputElement = this.element.querySelector(
				"#description"
			) as HTMLInputElement
			this.peopleInputElement = this.element.querySelector(
				"#people"
			) as HTMLInputElement

			this.configure()
			// this.attach()
		}

		// convention: public methods should be before private ones
		configure() {
			this.element.addEventListener("submit", this.submitHandler)
		}

		renderContent() {}

		private gatherUserInput(): [string, string, number] | void {
			const enteredTitle = this.titleInputElement.value
			const enteredDescription = this.descriptionInputElement.value
			const enteredPeople = this.peopleInputElement.value

			const titleValidatable: Validatable = {
				value: enteredTitle,
				required: true
			}
			const descriptionValidatable: Validatable = {
				value: enteredDescription,
				required: true,
				minLength: 5
			}
			const peopleValidatable: Validatable = {
				value: +enteredPeople,
				required: true,
				min: 1,
				max: 5
			}

			if (
				!validate(titleValidatable) ||
				!validate(descriptionValidatable) ||
				!validate(peopleValidatable)
			) {
				alert("Invalid input, please try again!")
				return
			} else {
				return [enteredTitle, enteredDescription, +enteredPeople]
			}
		}

		private clearInputs() {
			this.titleInputElement.value = ""
			this.descriptionInputElement.value = ""
			this.peopleInputElement.value = ""
		}

		@autobind
		private submitHandler(event: Event) {
			event.preventDefault()
			const userInput = this.gatherUserInput()
			if (Array.isArray(userInput)) {
				const [title, desc, people] = userInput
				projectState.addProject(title, desc, people)
				this.clearInputs()
			}
		}

		// private attach() {
		// 	this.hostElement.insertAdjacentElement("afterbegin", this.element)
		// }
	}

	new ProjectInput()
	new ProjectList("active")
	new ProjectList("finished")
}
