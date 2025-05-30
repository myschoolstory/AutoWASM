import { useState, useEffect, useCallback } from 'react';
import { Photo, Filter, SortOption } from '../types';
import { getPhotos, savePhoto, deletePhoto } from '../services/storageService';
import { useToast } from './useToast';
import { generateThumbnail } from '../utils/imageUtils';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>({
    searchTerm: '',
    tags: [],
    albums: [],
    favorites: false,
  });
  const [sortOption, setSortOption] = useState<SortOption>('dateNewest');
  const { showToast } = useToast();

  // Load photos from IndexedDB
  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const loadedPhotos = await getPhotos();
      setPhotos(loadedPhotos);
    } catch (error) {
      console.error('Failed to load photos:', error);
      showToast({
        type: 'error',
        message: 'Failed to load photos from storage.',
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Add a new photo
  const addPhoto = useCallback(async (file: File): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Create dataUrl for the image
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      // Generate thumbnail
      const thumbnailUrl = await generateThumbnail(dataUrl, 200);
      
      // Get image dimensions
      const dimensions = await new Promise<{ width: number, height: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = dataUrl;
      });
      
      const newPhoto: Photo = {
        id: crypto.randomUUID(),
        file: file,
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl,
        thumbnailUrl,
        width: dimensions.width,
        height: dimensions.height,
        tags: [],
        favorite: false,
        albums: [],
        dateAdded: Date.now(),
        dateModified: Date.now(),
      };
      
      await savePhoto(newPhoto);
      await loadPhotos();
      
      showToast({
        type: 'success',
        message: 'Photo added successfully!',
      });
      
      return true;
    } catch (error) {
      console.error('Failed to add photo:', error);
      showToast({
        type: 'error',
        message: 'Failed to add photo.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadPhotos, showToast]);

  // Update a photo
  const updatePhoto = useCallback(async (updatedPhoto: Photo): Promise<boolean> => {
    try {
      setLoading(true);
      await savePhoto({
        ...updatedPhoto,
        dateModified: Date.now(),
      });
      await loadPhotos();
      
      showToast({
        type: 'success',
        message: 'Photo updated successfully!',
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update photo:', error);
      showToast({
        type: 'error',
        message: 'Failed to update photo.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadPhotos, showToast]);

  // Remove a photo
  const removePhoto = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await deletePhoto(id);
      await loadPhotos();
      
      showToast({
        type: 'success',
        message: 'Photo removed successfully!',
      });
      
      return true;
    } catch (error) {
      console.error('Failed to remove photo:', error);
      showToast({
        type: 'error',
        message: 'Failed to remove photo.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadPhotos, showToast]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (photo: Photo): Promise<boolean> => {
    try {
      const updatedPhoto = { 
        ...photo, 
        favorite: !photo.favorite,
        dateModified: Date.now()
      };
      return await updatePhoto(updatedPhoto);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      showToast({
        type: 'error',
        message: 'Failed to update favorite status.',
      });
      return false;
    }
  }, [updatePhoto, showToast]);

  // Add or remove a tag
  const toggleTag = useCallback(async (photo: Photo, tag: string): Promise<boolean> => {
    try {
      const updatedTags = photo.tags.includes(tag)
        ? photo.tags.filter(t => t !== tag)
        : [...photo.tags, tag];
      
      const updatedPhoto = {
        ...photo,
        tags: updatedTags,
        dateModified: Date.now()
      };
      
      return await updatePhoto(updatedPhoto);
    } catch (error) {
      console.error('Failed to update tags:', error);
      showToast({
        type: 'error',
        message: 'Failed to update photo tags.',
      });
      return false;
    }
  }, [updatePhoto, showToast]);

  // Add or remove from an album
  const toggleAlbum = useCallback(async (photo: Photo, albumId: string): Promise<boolean> => {
    try {
      const updatedAlbums = photo.albums.includes(albumId)
        ? photo.albums.filter(a => a !== albumId)
        : [...photo.albums, albumId];
      
      const updatedPhoto = {
        ...photo,
        albums: updatedAlbums,
        dateModified: Date.now()
      };
      
      return await updatePhoto(updatedPhoto);
    } catch (error) {
      console.error('Failed to update albums:', error);
      showToast({
        type: 'error',
        message: 'Failed to update photo album.',
      });
      return false;
    }
  }, [updatePhoto, showToast]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...photos];
    
    // Apply filters
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      result = result.filter(photo => 
        photo.name.toLowerCase().includes(term) || 
        photo.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (filter.tags.length > 0) {
      result = result.filter(photo => 
        filter.tags.some(tag => photo.tags.includes(tag))
      );
    }
    
    if (filter.albums.length > 0) {
      result = result.filter(photo => 
        filter.albums.some(album => photo.albums.includes(album))
      );
    }
    
    if (filter.favorites) {
      result = result.filter(photo => photo.favorite);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'dateNewest':
        result.sort((a, b) => b.dateAdded - a.dateAdded);
        break;
      case 'dateOldest':
        result.sort((a, b) => a.dateAdded - b.dateAdded);
        break;
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'sizeAsc':
        result.sort((a, b) => a.size - b.size);
        break;
      case 'sizeDesc':
        result.sort((a, b) => b.size - a.size);
        break;
    }
    
    setFilteredPhotos(result);
  }, [photos, filter, sortOption]);

  // Initial load
  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return {
    photos,
    filteredPhotos,
    selectedPhoto,
    loading,
    filter,
    sortOption,
    setSelectedPhoto,
    setFilter,
    setSortOption,
    addPhoto,
    updatePhoto,
    removePhoto,
    toggleFavorite,
    toggleTag,
    toggleAlbum,
    loadPhotos
  };
};