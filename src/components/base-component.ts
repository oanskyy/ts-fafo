
	// Component Base Class/ Generics
	// - does all the general rendering
	// - but the concrete configuration needs to happen in the place where we inherit

	// --mark this class as ABSTRACT class, because ppl should never directly instantiate it, should always be used for inheritance
	export default abstract class Component<
		T extends HTMLElement,
		U extends HTMLElement
	> {
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

