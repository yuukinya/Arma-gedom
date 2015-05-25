var weaponsDb = {
	0: {
		name: 'Faca',
		description: 'Faca simples de combate',
		image: 'Knife-icon.png',
		weight: 0.3,
		reloadTime: 0,
		maxAmmo: 0,
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
		image: 'Pistol-icon.png',
		weight: 0.6,
		maxAmmo: 100,
		maxExtraAmmo: 300,
		reloadTime: 3,
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
		reloadTime: 0,
		maxExtraAmmo: 0,
		extraAmmo: 0
	};

	self.setWeapon = function (name, desc, image, weight, uses, maxAmmo, maxExtraAmmo, reload) {
		var newInfo = {
			name: name,
			description: desc,
			image: image,
			weight: weight,
			uses: uses,
			maxAmmo: maxAmmo,
			maxExtraAmmo: maxExtraAmmo,
			reloadTime: reload
		};
		
		$.extend(self.info, newInfo );
	};

	self.loadWeapon = function (dbSlot) {
		var w = weaponsDb[dbSlot];
		self.setWeapon(w.name, w.description, w.image, w.weight, w.uses, w.maxAmmo, w.maxExtraAmmo, w.reloadTime);
	};

	self.fire = function (attack) {
		if (!self.info.uses)
			return {status: 0, message: 'Arma inexistente ou sem uso requerido'};

		//Verifica se nescessita de balas
		var ammoDown = 0;
		if (self.info.maxAmmo > 0) {
			//Se possui balas o suficiente
			if (self.info.ammo < self.info.uses[attack].bullets)
                return {status: 0, message: 'A arma precisa ser recarregada'};

			ammoDown = self.info.uses[attack].bullets;
		}

		if (ammoDown) {
			self.info.ammo -= ammoDown;
		}

        //Metodo aleatório de escolha de dano
        var rand = ((Math.random() * (3 - 0) + 0) | 0);
        var dmg = 0;
        if (rand === 0)
            dmg = self.info.uses[attack].minDmg;
        if (rand === 1)
            dmg = self.info.uses[attack].medDmg;
        if (rand === 2)
            dmg = self.info.uses[attack].maxDmg;
        
        return {
            status: 1,
            message: 'Ataque usado: ' + self.info.uses[attack].name + ', Dano causado: ' + dmg + '%',
            delay: self.info.uses[attack].delay
        }
	};

	self.reload = function () {
		if (!self.info.maxAmmo)
            return {status: 0, message: 'A arma não nescessita de balas'};

		if (self.info.maxAmmo == self.info.ammo)
            return {status: 0, message: 'A arma já esta totalmente carregada'};

		if (!self.info.extraAmmo)
            return {status: 0, message: 'Não existem balas extras para serem recarregadas'};

		var reloadAmount = (self.info.extraAmmo >= self.info.maxAmmo)
						 ? self.info.maxAmmo
						 : self.info.extraAmmo;

		//verifica se a quantidade de balas atual + a quantidade a ser carregada é maior q o compartimanto
		if (self.info.ammo + reloadAmount > self.info.maxAmmo)
			reloadAmount = (self.info.maxAmmo - self.info.ammo);
		
		self.info.ammo += reloadAmount;

		self.info.extraAmmo -= reloadAmount;

		if (self.info.reloadTime)
			setTimeout(function () {}, (1000 * self.info.reloadTime));

        return {status: 1, message: 'A arma foi recarregada'};
	};

	self.restockExtraAmmo = function (ammount) {
		if (!self.info.maxExtraAmmo)
            return {status: 0, message: 'Essa arma não tem supporte a munição extra'};

		self.info.extraAmmo = (ammount >= self.info.maxExtraAmmo) ? self.info.maxExtraAmmo : ammount;
	};

	return this;
}