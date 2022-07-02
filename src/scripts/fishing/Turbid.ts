class Turbid implements Saveable {
    saveKey = 'turbid';
    defaults = {
        pokemons: FishingPokemons.None,
    };

    _pokemon: KnockoutObservable<FishingPokemons>;

    toJSON(): Record<string, any>  {
        return {};
    }

    fromJSON(json: Record<string, any>): void {
        {}
    }

    constructor(pokemon: FishingPokemons) {
        this._pokemon = ko.observable(pokemon).extend({ numeric: 0 });
    }

    generateFishingPokemon(route: number, region: GameConstants.Region) {
        const min = FishingController.fishRegion[region][0] - 2;
        const max = FishingController.fishRegion[region][1];
        const random = Math.floor(Math.random() * (max - min) + min);

        this._pokemon(random);

    }

    getPlot() {
        return this._pokemon();
    }
}
