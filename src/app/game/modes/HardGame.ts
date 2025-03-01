import GameConfiguration from "../creation/GameConfiguration";
import Player from "../components/Player";

export default class HardGame extends GameConfiguration{
    override player: Player
    override difficulty: string = 'hard';
    override hints: string[] = []
    override hintsEnabled: boolean = false
    constructor(player:Player){
        super(player)
        this.player = player
    }
}