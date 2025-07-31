import config from "../Configure/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createProduct({ title, description, category, image,Price }) {
    console.log("database image",image)
   const imageURL= this.getFilePreview(image);
   console.log("image url is",imageURL)
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseid,
        config.appwriteproductCollectionid,
        ID.unique(),
        {
          title,
          description,
          category,
          image:imageURL, 
          Price
          
        }
      );
    } catch (error) {
      console.error("Appwrite :: createProduct :: error", error);
      throw error;
    }
  }
 


  async getProducts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseid,
        config.appwriteproductCollectionid
      );
    } catch (error) {
      console.log("Appwrite :: getProducts :: error", error);
    }
  }


getOrders = async () => {
  try {
    console.log("collection in db.js ",config.appwriteOrderCollectionid)
    const res = await this.databases.listDocuments(
      config.appwriteDatabaseid,
      
      config.appwriteOrderCollectionid
    );
    
    return res;
    
  } catch (error) {
    console.error("Appwrite :: getOrders :: error", error);
    
  }
};



  
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketid, fileId);
    } catch (error) {
      console.log("Appwrite :: deleteFile :: error", error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(config.appwriteBucketid, fileId);
  }
  
  

}

const service = new Service();
export default service;
