import GameConfiguration from "../creation/GameConfiguration";
import Player from "../components/Player";

export default class MediumGame extends GameConfiguration{
    override player: Player
    override difficulty: string = 'medium';
    override hints: string[] = []
    override hintsEnabled: boolean = true
    constructor(player:Player){
        super(player)
        this.player = player
    }
}