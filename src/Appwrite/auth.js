import config from "../Configure/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.account = new Account(this.client);
    
  }

  async createaccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return useraccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getcurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getcurrentuser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      const user = await this.account.get();
      if (user) {
        return await this.account.deleteSessions();
      }
    } catch (error) {
      if (error.code === 401) {
        console.log("User already logged out.");
        return;
      }
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

// Export an instance
const authService = new AuthService();
export default authService;
