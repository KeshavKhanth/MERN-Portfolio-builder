import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [roleChangeModal, setRoleChangeModal] = useState(null); // { userId, newRole, userName }
  const [updatingRole, setUpdatingRole] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Fetch stats and users on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, usersRes] = await Promise.all([
          axios.get('/api/admin/stats'),
          axios.get('/api/admin/users')
        ]);

        setStats(statsRes.data.data);
        setUsers(usersRes.data.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const handleUserClick = (userData) => {
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRoleClick = (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setRoleChangeModal({
      userId: user._id,
      newRole,
      userName: `${user.firstName} ${user.lastName}`,
      currentRole: user.role
    });
  };

  const handleRoleSelect = (user, newRole) => {
    if (user.role === newRole) {
      setOpenDropdown(null);
      return;
    }
    setRoleChangeModal({
      userId: user._id,
      newRole,
      userName: `${user.firstName} ${user.lastName}`,
      currentRole: user.role
    });
    setOpenDropdown(null);
  };

  const confirmRoleChange = async () => {
    if (!roleChangeModal) return;

    try {
      setUpdatingRole(true);
      const response = await axios.put(`/api/admin/users/${roleChangeModal.userId}/role`, {
        role: roleChangeModal.newRole
      });

      if (response.data.success) {
        // Update users list
        setUsers(users.map(u => 
          u._id === roleChangeModal.userId ? { ...u, role: roleChangeModal.newRole } : u
        ));

        // Update selected user if modal is open
        if (selectedUser && selectedUser._id === roleChangeModal.userId) {
          setSelectedUser({ ...selectedUser, role: roleChangeModal.newRole });
        }

        toast.success(`${roleChangeModal.userName} role changed to ${roleChangeModal.newRole}`);
        setRoleChangeModal(null);

        // Refresh stats
        const statsRes = await axios.get('/api/admin/stats');
        setStats(statsRes.data.data);
      }
    } catch (error) {
      console.error('Error changing role:', error);
      toast.error(error.response?.data?.message || 'Failed to change role');
    } finally {
      setUpdatingRole(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">Loading admin panel...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users and view platform statistics</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="text-gray-600 text-sm font-medium mb-2">Total Users</div>
              <button
                onClick={() => setShowUserModal(false) || document.getElementById('usersSection')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-3xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition"
              >
                {stats?.totalUsers || 0}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="text-gray-600 text-sm font-medium mb-2">Admins</div>
              <div className="text-3xl font-bold text-purple-600">{stats?.totalAdmins || 0}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="text-gray-600 text-sm font-medium mb-2">Total Portfolios</div>
              <div className="text-3xl font-bold text-green-600">{stats?.totalPortfolios || 0}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="text-gray-600 text-sm font-medium mb-2">Active Users</div>
              <div className="text-3xl font-bold text-orange-600">{stats?.totalActiveUsers || 0}</div>
            </motion.div>
          </div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            id="usersSection"
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Users List</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Portfolios</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {user.portfolioCount || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              user.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 relative">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => setOpenDropdown(openDropdown === user._id ? null : user._id)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer ${
                                user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                            >
                              {user.role === 'admin' ? 'Admin' : 'User'}
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === user._id && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute top-full mt-1 left-0 z-40 bg-white border border-gray-200 rounded-lg shadow-lg min-w-max"
                              >
                                <button
                                  type="button"
                                  onClick={() => handleRoleSelect(user, 'user')}
                                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition first:rounded-t-lg ${
                                    user.role === 'user' ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700'
                                  }`}
                                >
                                  {user.role === 'user' && '✓ '} User
                                </button>
                                <div className="border-t border-gray-100"></div>
                                <button
                                  type="button"
                                  onClick={() => handleRoleSelect(user, 'admin')}
                                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-purple-50 transition last:rounded-b-lg ${
                                    user.role === 'admin' ? 'bg-purple-100 font-semibold text-purple-900' : 'text-gray-700'
                                  }`}
                                >
                                  {user.role === 'admin' && '✓ '} Admin
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleUserClick(user)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                          >
                            View
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* User Details Modal */}
          {showUserModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </h3>
                      <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                    <button
                      onClick={() => setShowUserModal(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Joined Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(selectedUser.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Portfolios Created</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {selectedUser.portfolioCount || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Role</p>
                      <p className="text-lg font-semibold text-purple-600">
                        {selectedUser.role === 'admin' ? 'Admin' : 'User'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Status</p>
                      <p className={`text-lg font-semibold ${selectedUser.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedUser.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>

                  {/* Portfolios List */}
                  {selectedUser.portfolios && selectedUser.portfolios.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Portfolios</h4>
                      <div className="space-y-2">
                        {selectedUser.portfolios.map((portfolio) => (
                          <div key={portfolio._id} className="p-3 bg-gray-50 rounded">
                            <p className="font-medium text-gray-900">{portfolio.title}</p>
                            <p className="text-sm text-gray-600">{formatDate(portfolio.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowUserModal(false)}
                    className="w-full mt-6 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Role Change Confirmation Modal */}
          {roleChangeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full"
              >
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Change User Role?</h3>
                    <p className="text-gray-600">
                      Are you sure you want to change <span className="font-semibold">{roleChangeModal.userName}</span>'s role?
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Current Role:</span>{' '}
                      <span className={roleChangeModal.currentRole === 'admin' ? 'text-purple-600 font-medium' : 'text-gray-600 font-medium'}>
                        {roleChangeModal.currentRole === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">New Role:</span>{' '}
                      <span className={roleChangeModal.newRole === 'admin' ? 'text-purple-600 font-medium' : 'text-gray-600 font-medium'}>
                        {roleChangeModal.newRole === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </p>
                  </div>

                  {roleChangeModal.newRole === 'admin' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-6">
                      <p className="text-sm text-yellow-800">
                        ⚠️ This user will gain full admin access to the platform.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRoleChangeModal(null)}
                      disabled={updatingRole}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded font-medium hover:bg-gray-300 transition disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmRoleChange}
                      disabled={updatingRole}
                      className={`flex-1 px-4 py-2 rounded font-medium transition disabled:opacity-50 ${
                        roleChangeModal.newRole === 'admin'
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {updatingRole ? 'Updating...' : 'Confirm'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
