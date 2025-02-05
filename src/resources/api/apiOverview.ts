export const API_OVERVIEW = {
  users: {
    register: "POST /api/users/register",
    login: "POST /api/users/login",
    getProfile: "GET /api/users/profile/:userId",
    updateProfile: "PUT /api/users/profile/:userId",
    deleteUser: "DELETE /api/users/:userId",
  },
  characters: {
    getCharacter: "GET /api/characters/:userId",
    updateCharacter: "PUT /api/characters/:characterId",
  },
  rules: {
    getAllRules: "GET /api/rules",
    searchRules: "GET /api/rules/search?query=",
    getRuleById: "GET /api/rules/:ruleId",
  },
  items: {
    getAllItems: "GET /api/items",
    getItemById: "GET /api/items/:itemId",
    updateInventory: "PUT /api/characters/:characterId/inventory",
  },
  monsters: {
    getAllMonsters: "GET /api/monsters",
    getMonsterById: "GET /api/monsters/:monsterId",
    getEliteMonsters: "GET /api/monsters?rank=Elite",
    getNormalMonsters: "GET /api/monsters?rank=Normal",
  },
  abilities: {
    getAllAbilities: "GET /api/abilities",
    getAbilityById: "GET /api/abilities/:abilityId",
    getCharacterAbilities: "GET /api/characters/:characterId/abilities",
    updateCharacterAbilities: "PUT /api/characters/:characterId/abilities",
  },
  progress: {
    getProgress: "GET /api/progress/:userId",
    updateProgress: "PUT /api/progress/:userId",
    getCompletedScenarios: "GET /api/progress/:userId/scenarios",
    updateCompletedScenarios: "PUT /api/progress/:userId/scenarios",
  },
};
