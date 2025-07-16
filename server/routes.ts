import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPropertySchema, insertWishlistSchema, insertInquirySchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "luxehomes_secret_key_2024";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify admin role
const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        user: { ...user, password: undefined },
        token
      });
    } catch (error) {
      res.status(400).json({ message: "Registration failed", error });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        user: { ...user, password: undefined },
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  });

  // Property routes
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = req.query;
      let properties;

      if (Object.keys(filters).length > 0) {
        const searchFilters = {
          location: filters.location as string,
          minPrice: filters.minPrice ? parseFloat(filters.minPrice as string) : undefined,
          maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice as string) : undefined,
          propertyType: filters.propertyType as string,
          bedrooms: filters.bedrooms ? parseInt(filters.bedrooms as string) : undefined,
          status: filters.status as string
        };
        properties = await storage.searchProperties(searchFilters);
      } else {
        properties = await storage.getAllProperties();
      }

      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties", error });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property", error });
    }
  });

  app.post("/api/properties", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.json(property);
    } catch (error) {
      res.status(400).json({ message: "Failed to create property", error });
    }
  });

  app.put("/api/properties/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const property = await storage.updateProperty(id, updateData);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      res.status(400).json({ message: "Failed to update property", error });
    }
  });

  app.delete("/api/properties/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProperty(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json({ message: "Property deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property", error });
    }
  });

  // Wishlist routes
  app.get("/api/wishlist", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const wishlist = await storage.getUserWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist", error });
    }
  });

  app.post("/api/wishlist", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const { propertyId } = req.body;
      
      // Check if already in wishlist
      const isInWishlist = await storage.isInWishlist(userId, propertyId);
      if (isInWishlist) {
        return res.status(400).json({ message: "Property already in wishlist" });
      }

      const wishlistItem = await storage.addToWishlist({ userId, propertyId });
      res.json(wishlistItem);
    } catch (error) {
      res.status(400).json({ message: "Failed to add to wishlist", error });
    }
  });

  app.delete("/api/wishlist/:propertyId", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const propertyId = parseInt(req.params.propertyId);
      
      const removed = await storage.removeFromWishlist(userId, propertyId);
      if (!removed) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }

      res.json({ message: "Removed from wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from wishlist", error });
    }
  });

  // Inquiry routes
  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      res.json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Failed to create inquiry", error });
    }
  });

  app.get("/api/inquiries", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries", error });
    }
  });

  app.put("/api/inquiries/:id/status", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const inquiry = await storage.updateInquiryStatus(id, status);
      if (!inquiry) {
        return res.status(404).json({ message: "Inquiry not found" });
      }

      res.json(inquiry);
    } catch (error) {
      res.status(400).json({ message: "Failed to update inquiry status", error });
    }
  });

  app.delete("/api/inquiries/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteInquiry(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Inquiry not found" });
      }

      res.json({ message: "Inquiry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete inquiry", error });
    }
  });

  // User management routes (admin only)
  app.get("/api/users", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(user => ({ ...user, password: undefined }));
      res.json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  });

  app.delete("/api/users/:id", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteUser(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error });
    }
  });

  // Dashboard stats (admin only)
  app.get("/api/dashboard/stats", authenticateToken, requireAdmin, async (req, res) => {
    try {
      const properties = await storage.getAllProperties();
      const users = await storage.getAllUsers();
      const inquiries = await storage.getAllInquiries();

      const stats = {
        totalProperties: properties.length,
        activeUsers: users.filter(u => u.role === 'user').length,
        pendingInquiries: inquiries.filter(i => i.status === 'pending').length,
        monthlyRevenue: properties
          .filter(p => p.status === 'sold')
          .reduce((sum, p) => sum + parseFloat(p.price) * 0.03, 0) // 3% commission
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
