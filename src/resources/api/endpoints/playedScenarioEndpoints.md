# Get all played scenarios

GET: /api/played-scenarios

# Get played scenarios for a specific user

GET: /api/played-scenarios/user/:userId

# Get played scenarios for a specific character

GET: /api/played-scenarios/character/:characterId

# Log a new played scenario

POST: /api/played-scenarios

# Update progress or completion status of a played scenario

PATCH: /api/played-scenarios/:playedScenarioId

# Delete a played scenario entry (Admin)

DELETE: /api/played-scenarios/:playedScenarioId
