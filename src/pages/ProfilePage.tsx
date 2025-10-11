import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  // UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'pending_verification':
        return 'text-yellow-600 bg-yellow-100';
      case 'suspended':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'not_started':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account information and settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="First Name"
                  value={user?.firstName || ''}
                  placeholder="Enter your first name"
                />
                <Input
                  label="Last Name"
                  value={user?.lastName || ''}
                  placeholder="Enter your last name"
                />
              </div>
              
              <Input
                label="Email Address"
                type="email"
                value={user?.email || ''}
                placeholder="Enter your email"
                leftIcon={<EnvelopeIcon className="h-4 w-4" />}
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={user?.phoneEncrypted ? '••••••••••' : ''}
                placeholder="Enter your phone number"
                leftIcon={<PhoneIcon className="h-4 w-4" />}
              />
              
              <Input
                label="Date of Birth"
                type="date"
                value={user?.dateOfBirth || ''}
                placeholder="Select your date of birth"
                leftIcon={<CalendarIcon className="h-4 w-4" />}
              />
              
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>
                Your billing and shipping address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Address"
                value={user?.address || ''}
                placeholder="Enter your address"
                leftIcon={<MapPinIcon className="h-4 w-4" />}
              />
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Input
                  label="City"
                  value={user?.city || ''}
                  placeholder="Enter your city"
                />
                <Input
                  label="State"
                  value={user?.state || ''}
                  placeholder="Enter your state"
                />
                <Input
                  label="Postal Code"
                  value={user?.postalCode || ''}
                  placeholder="Enter postal code"
                />
              </div>
              
              <Input
                label="Country"
                value={user?.country || ''}
                placeholder="Enter your country"
              />
              
              <div className="pt-4">
                <Button>Update Address</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Status & Settings */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Account Status</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user?.status || '')}`}>
                  {user?.status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Verified</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user?.emailVerified ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {user?.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Phone Verified</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user?.phoneVerified ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {user?.phoneVerified ? 'VERIFIED' : 'NOT VERIFIED'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">KYC Status</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getKycStatusColor(user?.kycStatus || '')}`}>
                  {user?.kycStatus?.replace('_', ' ').toUpperCase() || 'NOT STARTED'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" fullWidth>
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              
              <Button variant="outline" fullWidth>
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                Two-Factor Authentication
              </Button>
              
              <Button variant="outline" fullWidth>
                <ShieldCheckIcon className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" fullWidth>
                Download Data
              </Button>
              
              <Button variant="outline" fullWidth>
                Privacy Settings
              </Button>
              
              <Button variant="danger" fullWidth>
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
