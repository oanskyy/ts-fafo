// custom type: ENUM types
enum Role {
	ADMIN,
	READ_ONLY,
	AUTHOR
}

const person = {
	name: "Hana",
	hobbies: ["martial arts", "reading", "cooking"],
	role: Role.ADMIN
}

/* Array types */
let favoriteActivities: string[]
favoriteActivities = ["sports", "dine out", "shopping", "learn"]

console.log(person.name)

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase)
	// console.log(hobby.map()) !!ERROR
}
