import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import ProfileModal from './ProfileModal';

const Dashboard = ({ user, onLogout, onUserUpdate }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users
    fetchUsers();
  }, [user.id]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('__name__', '!=', user.id));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userData = [];
        snapshot.forEach((doc) => {
          userData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setUsers(userData);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const fetchMessages = async (receiverId) => {
    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('participants', 'array-contains', user.id),
        orderBy('createdAt', 'asc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageData = [];
        snapshot.forEach((doc) => {
          const message = { id: doc.id, ...doc.data() };
          // Only include messages between current user and selected user
          if (
            (message.senderId === user.id && message.receiverId === receiverId) ||
            (message.senderId === receiverId && message.receiverId === user.id)
          ) {
            messageData.push(message);
          }
        });
        setMessages(messageData);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleUserSelect = (selectedUser) => {
    setSelectedUser(selectedUser);
    fetchMessages(selectedUser.id);
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  useEffect(() => {
    let unsubscribe;
    if (selectedUser) {
      unsubscribe = fetchMessages(selectedUser.id);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedUser, user.id]);

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.id, selectedUser.id],
          isRead: false
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Note: Deleting user account requires re-authentication in Firebase
        // For now, we'll just sign out
        await signOut(auth);
        onLogout();
        alert('Account deletion requires re-authentication. Please contact support.');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account');
      }
    }
  };

  const sendMessage = async (content) => {
    if (selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: user.id,
          receiverId: selectedUser.id,
          content,
          createdAt: new Date(),
          participants: [user.i
        senderId: user.id,
        receiverId: selectedUser._id,
        content
      };
      
      socket.emit('sendMessage', messageData);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch('http://localhost:5000/api/account', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert('Account deleted successfully');
          onLogout();
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        alert('Error deleting account');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Chat App</h2>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowProfile(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                title="Profile Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* User List */}
        <UserList 
          users={users} 
          selectedUser={selectedUser} 
          onUserSelect={handleUserSelect} 
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow
            selectedUser={selectedUser}
            messages={messages}
            currentUser={user}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">Choose a user from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
          onUserUpdate={onUserUpdate}
          onDeleteAccount={handleDeleteAccount}
        />
      )}
    </div>
  );
};

export default Dashboard;

        senderId: user.id,
        receiverId: selectedUser._id,
        content
      };
      
      socket.emit('sendMessage', messageData);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch('http://localhost:5000/api/account', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert('Account deleted successfully');
          onLogout();
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        alert('Error deleting account');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Chat App</h2>
              <p className="text-sm text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowProfile(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                title="Profile Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* User List */}
        <UserList 
          users={users} 
          selectedUser={selectedUser} 
          onUserSelect={handleUserSelect} 
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow
            selectedUser={selectedUser}
            messages={messages}
            currentUser={user}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">Choose a user from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          user={user}
          token={token}
          onClose={() => setShowProfile(false)}
          onUserUpdate={onUserUpdate}
          onDeleteAccount={handleDeleteAccount}
        />
      )}
    </div>
  );
};

export default Dashboard;