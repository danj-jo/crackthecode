import {sessionCollection, userCollection} from "./db";
import Player from "../game/components/Player";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";

export default class SessionClient {
    addGameToDb = async (obj: Object) => {
        try {
            await sessionCollection.insertOne(obj)
            return `Object inserted: ${JSON.stringify(obj)}`
        } catch (err: unknown) {
            return err
        }
    }
    addUserToDb = async (player: Player) => {
        try {
            await userCollection.insertOne(player)
            console.log(JSON.stringify(player))
            return `Object inserted: ${JSON.stringify(player)}`
        } catch (err) {
            console.log(`Error adding User to DB: ${err}`)
        }
    }
    validateUser = async (username: string, pwd: string): Promise<ObjectId | undefined> => {
        let player: Player = {
            username: '',
            email: '',
            password: '',
            dateRegistered: Date.now().toString()
        }
        let id: ObjectId = new ObjectId
        try {
            const user = await userCollection.findOne({username: username})
            if (user == null) {
                return
            }
            // @ts-ignore
            const password = await bcrypt.compare(pwd, user.password)
            if (!password) {
                return
            }

            if (password) {
                id = user ? user._id : new ObjectId()
            }
            //compare the hash of the stored version, and current version.
            // @ts-ignore
        } catch (err) {
            console.log(`Incorrect information: ${err}`)
        }
        console.log(`name: ${username} password: ${pwd}`)
        return id
    }
    // if all goes well here, send the cookie.
    checkForExistingUser = async (name: string, emailAddress: string) => {
        try {
            const usernameExists = await userCollection.findOne({username: name})
            if (usernameExists != null) {
                console.log('username exists already')
                return
            }
            const emailExists = await userCollection.findOne({email: emailAddress})
            if (emailExists != null) {
                console.log('email exists already.')
                return
            }
        } catch (err) {
            return err
        }
        return {name, emailAddress}
    }
    registerPlayer = async (name: string, emailAddress: string, pwd: string) => {
        let player: Player = {
            username: '',
            email: '',
            password: '',
            dateRegistered: Date.now().toString()
        }
        try {
            const check = await this.checkForExistingUser(name, emailAddress)
            if (!check) {
                return
            }
            const salt: string = bcrypt.genSaltSync(10)
            const hashedPassword: string = await bcrypt.hash(pwd, salt)
            player = {
                username: name,
                email: emailAddress,
                password: hashedPassword,
                dateRegistered: Date.now().toString()
            }
        } catch (err) {
            console.log(`Error registering: ${err}`)
        }
        await this.addUserToDb(player).catch(err => console.log(`Error: ${err}`))
        return player
    }
    returnUserFromId = async (id: ObjectId | undefined): Promise<Player> => {
        let player: Player = {
            username: '',
            email: '',
            password: '',
            dateRegistered: Date.now().toString()
        }
        try {
            const user = await userCollection.findOne({_id: id})
            player.username = user ? user.username : ''
            player.email = user ? user.email : ''
            player.password = user ? user.password : user
            player.dateRegistered = user ? user.dateRegistered : player.dateRegistered

        } catch (err) {
            console.log(`find by id err: ${err}`)
        }
        return player
    }
}