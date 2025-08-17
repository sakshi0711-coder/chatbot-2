Role: user
- chats: Select/Insert/Update/Delete where user_id = X-Hasura-User-Id
- messages: Select/Insert where messages.chat_id → chats.user_id = X-Hasura-User-Id
Enable RLS for both tables.

