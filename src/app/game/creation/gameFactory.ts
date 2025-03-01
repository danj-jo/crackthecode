import Player from "../components/Player";
import EasyGame from "../modes/EasyGame";
import MediumGame from "../modes/MediumGame";
import HardGame from "../modes/HardGame";
import GameConfiguration from "./GameConfiguration";
export const gameFactory = (player: Player, difficulty: string): GameConfiguration => {
    switch(difficulty){
        case 'easy':
            return new EasyGame(player)
        case 'medium':
            return new MediumGame(player)
        case 'hard':
            return new HardGame(player)
        default:
            return new EasyGame(player)
    }
}
