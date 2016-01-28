module.exports = {
	getRandomCode: function (n) {
		var code = '';
		
		for (var i = n || 4; i > 0; i -= 4) {
			code += Math.random().toString(36)
            	.replace(/[^a-z0-9]+/g, '').substr(0, 4)
				.toUpperCase();
		}
		
        return code;
    },
	jtob: function (json) {
		return (new Buffer(JSON.stringify(json), 'utf8')).toString('base64');
	},
	btoj: function (code) {
		return JSON.parse((new Buffer(code, 'base64')).toString('utf8'));
	},
	getToken: function () {
		return this.jtob((new Date(Date.now() + 30 * 60 * 1000)));
	}
}