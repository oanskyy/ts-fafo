


const person: {
    name: string, 
    hobbies: string[],  //ARRAY types
    role: [number, string], //TUPLE types > Array types
} = {
	name: "Hana",
	hobbies: ["martial arts", "reading", "cooking"],
    role: [2, 'author']
}

// Array types
let favoriteActivities: string[]
favoriteActivities = ["sports", "dine out", "shopping", "learn"]

console.log(person.name)

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase)
	// console.log(hobby.map()) !!ERROR
}
