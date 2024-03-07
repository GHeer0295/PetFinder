import pg from "pg";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
const { Client } = pg;

export module Database {
    const NO_ERROR: number= 1000;
    const FAILED_TO_INSERT_ERROR: number= 1001;
    const FAILED_TO_GET_ERROR: number = 1002;
    const DUPLICATE_KEY_ERROR: number= 1003;

    //TODO: Change message to contain index id and not time zone
    const client = new Client({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: '4231',
        database: 'postgres'
    });

    // on server init, run this function
    export function connect() {
        client.connect((err) => {
            if(!err) {
                console.log('CONNECTED TO DATABASE');
            } else {
                console.log("ERROR: " + err);
                return err;
            }
        });
    }

    export async function getConversationMessages(conversationID: any) {
        const query = `SELECT * FROM msg m WHERE m.conversationid = $1 ORDER BY timestamp ASC`;
        const values = [conversationID];

        try {
            const result = await client.query(query, values)
            return result.rows;
        } catch(error) {
            console.error(`ERROR: ${error}. Cannot execute query with ConversationID: ${conversationID}`);
            return error;
        }
    }

    export async function saveMessage(conversationID: UUID, senderID: UUID, message: string, members: Array<UUID>, isNew: boolean) {
        if(isNew) {
            console.log(`Request: Create new Conversation from User: ${senderID}, members: ${members}`);
            let newConversationError = await createNewConversation(conversationID, members);
            if(newConversationError != NO_ERROR) {
                throw new Error(`Cannot create new Conversation`);
            }

            // saved message in Database
            console.log(`OK: Created new Conversation with ID: ${conversationID} with members: ${members}`);
        }
        
        let insertMessageError = await insertMessage(conversationID, senderID, message);
        if(insertMessageError != NO_ERROR) {
            throw new Error(`Error: ${insertMessageError}`);
        }

        // saved message in Database
        console.log(`OK: Inserted new message with to ConversationID: ${conversationID} from senderID: ${senderID}`);
    }

    export async function createNewConversation(conversationID: UUID, members: Array<UUID>) {
        try {
            const query = `INSERT INTO conversation(conversationid, members)
                            VALUES($1, $2)`;
            const values = [conversationID, [members]];
    
            await client.query(query, values);
            return NO_ERROR;
        } catch (error) {
            console.error(`Error: Unable to execute query. ${error}`);
            return FAILED_TO_INSERT_ERROR;
        }
    }    

    export async function insertMessage(conversationID: UUID, senderID: UUID, message: string){
        try {
            const query = `INSERT INTO msg(conversationid, senderid, message)
                           VALUES($1, $2, $3)`;
            const values = [conversationID, senderID, message];
            await client.query(query, values);
            return NO_ERROR;
        } catch(error) {
            console.error(`Error: Unable to execute query. ${error}`);
            return FAILED_TO_INSERT_ERROR;
        }
    }

    export async function getUserConversations(UserUUID: string) {
        try {
            const query = `SELECT * FROM conversation c WHERE $1 = ANY(c.members)`;
            const values = [UserUUID];

            const result = await client.query(query, values);
            return result.rows;
        } catch(error) {
            console.error(`Error: Cannot get User conversations. ${error}, UserID: ${UserUUID}`);
            return FAILED_TO_GET_ERROR;
        }
    }
}