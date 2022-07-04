/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />
/// <reference path="../../declarations/enums/FishingPokemons.d.ts"/>
class Fishing implements Feature {
    name = 'Fishing';
    saveKey = 'Fishing';

    defaults = {
        FishablePokemon: Array<number>(GameHelper.enumLength(FishingPokemons) - 1).fill(0),
        FishPlot: new Array(GameConstants.FARM_PLOT_WIDTH * GameConstants.FARM_PLOT_HEIGHT).fill(null).map((value, index) => {
            const middle = Math.floor(GameConstants.FARM_PLOT_HEIGHT / 2) * GameConstants.FARM_PLOT_WIDTH + Math.floor(GameConstants.FARM_PLOT_WIDTH / 2);
            return new Turbid(FishingPokemons.None);
        }),
    };

    FishPlot: Array<Turbid>;


    constructor() {
        this.FishPlot = this.defaults.FishPlot;
    }

    initialize(): void {
        this.FishPlot.forEach(plot => {
            //base route for fishing
            plot.generateFishingPokemon(12, player._region());
        });
    }

    canAccess(): boolean {
        return MapHelper.accessToRoute(11, GameConstants.Region.kanto) && App.game.oakItems.isUnlocked(OakItemType.Fishing_Rod);
    }

    update(delta: number): void {

    }

    toJSON(): Record<string, any> {
        return {};
    }

    fromJSON(json: Record<string, any>): void {
    }

    openFishingSpotModal(route: number, region: GameConstants.Region) {
        if (this.canAccess()) {
            $('#fishingModal').modal('show');
            $('#fishingModal').on('show.bs.modal', () => {
                this.FishPlot.forEach((plot) => {
                    plot.generateFishingPokemon(route, region);
                });
            });
        } else {
            Notifier.notify({
                message: 'You need the Fishing Rod to access this location.\n<i>Check out the shop at Vermilion City</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
}
