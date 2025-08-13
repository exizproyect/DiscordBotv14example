

const fs = require('fs');

module.exports = (client) => {
	fs.readdirSync('./buttons/').forEach(async dir => {
		const files = fs.readdirSync(`./buttons/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
            const button = require(`../buttons/${dir}/${file}`)
            client.buttons.set(button.id, button)
		}
		
	});
}