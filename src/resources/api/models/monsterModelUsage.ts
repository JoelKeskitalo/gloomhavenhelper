import { Monster } from '../models/monsterModel'

const normalLivingBones: Monster = {
    id: "1",
    name: "Living Bones",
    rank: "Normal",
    health: 5,
    move: 2,
    attack: 2,
    range: undefined, // meaning close combat
    level: 1,
    traits: ["Undead"],
    abilities: ["Shield 1", "Self-Heal"]
}

const eliteLivingBones: Monster = {
    id: "2",
    name: "Living Bones",
    rank: "Elite",
    health: 8,
    move: 3,
    attack: 3,
    range: undefined;
    level: 1,
    traits: ["Undead"],
    abilities: ["Shield 2", "Self-Heal"]
}

