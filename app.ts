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

// Type Alias
type Combinable = number | string
type ConversionDesc = "as-number" | "as-string"

// Union Type
function combine(
	input1: Combinable,
	input2: Combinable,
	// Literal type with union type
	resultConversion: ConversionDesc
) {
	let result
	if (
		(typeof input1 === "number" && typeof input2 === "number") ||
		resultConversion === "as-number"
	) {
		result = +input1 + +input2
	} else {
		result = input1.toString() + input2.toString()
	}
	return result
}

const combinedAges = combine(33, 42, "as-number")
console.log(combinedAges)

const combinedNames = combine("Max", "Anna", "as-string")
console.log(combinedNames)

// LITERAL Type
// often used in the context of a Union type
// resultConversion: "as-number" | "as-string"
