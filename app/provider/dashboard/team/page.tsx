'use client';

import { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      role: 'Head Stylist',
      specialization: 'Hair Coloring & Styling',
      experience: '8 years',
      description: 'Specialized in balayage and keratin treatments',
      image: '👩‍💼',
      isActive: true
    },
    {
      id: '2',
      name: 'Anjali Patel',
      role: 'Makeup Artist',
      specialization: 'Bridal & Party Makeup',
      experience: '6 years',
      description: 'Expert in natural and glamorous makeup looks',
      image: '💄',
      isActive: true
    },
    {
      id: '3', 
      name: 'Rahul Verma',
      role: 'Senior Beautician',
      specialization: 'Skincare & Facials',
      experience: '5 years',
      description: 'Specialized in acne treatment and anti-aging facials',
      image: '✨',
      isActive: true
    }
  ]);

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    specialization: '',
    experience: '',
    description: '',
    image: '👨‍💼',
    isActive: true
  });

  const roles = [
    'Hair Stylist',
    'Makeup Artist', 
    'Beautician',
    'Nail Technician',
    'Spa Therapist',
    'Massage Therapist',
    'Mehndi Artist',
    'Salon Manager',
    'Receptionist',
    'Assistant'
  ];

  const specializations = [
    'Hair Coloring',
    'Hair Cutting',
    'Bridal Makeup',
    'Party Makeup',
    'Skincare',
    'Facials',
    'Manicure',
    'Pedicure',
    'Nail Art',
    'Massage',
    'Waxing',
    'Threading'
  ];

  const addTeamMember = () => {
    if (teamMembers.length >= 10) {
      alert('Maximum 10 team members allowed. Please remove someone to add new.');
      return;
    }

    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString(),
    };
    setTeamMembers([...teamMembers, member]);
    setNewMember({
      name: '',
      role: '',
      specialization: '',
      experience: '',
      description: '',
      image: '👨‍💼',
      isActive: true
    });
    setShowTeamForm(false);
  };

  const updateTeamMember = () => {
    if (!editingMember) return;
    setTeamMembers(teamMembers.map(m => m.id === editingMember.id ? editingMember : m));
    setEditingMember(null);
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const toggleMemberStatus = (id: string) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === id ? { ...m, isActive: !m.isActive } : m
    ));
  };

  const activeMembers = teamMembers.filter(m => m.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-dark-text">
            Team Management
          </h1>
          <p className="text-dark-grey font-body mt-1">
            Manage your team members, roles, and specializations
          </p>
        </div>
        <button
          onClick={() => setShowTeamForm(true)}
          disabled={teamMembers.length >= 10}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg font-body font-medium hover:bg-rose-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          + Add Team Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-rose-500">{teamMembers.length}</p>
          <p className="text-dark-grey font-body mt-1">Total Team</p>
          <p className="text-xs text-dark-grey">Max 10 members</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-green-500">{activeMembers}</p>
          <p className="text-dark-grey font-body mt-1">Active Members</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-purple-500">
            {Array.from(new Set(teamMembers.map(m => m.role))).length}
          </p>
          <p className="text-dark-grey font-body mt-1">Different Roles</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey text-center">
          <p className="text-2xl font-heading font-bold text-blue-500">
            {Array.from(new Set(teamMembers.map(m => m.specialization))).length}
          </p>
          <p className="text-dark-grey font-body mt-1">Specializations</p>
        </div>
      </div>

      {/* Add/Edit Team Form */}
      {(showTeamForm || editingMember) && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
          <h2 className="text-xl font-heading font-bold text-dark-text mb-6">
            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-dark-text font-body font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={editingMember ? editingMember.name : newMember.name}
                onChange={(e) => editingMember 
                  ? setEditingMember({...editingMember, name: e.target.value})
                  : setNewMember({...newMember, name: e.target.value})
                }
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-dark-text font-body font-medium mb-2">
                Role *
              </label>
              <select
                value={editingMember ? editingMember.role : newMember.role}
                onChange={(e) => editingMember
                  ? setEditingMember({...editingMember, role: e.target.value})
                  : setNewMember({...newMember, role: e.target.value})
                }
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-dark-text font-body font-medium mb-2">
                Specialization *
              </label>
              <select
                value={editingMember ? editingMember.specialization : newMember.specialization}
                onChange={(e) => editingMember
                  ? setEditingMember({...editingMember, specialization: e.target.value})
                  : setNewMember({...newMember, specialization: e.target.value})
                }
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
              >
                <option value="">Select Specialization</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-dark-text font-body font-medium mb-2">
                Experience *
              </label>
              <input
                type="text"
                value={editingMember ? editingMember.experience : newMember.experience}
                onChange={(e) => editingMember
                  ? setEditingMember({...editingMember, experience: e.target.value})
                  : setNewMember({...newMember, experience: e.target.value})
                }
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                placeholder="e.g., 5 years"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-dark-text font-body font-medium mb-2">
                Description *
              </label>
              <textarea
                value={editingMember ? editingMember.description : newMember.description}
                onChange={(e) => editingMember
                  ? setEditingMember({...editingMember, description: e.target.value})
                  : setNewMember({...newMember, description: e.target.value})
                }
                rows={3}
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
                placeholder="Brief description of skills and expertise..."
              />
            </div>

            <div>
              <label className="block text-dark-text font-body font-medium mb-2">
                Profile Icon
              </label>
              <select
                value={editingMember ? editingMember.image : newMember.image}
                onChange={(e) => editingMember
                  ? setEditingMember({...editingMember, image: e.target.value})
                  : setNewMember({...newMember, image: e.target.value})
                }
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
              >
                <option value="👨‍💼">👨‍💼 Professional</option>
                <option value="👩‍💼">👩‍💼 Professional</option>
                <option value="💇‍♀️">💇‍♀️ Hair Stylist</option>
                <option value="💄">💄 Makeup Artist</option>
                <option value="✨">✨ Beautician</option>
                <option value="💅">💅 Nail Technician</option>
                <option value="🛁">🛁 Spa Therapist</option>
                <option value="🎨">🎨 Artist</option>
              </select>
            </div>

            <div>
              <label className="block text-dark-text font-body font-medium mb-2">
                Status
              </label>
              <select
                value={editingMember ? editingMember.isActive.toString() : newMember.isActive.toString()}
                onChange={(e) => editingMember
                  ? setEditingMember({...editingMember, isActive: e.target.value === 'true'})
                  : setNewMember({...newMember, isActive: e.target.value === 'true'})
                }
                className="w-full px-4 py-2 border border-light-grey rounded-lg focus:ring-2 focus:ring-rose-500"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={editingMember ? updateTeamMember : addTeamMember}
              className="bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600"
            >
              {editingMember ? 'Update Member' : 'Add Member'}
            </button>
            <button
              onClick={() => {
                setShowTeamForm(false);
                setEditingMember(null);
              }}
              className="border border-light-grey text-dark-text px-6 py-2 rounded-lg font-body font-medium hover:bg-light-grey"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Team Members Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-light-grey overflow-hidden">
        <div className="p-6 border-b border-light-grey">
          <h2 className="text-xl font-heading font-bold text-dark-text">
            Team Members ({teamMembers.length}/10)
          </h2>
        </div>

        <div className="p-6">
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-heading font-bold text-dark-text mb-2">
                No team members yet
              </h3>
              <p className="text-dark-grey font-body mb-4">
                Add your first team member to showcase your talented staff
              </p>
              <button
                onClick={() => setShowTeamForm(true)}
                className="bg-rose-500 text-white px-6 py-2 rounded-lg font-body font-medium hover:bg-rose-600"
              >
                Add First Team Member
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="border border-light-grey rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-2xl">
                      {member.image}
                    </div>
                    <button
                      onClick={() => toggleMemberStatus(member.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {member.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  
                  <h3 className="font-heading font-bold text-dark-text text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-rose-500 font-body font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-dark-grey font-body text-sm mb-3">
                    {member.specialization} • {member.experience} experience
                  </p>
                  <p className="text-dark-grey font-body text-sm mb-4">
                    {member.description}
                  </p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="text-blue-500 hover:text-blue-600 font-body font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTeamMember(member.id)}
                      className="text-red-500 hover:text-red-600 font-body font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}