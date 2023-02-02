// function return types & void
function add(n1: number, n2: number) {
	return n1 + n2
}

// void is used when a function doesnt return anything
// undefiend is used rarely, when a function returns nothing/dont return a value 'return;'
function printResult(num: number): void {
	console.log("Result" + num)
}

// function types & callbacks
function addAndHandle(n1: number, n2: number, cb: (num:number) => void) {
	const result = n1 + n2
	cb(result)
}

printResult(add(5,7))