import {
    AchievementOption,
    AchievementType,
    Region,
    ROUTE_KILLS_NEEDED,
} from '../GameConstants';
import Routes from '../routes/Routes';
import AchievementRequirement from './AchievementRequirement';

export default class ShinyQuestRequirement extends AchievementRequirement {
    constructor(
        value: number,
        public region: Region,
        public route: number,
        option: AchievementOption = AchievementOption.more,
    ) {
        super(value, option, AchievementType['Shiny Quest']);
    }

    public getProgress() {
        const routeKills = App.game.statistics.shinybyroad[this.region][this.route]();
        return Math.min(routeKills, this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue !== ROUTE_KILLS_NEEDED) {
            return `${this.requiredValue} Pokémon need to be defeated on ${Routes.getName(this.route, this.region)}.`;
        }

        return `${Routes.getName(this.route, this.region)} still needs to be completed.`;
    }
}
