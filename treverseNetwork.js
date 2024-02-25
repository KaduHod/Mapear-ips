import {exec} from 'child_process'

export default class TreverseIps {
	static baseIp = '192.168.0.'
	static verbose = false;
	static level = 10;
	static async getInterfaces(local = false) {
		const ifconfig = await (
			new Promise((resolve, reject) => {
				exec('ifconfig', (err, stdout, stderr) => {
					if(err || stderr) {
						return reject(false)
					}
					return resolve(stdout)
				})
			})
		)
		const ips = ifconfig
			.split("\n")
			.filter(line => line.search('inet ') > -1)
			.map(line => {
				return line.split('inet ')[1];
			})
			.map(line => {
				let result = line.split(' ');
				return result.shift();
			})
			.map(ip => {
				let faixas = ip.split('.')
				faixas.pop();
				return faixas.join('.');
			})
		return local ? ips : ips.filter(ip => ip.search('127.0.0') == -1)
	}
	static getIps(baseIp) {
		let ip = 2;
		const ips = [];

		while(ip <= 255) {
			ips.push(`${baseIp ? baseIp : this.baseIp}.${ip}`)
			ip++;
		}
		return ips
	}

	static async ping(ip) {
		return new Promise((resolve, reject) => {
			exec(`ping -c ${this.level} ${ip}`,(err, stdout, stderr) => {
				if(this.verbose) console.log('ping -c 10 ' + ip)
				if(err || stderr) {
					return err ? reject(err) : reject(stderr);
				}
				stdout.search('100% packet loss,') != -1 ? resolve(false) : resolve(ip);
			})
		})
	}

	static async treverse(){
		const promises = [];
		const interfaces = await TreverseIps.getInterfaces();
		interfaces.forEach(baseIp => {
			const ips = this.getIps(baseIp);
			ips.forEach(ip => promises.push(TreverseIps.ping(ip)));
		})
		let result = await Promise.allSettled(promises)
		return result.filter(r => r.value).filter(i => !!i).map(i => i.value);
	}
}
