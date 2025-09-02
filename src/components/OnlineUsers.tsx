import React from 'react';
import { User, Circle } from 'lucide-react';

const OnlineUsers: React.FC = () => {
  const onlineUsers = [
    { name: 'د. فاطمة أحمد', status: 'online', lastSeen: 'الآن' },
    { name: 'أ. محمد سالم', status: 'online', lastSeen: 'الآن' },
    { name: 'د. سارة محمود', status: 'away', lastSeen: 'منذ 5 دقائق' },
    { name: 'أ. خالد المطيري', status: 'online', lastSeen: 'الآن' },
    { name: 'د. نورا الزهراني', status: 'online', lastSeen: 'الآن' },
    { name: 'أ. عبدالله حسن', status: 'away', lastSeen: 'منذ 15 دقيقة' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2 space-x-reverse">
        <User size={18} />
        <span>الأعضاء المتصلون ({onlineUsers.filter(u => u.status === 'online').length})</span>
      </h3>
      
      <div className="space-y-2">
        {onlineUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Circle size={8} className={`${getStatusColor(user.status)} fill-current`} />
              <span className="text-sm text-gray-700">{user.name}</span>
            </div>
            <span className="text-xs text-gray-500">{user.lastSeen}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          المجموع: {onlineUsers.length} من {1247} عضو
        </p>
      </div>
    </div>
  );
};

export default OnlineUsers;