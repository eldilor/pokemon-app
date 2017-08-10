function Pokemon(name, image, _maxHp, _maxEnergy ) {
    this.name = name;
    this.image = image;
    var hp = _maxHp;
    var energy = _maxEnergy;
    var maxHp = _maxHp;
    var maxEnergy = _maxEnergy;
    var attacks = [];

    if (this.constructor === Pokemon) {
        throw new Error('Can\'t create pokemon');
    }

    this.getHp = function () {
        return hp;
    };

    this.getEnergy = function () {
        return energy;
    };

    this.getAttacks = function() {
        return attacks;
    };

    this.getReadableEnergy = function() {
        return energy + ' / ' + maxEnergy;
    };

    this.getReadableHp = function () {
        return hp + ' / ' + maxHp;
    };

    this.getEnergyPercent = function () {
        return energy / maxEnergy;
    };

    this.getHpPercent = function () {
        return hp / maxHp;
    };

    this.setAttacks = function(_attacks) {
        attacks = _attacks;
    };

    this.performAttack = function(attack) {
        energy -= attack.effort;
    };

    this.defendAttack = function(attack) {
        hp -= attack.power;
    };
}

function Attack(name, power, effort) {
    this.name = name;
    this.power = power;
    this.effort = effort;
}

Attack.waterPulse = function () {
    return new this('Water Pulse', 20, 20);
};
Attack.rainDance = function () {
    return new this('Rain Dance', 20, 25);
};
Attack.hydroPump = function () {
    return new this('Hydro Pump', 40, 45);
};
Attack.waterGun = function () {
    return new this('Water Gun', 15, 12);
};
Attack.tackle = function () {
    return new this('Tackle', 7, 5);
};
Attack.vineWhip = function () {
    return new this('Vine Whip', 25, 12);
};
Attack.razorLeaf = function () {
    return new this('Razor Leaf', 30, 15);
};
Attack.solarBeam = function () {
    return new this('Solar Beam', 35, 25);
};
Attack.ember = function () {
    return new this('Ember', 13, 8);
};
Attack.flameBurst = function () {
    return new this('Flame Burst', 30, 20);
};
Attack.flareBlitz = function () {
    return new this('Flare Blitz', 35, 30);
};
Attack.quickAttack = function () {
    return new this('Quick Attack', 20, 15);
};
Attack.furyCutter = function () {
    return new this('Fury Cutter', 25, 25);
};
Attack.razorWind = function () {
    return new this('Razor Wind', 30, 32);
};
Attack.swordsDance = function () {
    return new this('Swords Dance', 40, 45);
};
Attack.bite = function () {
    return new this('Bite', 8, 10);
};
Attack.iceFang = function () {
    return new this('Ice Fang', 15, 13);
};
Attack.hurricane = function () {
    return new this('Hurricane', 35, 40);
};
Attack.twister = function () {
    return new this('Twister', 20, 30);
};

function Venozaur() {
    Pokemon.call(this, 'Venozaur', 'http://www.clipular.com/c/5220286632034304.png?k=0ADXDkYhxHaDYejNylKwW5HoWCk', 80, 80);
    this.setAttacks([
        Attack.tackle(),
        Attack.vineWhip(),
        Attack.razorLeaf(),
        Attack.solarBeam()
    ]);
}
function Charizard() {
    Pokemon.call(this, 'Charizard','http://www.clipular.com/c/5148847769911296.png?k=qrBNmD5NeYfV37pujXAPfsA-XzM', 78, 85);
    this.setAttacks([
        Attack.tackle(),
        Attack.ember(),
        Attack.flameBurst(),
        Attack.flareBlitz()
    ]);
}
function Blastoise() {
    Pokemon.call(this, 'Blastoise', 'http://www.clipular.com/c/5648302537441280.png?k=eI88zBvIGbpN5RGKxLsKj6HJe9E', 79, 85);
    this.setAttacks([
        Attack.waterPulse(),
        Attack.rainDance(),
        Attack.hydroPump(),
        Attack.waterGun()
    ]);
}
function Scyther() {
    Pokemon.call(this, 'Scyther', 'http://www.clipular.com/c/4650220991545344.png?k=wUSrdaDQ1-wzHJ6-KwmdO1tKFVo', 70, 85);
    this.setAttacks([
        Attack.quickAttack(),
        Attack.furyCutter(),
        Attack.razorWind(),
        Attack.swordsDance()
    ]);
}
function Gyarados() {
    Pokemon.call(this, 'Gyarados', 'http://www.clipular.com/c/4681119925796864.png?k=Lnid68PrY0mrTdBRt4j6Fx-nhsU', 95, 125);
    this.setAttacks([
        Attack.bite(),
        Attack.iceFang(),
        Attack.hurricane(),
        Attack.twister()
    ]);
}

const pokedex = [
    new Venozaur(),
    new Charizard(),
    new Blastoise(),
    new Scyther(),
    new Gyarados()
];
function Trainer(name, image) {
    this.name = name;
    this.image = image;
    this.pokemon = {};

    this.choosePokemon = function (pokemon) {
        this.pokemon = pokemon;
    };
}

function App() {
    var trainers = [];
    var currentTrainer = 0;
    this.message = '';

    this.init = function(pokemons) {
        var player = new Trainer('Oskar', 'images/trainer%200.PNG');
        var rival = new Trainer('Ash', 'images/trainer%201.PNG');
        var _this = this;

        trainers = [player, rival];

        this.renderPokemonsList(pokemons);
        $('.single-pokemon').on('click', function () {
            var pokemon = pokemons[$(this).data('pokemon')];
            trainers[0].choosePokemon(pokemon);
            $('#my-pokemon').attr('src', pokemon.image);
            var rivalPokemon = parseInt(Math.random() * pokemons.length);
            trainers[1].choosePokemon(pokemons[rivalPokemon]);
            $('#rival-pokemon').attr('src', pokemons[rivalPokemon].image);
            $('#intro').hide();
            $('#game').show();
            _this.renderAttacks();
            _this.attackClick();
            _this.renderGame();
            setInterval(function () {
                app.renderGame();
            }, 300);
        });
    };

    this.renderPokemonsList = function(pokemons) {
        var html = '';
        pokemons.forEach(function(pokemon, i) {
            html += '<div class="col-md-2 single-pokemon" data-pokemon="' + i + '">' +
                        '<img src="' + pokemon.image + '" class="img-responsive">' +
                        '<h3>' + pokemon.name + '</h3>' +
                        '<h5>HP: ' + pokemon.getHp() + '</h5>' +
                        '<h5>ENERGY: ' + pokemon.getEnergy() + '</h5>' +
                    '</div>';
        });
        $('#pokemon-list').html(html);
    };

    this.renderGame = function () {
        this.checkEndGame();
        var rivalHtml = '<div class="col-md-12">' +
            '<div class="bar" style="top: 25px;left: 60%;">' +
                '<span>ENERGY ' + trainers[1].pokemon.getReadableEnergy() + '</span>' +
            '</div>' +
            '<div class="bar energy-bar" style="top: 25px;left: 60%;width: ' + trainers[1].pokemon.getEnergyPercent() * 250 + 'px"></div>' +
            '<div class="bar" style="top: 55px;left: 60%;">' +
                '<span>HP ' + trainers[1].pokemon.getReadableHp() + '</span>' +
            '</div>' +
            '<div class="bar hp-bar" style="top: 55px;left: 60%;width: ' + trainers[1].pokemon.getHpPercent() * 250 + 'px"></div>' +
            '<img src="' + trainers[1].image + '" alt="" class="trainer-img rival">' +
            '</div>';
        $('#rival').html(rivalHtml);

        var playerHtml = '<div class="col-md-12">' +
            '<img src="' + trainers[0].image + '" alt="" class="trainer-img me">' +
            '<div class="bar" style="top: -30px;left: 210px;">' +
                '<span>HP ' + trainers[0].pokemon.getReadableHp() + '</span>' +
            '</div>' +
            '<div class="bar hp-bar" style="top: -30px;left: 210px;width: ' + trainers[0].pokemon.getHpPercent() * 250 + 'px"></div>' +
            '<div class="bar" style="top: -60px;left: 210px;">' +
                '<span>ENERGY ' + trainers[0].pokemon.getReadableEnergy() + '</span>' +
            '</div>' +
            '<div class="bar energy-bar" style="top: -60px;left: 210px;width: ' + trainers[0].pokemon.getEnergyPercent() * 250 + 'px"></div>' +
            '</div>';

        $('#player').html(playerHtml);
    };

    this.renderAttacks = function () {
        var html = '';
        if (currentTrainer === 0) {
            var attacks = trainers[0].pokemon.getAttacks();

            attacks.forEach(function (attack, i) {
                html += '<div class="col-md-6 attack" data-attack="' + i + '">' + attack.name + ' ' +
                    '<span class="power">Power: ' + attack.power + '</span> ' +
                    '<span class="energy">Energy: ' + attack.effort + '</span>' +
                    '</div>';
            });
        }

        $('#attacks').html(html);
    };

    this.attackClick = function () {
        var _this = this;
        $('.attack').on('click', function() {
            if (currentTrainer == 0) {
                var attackIndex = $(this).data('attack');
                var attacks = trainers[0].pokemon.getAttacks();
                var attack = attacks[attackIndex];
                trainers[0].pokemon.performAttack(attack);
                trainers[1].pokemon.defendAttack(attack);
                currentTrainer = 1;
                _this.rivalAttack();
            }
        });
    };

    this.rivalAttack = function () {
        var attacks = trainers[1].pokemon.getAttacks();
        var attackIndex = Math.floor(Math.random() * (attacks.length));
        var attack = attacks[attackIndex];
        trainers[0].pokemon.defendAttack(attack);
        trainers[1].pokemon.performAttack(attack);
        currentTrainer = 0;
    };

    this.checkEndGame = function () {
        var myPokemon = trainers[0].pokemon;
        var rivalPokemon = trainers[1].pokemon;
        if (myPokemon.getHp() < 0 || myPokemon.getEnergy() < 0) {
            document.location.reload();
            alert('Rival wins')
        } else if (rivalPokemon.getHp() < 0 || rivalPokemon.getEnergy() < 0) {
            document.location.reload();
            alert('Player wins')
        }
    }
}

var app = new App();
app.init(pokedex);