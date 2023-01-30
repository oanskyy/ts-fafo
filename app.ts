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
console.log(sapiens.nickname)
