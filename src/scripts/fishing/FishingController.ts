class FishingController {

    public static fishablePokemonList: KnockoutObservableArray<FishingPokemons> = ko.observableArray([]);
    public static fishRegion = [];

    public static iniatilize() {
        this.fishablePokemonList(Array.from(Array(GameHelper.enumLength(FishingPokemons) - 1).keys()).slice(0, 2));
        //fishing possible pokemon by region
        this.fishRegion[GameConstants.Region.kanto] = [1, 2];
        this.fishRegion[GameConstants.Region.johto] = [];
        this.fishRegion[GameConstants.Region.hoenn] = [];
        this.fishRegion[GameConstants.Region.sinnoh] = [];
        this.fishRegion[GameConstants.Region.unova] = [];
    }

    public static plotClick(index: number) {
        const turbid: Turbid = App.game.fishing.FishPlot[index];
        console.log(turbid._pokemon());
    }

    public static getFishablePokemon() {
        return this.fishablePokemonList;
    }

    public static getPokemonImage(index) {
        const p = pokemonList.find(ele => {
            if (ele.name === FishingPokemons[index].toString()) {
                return ele;
            }
        });
        return `assets/images/pokemon/${p.id}.png`;
    }

    public static getPokemonName(index) {
        return FishingPokemons[index].toString();
    }

    public static getImage(index: number) {
        const p = pokemonList.find(ele => {
            if (ele.name === FishingPokemons[App.game.fishing.FishPlot[index].getPlot()].toString()) {
                return ele;
            }
        });

        if (p != undefined) {
            return `assets/images/pokemon/${p.id}.png`;
        } else {
            return 'assets/images/farm/soil.png';
        }
    }
}
