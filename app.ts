// Object types. Ts's representation of an OBJ type. that helps ts understand the objs you're working with
const sapiens: {
	name: string
	age: number
	hobbies: string[] //ARRAY types
	role: [number, string] //TUPLE types (fixed length array) > Array types
} = {
	name: "Hana",
	age: 30,
	hobbies: ["crypto", "martial arts", "reading", "cooking"],
	role: [2, "author"]
}

console.log(sapiens.hobbies)
// console.log(sapiens.nickname)

// Union Type
function combine(input1: number | string, input2: number | string) {
	let result
	if (typeof input1 === "number" && typeof input2 === "number") {
		result = input1 + input2
	} else {
		result = input1.toString() + input2.toString()
	}
	return result
}

const combinedAges = combine(33, 42)
console.log(combinedAges)

const combinedNames = combine("Max", "Anna")
console.log(combinedNames)
