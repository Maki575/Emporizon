import React from 'react';
import { Instagram, PinIcon, Video } from 'lucide-react';
import { usePinterestAuth } from '../hooks/usePinterest';

const PINTEREST_CLIENT_ID = import.meta.env.VITE_PINTEREST_CLIENT_ID;
const PINTEREST_REDIRECT_URI = import.meta.env.VITE_PINTEREST_REDIRECT_URI;

export function SocialMediaConnector() {
  const { isAuthenticated, logout } = usePinterestAuth();

  const handlePinterestConnect = () => {
    const scope = 'boards:read,pins:read';
    const authUrl = `https://www.pinterest.com/oauth/?client_id=${PINTEREST_CLIENT_ID}&redirect_uri=${PINTEREST_REDIRECT_URI}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ConnectorCard
        icon={<PinIcon className="h-8 w-8" />}
        platform="Pinterest"
        description="Import your pins and boards"
        connected={isAuthenticated}
        onConnect={handlePinterestConnect}
        onDisconnect={logout}
      />
      <ConnectorCard
        icon={<Instagram className="h-8 w-8" />}
        platform="Instagram"
        description="Connect your business account"
        connected={false}
      />
      <ConnectorCard
        icon={<Video className="h-8 w-8" />}
        platform="TikTok"
        description="Import your TikTok content"
        connected={false}
      />
    </div>
  );
}

interface ConnectorCardProps {
  icon: React.ReactNode;
  platform: string;
  description: string;
  connected: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

function ConnectorCard({ 
  icon, 
  platform, 
  description, 
  connected,
  onConnect,
  onDisconnect 
}: ConnectorCardProps) {
  const handleClick = () => {
    if (connected && onDisconnect) {
      onDisconnect();
    } else if (!connected && onConnect) {
      onConnect();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <button
            onClick={handleClick}
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
              connected
                ? 'bg-red-50 text-red-700 hover:bg-red-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } transition-colors`}
          >
            {connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}