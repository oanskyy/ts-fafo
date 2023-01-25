const person = {
	name: "Hana",
	hobbies: ["martial arts", "reading", "cooking"]
}

// Array types
let favoriteActivities: string[]
favoriteActivities = ["sports", "dine out", "shopping", "learn"]

console.log(person.name)

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase)
	// console.log(hobby.map()) !!ERROR
}
