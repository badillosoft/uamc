/* global Mustache */
var templates = {
	messagebox: [
		'<div class="alert alert-{{type}} alert-dismissible">',
			'<button type="button" class="close"',
				'data-dismiss="alert" aria-label="Close">',
				'<span aria-hidden="true">&times;</span>',
			'</button>',
			'{{message}}',
		'<div>'
	].join('\n')
};

function setTemplate(element, name, data) {
	var html = Mustache.render(templates[name], data);
	element.innerHTML = html;
}

window.onload = function () {
	var txt_user = document.getElementById('txt-user');
	var txt_password = document.getElementById('txt-password');
	var frm_login = document.getElementById('frm-login');
	var div_message = document.getElementById('div-message');
	
	
	txt_user.onkeydown = txt_password.onkeydown = function (e) {
		setTemplate(div_message, 'messagebox', {
			type: "info", 
			message: "Puedes pulsar enter para enviar el formulario." 
		});
	};
	
	frm_login.onsubmit = function (e) {
		if (!frm_login.checkValidity()) {
			setTemplate(div_message, 'messagebox', {
				type: "warning", 
				message: "El nombre de usuario o la contraseña no pueden " +
					"estar vacios." 
			});
			
			e.preventDefault();
			return;
		}
	};
};