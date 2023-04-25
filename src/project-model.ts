namespace App {
	enum ProjectStatus {
		Active,
		Finished
	}

	// Project Type
	class Project {
		constructor(
			public id: string,
			public title: string,
			public description: string,
			public people: number,
			// public status: "active" | "finished" //
			public status: ProjectStatus
		) {}
	}
}
