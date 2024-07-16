
import { Client, Databases, Account } from "appwrite";

const url: string = 'https://cloud.appwrite.io/v1';
const project: string = '663c8ef200055b4062a8';

const client: Client = new Client();

client.setEndpoint(url).setProject(project);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
