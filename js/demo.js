var DemoEngine = function() {
	var self = this;
	var playerWeapon = new weapon();

	init = function() {
		//Carrega por padrão a primeira arma do banco
		playerWeapon.loadWeapon(0);
		self.updateEquipedWeapon();
	};
	
	self.updateEquipedWeapon = function() {
		if (playerWeapon.info.name)
			$('#weapon-info').append($('<p>').text('Nome: ' + playerWeapon.info.name));

		if (playerWeapon.info.description)
			$('#weapon-info').append($('<p>').text('Descrição: ' + playerWeapon.info.description));

		if (playerWeapon.info.weight)
			$('#weapon-info').append($('<p>').text('Peso: ' + playerWeapon.info.weight));

		for (var i in playerWeapon.info.uses)
			$('#weapon-action').append(
				$('<input>', {
					'class': 'btn btn-default',
					'type': 'button',
					'value': playerWeapon.info.uses[i].name
				})
			);
	};

	init();
};


$(function() {
    new DemoEngine();
});