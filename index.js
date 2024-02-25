import TreverseIps from "./treverseNetwork.js"
import {writeFile} from 'fs/promises'
async function main(){
	TreverseIps.verbose = false;
	const result = await TreverseIps.treverse();
	await writeFile('./ips.txt', result.join('\n'))
}

main();
