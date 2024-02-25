import TreverseIps from "./treverseNetwork.js"
async function main(){
	TreverseIps.verbose = true;
	const result = await TreverseIps.treverse();
	console.log(result)
}

main();
