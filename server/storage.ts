import { 
  users, properties, wishlists, inquiries,
  type User, type InsertUser,
  type Property, type InsertProperty,
  type Wishlist, type InsertWishlist,
  type Inquiry, type InsertInquiry
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;

  // Property operations
  getProperty(id: number): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  searchProperties(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    bedrooms?: number;
    status?: string;
  }): Promise<Property[]>;

  // Wishlist operations
  getUserWishlist(userId: number): Promise<(Wishlist & { property: Property })[]>;
  addToWishlist(wishlist: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(userId: number, propertyId: number): Promise<boolean>;
  isInWishlist(userId: number, propertyId: number): Promise<boolean>;

  // Inquiry operations
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
  deleteInquiry(id: number): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  private db: any;

  constructor(db: any) {
    this.db = db;
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      // Create collections if they don't exist
      const collections = await this.db.listCollections().toArray();
      const collectionNames = collections.map((c: any) => c.name);

      if (!collectionNames.includes('users')) {
        await this.db.createCollection('users');
        await this.db.collection('users').createIndex({ email: 1 }, { unique: true });
      }

      if (!collectionNames.includes('properties')) {
        await this.db.createCollection('properties');
      }

      if (!collectionNames.includes('wishlists')) {
        await this.db.createCollection('wishlists');
      }

      if (!collectionNames.includes('inquiries')) {
        await this.db.createCollection('inquiries');
      }

      if (!collectionNames.includes('counters')) {
        await this.db.createCollection('counters');
        await this.db.collection('counters').insertMany([
          { _id: 'users', seq: 1 },
          { _id: 'properties', seq: 1 },
          { _id: 'wishlists', seq: 1 },
          { _id: 'inquiries', seq: 1 }
        ]);
      }

      // Create default admin user if it doesn't exist
      const adminExists = await this.db.collection('users').findOne({ email: 'admin@luxehomes.com' });
      if (!adminExists) {
        await this.createUser({
          firstName: "Admin",
          lastName: "User",
          email: "admin@luxehomes.com",
          password: "$2b$10$8K1p/a0dclxKoNqIfrHb2eUdW.7CG4GGUGnT9S6N0/jP7SJo9lgPu", // admin123 hashed
          role: "admin"
        });

        // Add sample properties
        await this.seedProperties();
      }

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  private async getNextSequence(name: string): Promise<number> {
    const result = await this.db.collection('counters').findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { returnDocument: 'after', upsert: true }
    );
    return result.value.seq;
  }

  private async seedProperties() {
    const sampleProperties = [
      {
        title: "Luxury Modern Villa",
        description: "A stunning modern villa with panoramic views and luxury amenities including a swimming pool, modern kitchen, and spacious living areas.",
        price: "1250000",
        location: "Beverly Hills, CA",
        propertyType: "villa",
        bedrooms: 4,
        bathrooms: 3.5,
        area: 2500,
        status: "available",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        features: ["Swimming Pool", "Garden", "Garage", "Modern Kitchen", "Fireplace", "Wine Cellar"],
        agentId: 1
      },
      {
        title: "Downtown Luxury Apartment",
        description: "Contemporary apartment in the heart of the city with stunning city views and modern amenities.",
        price: "850000",
        location: "Manhattan, NY",
        propertyType: "apartment",
        bedrooms: 2,
        bathrooms: 2.0,
        area: 1200,
        status: "available",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        features: ["City Views", "Modern Appliances", "Gym Access", "Concierge", "Rooftop Terrace"],
        agentId: 1
      },
      {
        title: "Family Suburban Home",
        description: "Perfect family home in a quiet neighborhood with great schools and family-friendly amenities.",
        price: "475000",
        location: "Austin, TX",
        propertyType: "house",
        bedrooms: 3,
        bathrooms: 2.0,
        area: 1800,
        status: "available",
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        features: ["Large Yard", "Fireplace", "Updated Kitchen", "Two-Car Garage", "Playground Access"],
        agentId: 1
      },
      {
        title: "Modern Townhouse",
        description: "Stylish townhouse with contemporary design and urban convenience.",
        price: "725000",
        location: "Seattle, WA",
        propertyType: "townhouse",
        bedrooms: 3,
        bathrooms: 2.5,
        area: 1600,
        status: "sold",
        images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        features: ["Modern Design", "Rooftop Deck", "Walk-in Closet", "Energy Efficient"],
        agentId: 1
      },
      {
        title: "Oceanview Condo",
        description: "Beautiful condo with breathtaking ocean views and resort-style amenities.",
        price: "650000",
        location: "Miami, FL",
        propertyType: "condo",
        bedrooms: 2,
        bathrooms: 2.0,
        area: 1100,
        status: "available",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        features: ["Ocean View", "Pool Access", "Beach Access", "Balcony", "Resort Amenities"],
        agentId: 1
      },
      {
        title: "Country Estate",
        description: "Spacious country estate with multiple acres and traditional charm.",
        price: "890000",
        location: "Nashville, TN",
        propertyType: "house",
        bedrooms: 5,
        bathrooms: 4.0,
        area: 3200,
        status: "available",
        images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        features: ["Large Acreage", "Barn", "Horse Stables", "Traditional Design", "Multiple Fireplaces"],
        agentId: 1
      }
    ];

    for (const property of sampleProperties) {
      await this.createProperty(property);
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await this.db.collection('users').findOne({ id });
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.db.collection('users').findOne({ email });
      return user || undefined;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const id = await this.getNextSequence('users');
      const user: User = {
        ...insertUser,
        id,
        createdAt: new Date(),
      };
      await this.db.collection('users').insertOne(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    try {
      const result = await this.db.collection('users').findOneAndUpdate(
        { id },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      return result.value || undefined;
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await this.db.collection('users').deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.db.collection('users').find({}).toArray();
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Property operations
  async getProperty(id: number): Promise<Property | undefined> {
    try {
      const property = await this.db.collection('properties').findOne({ id });
      return property || undefined;
    } catch (error) {
      console.error('Error getting property:', error);
      return undefined;
    }
  }

  async getAllProperties(): Promise<Property[]> {
    try {
      const properties = await this.db.collection('properties').find({}).toArray();
      return properties;
    } catch (error) {
      console.error('Error getting all properties:', error);
      return [];
    }
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    try {
      const id = await this.getNextSequence('properties');
      const property: Property = {
        ...insertProperty,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.db.collection('properties').insertOne(property);
      return property;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  async updateProperty(id: number, updateData: Partial<InsertProperty>): Promise<Property | undefined> {
    try {
      const result = await this.db.collection('properties').findOneAndUpdate(
        { id },
        { $set: { ...updateData, updatedAt: new Date() } },
        { returnDocument: 'after' }
      );
      return result.value || undefined;
    } catch (error) {
      console.error('Error updating property:', error);
      return undefined;
    }
  }

  async deleteProperty(id: number): Promise<boolean> {
    try {
      const result = await this.db.collection('properties').deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting property:', error);
      return false;
    }
  }

  async searchProperties(filters: {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    bedrooms?: number;
    status?: string;
  }): Promise<Property[]> {
    try {
      const query: any = {};

      if (filters.location) {
        query.location = { $regex: filters.location, $options: 'i' };
      }

      if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) {
          query.price.$gte = filters.minPrice.toString();
        }
        if (filters.maxPrice) {
          query.price.$lte = filters.maxPrice.toString();
        }
      }

      if (filters.propertyType) {
        query.propertyType = filters.propertyType;
      }

      if (filters.bedrooms) {
        query.bedrooms = { $gte: filters.bedrooms };
      }

      if (filters.status) {
        query.status = filters.status;
      }

      const properties = await this.db.collection('properties').find(query).toArray();
      return properties;
    } catch (error) {
      console.error('Error searching properties:', error);
      return [];
    }
  }

  // Wishlist operations
  async getUserWishlist(userId: number): Promise<(Wishlist & { property: Property })[]> {
    try {
      const wishlists = await this.db.collection('wishlists').find({ userId }).toArray();
      const result = [];
      
      for (const wishlist of wishlists) {
        const property = await this.getProperty(wishlist.propertyId);
        if (property) {
          result.push({ ...wishlist, property });
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error getting user wishlist:', error);
      return [];
    }
  }

  async addToWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    try {
      const id = await this.getNextSequence('wishlists');
      const wishlist: Wishlist = {
        ...insertWishlist,
        id,
        createdAt: new Date(),
      };
      await this.db.collection('wishlists').insertOne(wishlist);
      return wishlist;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  async removeFromWishlist(userId: number, propertyId: number): Promise<boolean> {
    try {
      const result = await this.db.collection('wishlists').deleteOne({ userId, propertyId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  }

  async isInWishlist(userId: number, propertyId: number): Promise<boolean> {
    try {
      const wishlist = await this.db.collection('wishlists').findOne({ userId, propertyId });
      return !!wishlist;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      return false;
    }
  }

  // Inquiry operations
  async getAllInquiries(): Promise<Inquiry[]> {
    try {
      const inquiries = await this.db.collection('inquiries').find({}).toArray();
      return inquiries;
    } catch (error) {
      console.error('Error getting all inquiries:', error);
      return [];
    }
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    try {
      const inquiry = await this.db.collection('inquiries').findOne({ id });
      return inquiry || undefined;
    } catch (error) {
      console.error('Error getting inquiry:', error);
      return undefined;
    }
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    try {
      const id = await this.getNextSequence('inquiries');
      const inquiry: Inquiry = {
        ...insertInquiry,
        id,
        status: "pending",
        createdAt: new Date(),
      };
      await this.db.collection('inquiries').insertOne(inquiry);
      return inquiry;
    } catch (error) {
      console.error('Error creating inquiry:', error);
      throw error;
    }
  }

  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    try {
      const result = await this.db.collection('inquiries').findOneAndUpdate(
        { id },
        { $set: { status } },
        { returnDocument: 'after' }
      );
      return result.value || undefined;
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      return undefined;
    }
  }

  async deleteInquiry(id: number): Promise<boolean> {
    try {
      const result = await this.db.collection('inquiries').deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      return false;
    }
  }
}

// Storage will be initialized in routes with the MongoDB connection
export let storage: IStorage;

export const initializeStorage = (db: any) => {
  storage = new MongoStorage(db);
  return storage;
};
