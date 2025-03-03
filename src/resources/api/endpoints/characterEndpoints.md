# Get all available characters

GET: /api/characters/

# Get user-character by user ID

GET: /api/characters/:userId

# Update character stats by character ID

PUT: /api/characters/:characterId

# Select a character for a user (happens at registration)

PUT: /api/user/character

# Create a new character (for testing purposes)

POST: /api/characters/

# Remove a character by character ID (only when account is deleted)

DELETE: /api/characters/:characterId
