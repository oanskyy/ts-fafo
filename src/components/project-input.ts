import { Validatable, validate } from "./../util/validation.js"
import  Component  from "./base-component.js"
import { autobind as Autobind } from "../decorators/autobind.js"
import { projectState } from "../state/project-state.js"

// Project Input Class
// restructure prj input to take advantage of inheritance and let the base class do a lot of the job
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

	@Autobind
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
