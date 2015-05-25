var weaponsDb = {
	0: {
		name: 'Faca',
		description: 'Faca simples de combate',
		image: '',
		weight: 0.3,
		uses: {
			0: {
				name: 'Ataque Leve',
				delay: 0.2,
				minDmg: 10,
				medDmg: 15,
				maxDmg: 25
			},
			1: {
				name: 'Ataque Forte',
				delay: 1,
				minDmg: 15,
				medDmg: 35,
				maxDmg: 70
			}
		}
	},
	1: {
		name: 'Pistola',
		description: 'Pistola nova de fabrica',
		image: '',
		weight: 0.6,
		maxAmmo: 100,
		maxExtraAmmo: 300,
		uses: {
			0: {
				name: 'Tiro Comum',
				delay: 0.01,
				minDmg: 10,
				medDmg: 20,
				maxDmg: 100,
				bullets: 1
			}
		}
	}
};

var repository = {
	weaponList: [],
	weightLimit: 0,
	setWeightLimit: function(w) {
		this.weightLimit = (w >= 0) ? w: 0;
	},
	currentWeight: function() {
		var totalWeight = 0;
		for (var i in this.weaponList)
			totalWeight += this.weaponList[i].weight;
		
		return totalWeight;
	},
	viewWeapons: function() {
		for (var i in this.weaponList)
			console.log();
	},
	placeWeapon: function(weapon) {
		if (this.currentWeight() + weapon.weight > this.weightLimit) {
			console.log('O container não suporta o peso da arma.');
			return;
		}
	},
	takeWeapon: function(slot) {
		
	}
};

function weapon() {
	var self = this;
	self.info = {
		name: '',
		description: '',
		image: '',
		weight: 0,
		uses: {},
		maxAmmo: 0,
		ammo: 0,
		maxExtraAmmo: 0,
		extraAmmo: 0
	};
	
	self.setWeapon = function (name, desc, image, weight, uses, maxAmmo, maxExtraAmmo) {
		self.info = {
			name: name,
			description: desc,
			image: image,
			weight: weight,
			uses: uses,
			maxAmmo: maxAmmo,
			maxExtraAmmo: maxExtraAmmo
		};
	};

	self.loadWeapon = function (dbSlot) {
		var w = weaponsDb[dbSlot];
		self.setWeapon(w.name, w.description, w.image, w.weight, w.uses, w.maxAmmo, w.maxExtraAmmo);
	};

	self.fire = function (attack) {
		if (!self.info.uses) {
			console.log('Arma inexistente ou sem uso requerido.');
			return;
		}

		//Verifica se nescessita de balas
		var ammoDown = 0;
		if (self.info.maxAmmo > 0) {
			//Se possui balas o suficiente
			if (self.info.ammo < self.info.uses[attack].bullets) {
				console.log('A arma precisa ser recarregada');
				return;
			}

			ammoDown = self.info.uses[attack].bullets;
		}

		console.log('Ataque usado: ' + self.info.uses[attack].name);
		if (ammoDown) {
			self.info.ammo -= ammoDown;
			console.log('Balas restantes: ' + self.info.ammo);
		}
	};

	self.reload = function () {
		if (!self.info.maxAmmo) {
			console.log('A arma não nescessita de balas');
			return;
		}

		if (self.info.maxAmmo == self.info.ammo) {
			console.log('A arma já esta totalmente carregada');
			return;
		}

		if (!self.info.extraAmmo) {
			console.log('Não existem balas extras para serem recarregadas');
			return;
		}

		var reloadAmount = (self.info.extraAmmo >= self.info.maxAmmo) ?
							self.info.maxAmmo :
							self.info.extraAmmo;

		self.info.ammo = reloadAmount;
		self.info.extraAmmo -= reloadAmount;

		console.log(self.info.ammo, self.info.extraAmmo);
	};

	self.restockExtraAmmo = function (ammount) {
		if (!self.info.maxExtraAmmo) {
			console.log('Essa arma não tem supporte a munição extra');
			return;
		}

		self.info.extraAmmo = (ammount >= self.info.maxExtraAmmo) ? self.info.maxExtraAmmo : ammount;
	};

	return this;
}

// weapon.loadWeapon(1)
// weapon.fire(0);
// weapon.reload();
// weapon.restockExtraAmmo(35);
// weapon.reload();
// weapon.fire(0);