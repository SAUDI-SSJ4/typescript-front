// Utility functions for live stream time calculations and formatting

export interface TimeUntilData {
  timeString: string;
  isStartingSoon: boolean;
  isLive: boolean;
}

/**
 * Calculate time until stream starts
 * @param startTime - ISO string or Date object representing start time
 * @returns Object with formatted time string and status indicators
 */
export function calculateTimeUntilStream(startTime: string | Date): TimeUntilData {
  const now = new Date();
  const start = new Date(startTime);
  const diffMs = start.getTime() - now.getTime();

  // If time has passed (negative difference), stream might be live
  if (diffMs <= 0) {
    const elapsed = Math.abs(diffMs);
    // Consider stream live if it started less than 3 hours ago
    if (elapsed < 3 * 60 * 60 * 1000) {
      return {
        timeString: "مباشر الآن",
        isStartingSoon: false,
        isLive: true
      };
    }
    return {
      timeString: "انتهى",
      isStartingSoon: false,
      isLive: false
    };
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  let timeString: string;
  let isStartingSoon = false;

  if (diffMinutes < 1) {
    timeString = "أقل من دقيقة";
    isStartingSoon = true;
  } else if (diffMinutes < 60) {
    timeString = `${diffMinutes} ${diffMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
    isStartingSoon = diffMinutes <= 15; // Starting soon if within 15 minutes
  } else if (diffHours < 24) {
    const remainingMinutes = diffMinutes % 60;
    if (remainingMinutes === 0) {
      timeString = `${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
    } else {
      timeString = `${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'} و ${remainingMinutes} ${remainingMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
    }
    isStartingSoon = diffHours <= 1; // Starting soon if within 1 hour
  } else {
    const remainingHours = diffHours % 24;
    if (remainingHours === 0) {
      timeString = `${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
    } else {
      timeString = `${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'} و ${remainingHours} ${remainingHours === 1 ? 'ساعة' : 'ساعات'}`;
    }
  }

  return {
    timeString: `باقي ${timeString}`,
    isStartingSoon,
    isLive: false
  };
}

/**
 * Format duration in minutes to human readable string
 * @param minutes - Duration in minutes
 * @returns Formatted duration string in Arabic
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
  }
  
  return `${hours} ${hours === 1 ? 'ساعة' : 'ساعات'} و ${remainingMinutes} ${remainingMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
}

/**
 * Format time string for display
 * @param timeString - Time in 24-hour format (e.g., "15:30")
 * @returns Formatted time string in Arabic
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'مساءً' : 'صباحاً';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const displayMinutes = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
  
  return `${displayHours}${displayMinutes} ${period}`;
}

/**
 * Get relative date string
 * @param dateString - Date string or Date object
 * @returns Relative date string in Arabic
 */
export function getRelativeDate(dateString: string | Date): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Compare dates without time
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return "اليوم";
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return "غداً";
  } else {
    // Format as Arabic date
    return date.toLocaleDateString('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}

/**
 * Check if a session should be considered "starting soon"
 * @param startTime - Session start time
 * @returns Boolean indicating if session is starting soon
 */
export function isStartingSoon(startTime: string | Date): boolean {
  const { isStartingSoon } = calculateTimeUntilStream(startTime);
  return isStartingSoon;
}

/**
 * Check if a session is currently live
 * @param startTime - Session start time
 * @param duration - Session duration in minutes
 * @returns Boolean indicating if session is currently live
 */
export function isSessionLive(startTime: string | Date, duration: number): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60 * 1000);
  
  return now >= start && now <= end;
}