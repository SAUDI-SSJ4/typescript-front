import { useState, useEffect } from 'react';
import type { AcademyMainSettingsFormData } from '@/validations/template';

interface AcademySettings {
  academyName: string;
  primaryColor: string;
  secondaryColor: string;
  customCSS?: string;
  academyLogo?: File;
  academyIcon?: File;
}

const useAcademySettings = () => {
  const [settings, setSettings] = useState<AcademySettings>({
    academyName: 'أكاديمية التدريب',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    customCSS: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load settings from localStorage or API
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        // Try to load from localStorage first
        const savedSettings = localStorage.getItem('academy-settings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings(prev => ({ ...prev, ...parsed }));
        }
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/academy/settings');
        // const data = await response.json();
        // setSettings(data);
      } catch (err) {
        setError('فشل في تحميل إعدادات الأكاديمية');
        console.error('Error loading academy settings:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<AcademySettings>) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedSettings = { ...settings, ...newSettings };
      
      // Save to localStorage
      localStorage.setItem('academy-settings', JSON.stringify(updatedSettings));
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/academy/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedSettings)
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to update settings');
      // }
      
      setSettings(updatedSettings);
      return { success: true };
    } catch (err) {
      const errorMessage = 'فشل في حفظ إعدادات الأكاديمية';
      setError(errorMessage);
      console.error('Error updating academy settings:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings: AcademySettings = {
      academyName: 'أكاديمية التدريب',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      customCSS: '',
    };
    
    localStorage.removeItem('academy-settings');
    setSettings(defaultSettings);
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    resetSettings,
  };
};

export default useAcademySettings;