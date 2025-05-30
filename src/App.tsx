import React, { useState, useEffect } from 'react';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PhotoViewer } from './components/PhotoViewer';
import { UploadArea } from './components/UploadArea';
import { useTheme } from './hooks/useTheme';
import { usePhotos } from './hooks/usePhotos';
import { Toaster } from './components/ui/Toaster';
import { LoadingOverlay } from './components/ui/LoadingOverlay';

function App() {
  const { theme } = useTheme();
  const { loading, selectedPhoto, setSelectedPhoto } = usePhotos();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen ${theme}`}>
      <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300`}>
        <Header onToggleSidebar={handleToggleSidebar} />
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar isOpen={sidebarOpen} />
          <main className="flex-1 overflow-auto p-4">
            <UploadArea />
            <Gallery />
          </main>
        </div>
        {selectedPhoto && (
          <PhotoViewer 
            photo={selectedPhoto} 
            onClose={() => setSelectedPhoto(null)} 
          />
        )}
        <Toaster />
        {loading && <LoadingOverlay />}
      </div>
    </div>
  );
}

export default App;