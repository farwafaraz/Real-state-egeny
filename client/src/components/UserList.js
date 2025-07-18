import React from 'react';

const UserList = ({ users, selectedUser, onUserSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
          Users ({users.length})
        </h3>
        <div className="space-y-1">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onUserSelect(user)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedUser && selectedUser.id === user.id
                  ? 'bg-primary-50 border-primary-200 border'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
                {user.isOnline && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;