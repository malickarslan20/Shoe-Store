const config={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
   
    appwriteOrderCollectionid: String(import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID),

    appwriteBucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteproductCollectionid: String(import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID),

}

export default config