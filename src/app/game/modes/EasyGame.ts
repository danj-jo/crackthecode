import SinglePlayerGameConfiguration from "../creation/GameConfiguration";
import Player from "../components/Player";

export default class EasyGame extends SinglePlayerGameConfiguration{
    override player: Player
    override difficulty: string = 'easy';
    override hints: string[] = []
    override hintsEnabled: boolean = true
    constructor(player:Player){
        super(player)
        this.player = player
    }
}