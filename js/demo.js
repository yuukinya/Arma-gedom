var DemoEngine = function() {
	var self = this;
	var playerWeapon = new weapon();

	init = function() {
		//Carrega por padrão a primeira arma do banco
		playerWeapon.loadWeapon(1);
		
		//Balas iniciais para o demo
		playerWeapon.restockExtraAmmo(35);
		self.updateEquipedWeapon();
		
		$('.wc-content a').click(function(){
			console.log($(this).data('weaponid'));
			playerWeapon.loadWeapon($(this).data('weaponid'));

			if ($(this).data('weaponid') === 1)
				playerWeapon.restockExtraAmmo(35);
			
			self.updateEquipedWeapon();
		});
	};
	
	self.updateEquipedWeapon = function() {
		$('.wcd-item').empty().hide();
		$('#weapon-action').empty();

		if (playerWeapon.info.image)
			$('#wcd-image').append($('<img>').attr('src', 'img/' + playerWeapon.info.image)).show();

		if (playerWeapon.info.name)
			$('#wcd-name').append($('<p>').text('Nome: ' + playerWeapon.info.name)).show();

		if (playerWeapon.info.description)
			$('#wcd-description').append($('<p>').text('Descrição: ' + playerWeapon.info.description)).show();

		if (playerWeapon.info.weight)
			$('#wcd-weight').append($('<p>').text('Peso: ' + playerWeapon.info.weight)).show();

		if (playerWeapon.info.maxAmmo) {
			$('#wcd-ammo').append($('<p>').text('Munição: ' + playerWeapon.info.ammo + '/' + playerWeapon.info.maxAmmo)).show();
			
			$('#wcd-extraAmmo').append($('<p>').text('Munição Extra: ' + playerWeapon.info.extraAmmo + '/' + playerWeapon.info.maxExtraAmmo)).show();
		}

        //Cria os botões de ação
		for (var i in playerWeapon.info.uses) {
			$('#weapon-action').append(
				$('<input>', {
					'class': 'btn btn-default',
					'type': 'button',
					'value': playerWeapon.info.uses[i].name,
                    'data-actionid': i
				}).click(function () {
                    //Desabilita os botões (até que passe o tempo entre ataques);
                    var btms = $('#weapon-action').find('.btn');
                    btms.prop('disabled', true);

                    var attack = playerWeapon.fire($(this).data('actionid'));

                    if (attack) {
                        $('#wp-action').prepend( $('<div>').text(attack.message) );
                        
                        //Reabilita os botões ao fim do tempo entre ataques
                        if (attack.status == 1) {
							if (playerWeapon.info.maxAmmo)
								$('#wcd-ammo').children('p').text('Munição: ' + playerWeapon.info.ammo + '/' + playerWeapon.info.maxAmmo);
                            setTimeout(function () {
                                btms.prop('disabled', false);
                            }, (1000 * attack.delay));
						} else {
							btms.prop('disabled', false);
						}
                    }

                })
			);
        }
		
		//Cria o botão de recarregar
		if (playerWeapon.info.maxAmmo) {
			$('#weapon-action').append(
				$('<input>', {
					'class': 'btn btn-default',
					'type': 'button',
					'value': 'Recarregar'
				}).click(function () {
                    var btms = $('#weapon-action').find('.btn');
                    btms.prop('disabled', true);

                    var reload = playerWeapon.reload();
					$('#wp-action').prepend( $('<div>').text(reload.message) );
					
					if (reload.status === 1) {
						$('#wcd-ammo').children('p').text('Munição: ' + playerWeapon.info.ammo + '/' + playerWeapon.info.maxAmmo);
						$('#wcd-extraAmmo').children('p').text('Munição Extra: ' + playerWeapon.info.extraAmmo + '/' + playerWeapon.info.maxExtraAmmo);
					}

					btms.prop('disabled', false);
                })
			);
		}
	};

	init();
};


$(function() {
    new DemoEngine();
});