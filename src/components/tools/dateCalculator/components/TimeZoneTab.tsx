
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, ArrowRightLeft, Star, StarOff, Plus, Trash2, Copy, Calendar, Search, MapPin, GripVertical, Heart, BarChart3, Users, CalendarDays, CheckCircle, Sun, Moon, Download, FileText } from "lucide-react";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { CalculationHistory } from "./CalculationHistory";

// Interface for timezone data
interface TimeZoneData {
  name: string;
  label: string;
  country: string;
  offset: string;
  isDST?: boolean;
}

// Interface for conversion result
interface ConversionResult {
  sourceTime: string;
  targetTime: string;
  timeDifference: string;
  dayDifference: number;
}

export const TimeZoneTab = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [calculationHistory] = useState([]);
  const [favoriteTimezones, setFavoriteTimezones] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteTimezones');
    return saved ? JSON.parse(saved) : ['Europe/Paris', 'America/New_York', 'Asia/Tokyo'];
  });
  
  // Conversion states
  const [sourceTimezone, setSourceTimezone] = useState('Europe/Paris');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [conversionDate, setConversionDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [conversionTime, setConversionTime] = useState(format(new Date(), 'HH:mm'));
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TimeZoneData[]>([]);
  const [customTimezones, setCustomTimezones] = useState<TimeZoneData[]>(() => {
    const saved = localStorage.getItem('customTimezones');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Comparison states
  const [comparisonTimezones, setComparisonTimezones] = useState<string[]>(() => {
    const saved = localStorage.getItem('comparisonTimezones');
    return saved ? JSON.parse(saved) : ['Europe/Paris', 'America/New_York', 'Asia/Tokyo'];
  });
  const [comparisonBaseTime, setComparisonBaseTime] = useState(() => {
    const now = new Date();
    return format(now, 'yyyy-MM-dd HH:mm');
  });
  
  // Meeting planner states
  const [meetingParticipants, setMeetingParticipants] = useState<{name: string, timezone: string}[]>(() => {
    const saved = localStorage.getItem('meetingParticipants');
    return saved ? JSON.parse(saved) : [
      {name: 'Participant 1', timezone: 'Europe/Paris'},
      {name: 'Participant 2', timezone: 'America/New_York'}
    ];
  });
  const [meetingDate, setMeetingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, 'yyyy-MM-dd');
  });
  const [meetingDuration, setMeetingDuration] = useState(60);
  const [workingHoursStart, setWorkingHoursStart] = useState('09:00');
  const [workingHoursEnd, setWorkingHoursEnd] = useState('18:00');
  
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Extended timezone data with more information
  const timeZones: TimeZoneData[] = [
    { name: "Europe/Paris", label: "Paris", country: "France", offset: "CET/CEST" },
    { name: "Europe/London", label: "Londres", country: "Royaume-Uni", offset: "GMT/BST" },
    { name: "America/New_York", label: "New York", country: "États-Unis", offset: "EST/EDT" },
    { name: "America/Los_Angeles", label: "Los Angeles", country: "États-Unis", offset: "PST/PDT" },
    { name: "Asia/Tokyo", label: "Tokyo", country: "Japon", offset: "JST" },
    { name: "Asia/Shanghai", label: "Shanghai", country: "Chine", offset: "CST" },
    { name: "Australia/Sydney", label: "Sydney", country: "Australie", offset: "AEST/AEDT" },
    { name: "America/Sao_Paulo", label: "São Paulo", country: "Brésil", offset: "BRT/BRST" },
    { name: "Europe/Berlin", label: "Berlin", country: "Allemagne", offset: "CET/CEST" },
    { name: "Asia/Dubai", label: "Dubaï", country: "EAU", offset: "GST" },
    { name: "America/Chicago", label: "Chicago", country: "États-Unis", offset: "CST/CDT" },
    { name: "Asia/Singapore", label: "Singapour", country: "Singapour", offset: "SGT" },
    { name: "Europe/Moscow", label: "Moscou", country: "Russie", offset: "MSK" },
    { name: "America/Mexico_City", label: "Mexico", country: "Mexique", offset: "CST/CDT" },
    { name: "Asia/Kolkata", label: "Mumbai", country: "Inde", offset: "IST" },
     { name: "Africa/Cairo", label: "Le Caire", country: "Égypte", offset: "EET/EEST" }
   ];
   
   // Extended timezone database for search
   const extendedTimeZones: TimeZoneData[] = [
     ...timeZones,
     { name: "Europe/Rome", label: "Rome", country: "Italie", offset: "CET/CEST" },
     { name: "Europe/Madrid", label: "Madrid", country: "Espagne", offset: "CET/CEST" },
     { name: "Europe/Amsterdam", label: "Amsterdam", country: "Pays-Bas", offset: "CET/CEST" },
     { name: "Europe/Stockholm", label: "Stockholm", country: "Suède", offset: "CET/CEST" },
     { name: "Europe/Vienna", label: "Vienne", country: "Autriche", offset: "CET/CEST" },
     { name: "Europe/Zurich", label: "Zurich", country: "Suisse", offset: "CET/CEST" },
     { name: "Asia/Seoul", label: "Séoul", country: "Corée du Sud", offset: "KST" },
     { name: "Asia/Bangkok", label: "Bangkok", country: "Thaïlande", offset: "ICT" },
     { name: "Asia/Jakarta", label: "Jakarta", country: "Indonésie", offset: "WIB" },
     { name: "Asia/Manila", label: "Manille", country: "Philippines", offset: "PST" },
     { name: "Asia/Kuala_Lumpur", label: "Kuala Lumpur", country: "Malaisie", offset: "MYT" },
     { name: "Asia/Hong_Kong", label: "Hong Kong", country: "Hong Kong", offset: "HKT" },
     { name: "Asia/Taipei", label: "Taipei", country: "Taïwan", offset: "CST" },
     { name: "Australia/Melbourne", label: "Melbourne", country: "Australie", offset: "AEST/AEDT" },
     { name: "Australia/Perth", label: "Perth", country: "Australie", offset: "AWST" },
     { name: "Pacific/Auckland", label: "Auckland", country: "Nouvelle-Zélande", offset: "NZST/NZDT" },
     { name: "America/Toronto", label: "Toronto", country: "Canada", offset: "EST/EDT" },
     { name: "America/Vancouver", label: "Vancouver", country: "Canada", offset: "PST/PDT" },
     { name: "America/Montreal", label: "Montréal", country: "Canada", offset: "EST/EDT" },
     { name: "America/Denver", label: "Denver", country: "États-Unis", offset: "MST/MDT" },
     { name: "America/Phoenix", label: "Phoenix", country: "États-Unis", offset: "MST" },
     { name: "America/Miami", label: "Miami", country: "États-Unis", offset: "EST/EDT" },
     { name: "America/Buenos_Aires", label: "Buenos Aires", country: "Argentine", offset: "ART" },
     { name: "America/Lima", label: "Lima", country: "Pérou", offset: "PET" },
     { name: "America/Bogota", label: "Bogotá", country: "Colombie", offset: "COT" },
     { name: "America/Santiago", label: "Santiago", country: "Chili", offset: "CLT/CLST" },
     { name: "Africa/Johannesburg", label: "Johannesburg", country: "Afrique du Sud", offset: "SAST" },
     { name: "Africa/Lagos", label: "Lagos", country: "Nigeria", offset: "WAT" },
     { name: "Africa/Nairobi", label: "Nairobi", country: "Kenya", offset: "EAT" },
     { name: "Africa/Casablanca", label: "Casablanca", country: "Maroc", offset: "WET/WEST" },
     { name: "Europe/Istanbul", label: "Istanbul", country: "Turquie", offset: "TRT" },
     { name: "Asia/Tehran", label: "Téhéran", country: "Iran", offset: "IRST/IRDT" },
     { name: "Asia/Riyadh", label: "Riyad", country: "Arabie Saoudite", offset: "AST" },
     { name: "Asia/Jerusalem", label: "Jérusalem", country: "Israël", offset: "IST/IDT" }
   ];
   
   // Get all available timezones (default + custom)
   const getAllTimezones = () => {
     return [...extendedTimeZones, ...customTimezones];
   };
  
  // Function to get current time in a specific timezone
  const getTimeInTimezone = (timezone: string) => {
    try {
      return formatInTimeZone(currentTime, timezone, 'HH:mm:ss');
    } catch {
      return format(currentTime, 'HH:mm:ss');
    }
  };
  
  // Function to get date in a specific timezone
  const getDateInTimezone = (timezone: string) => {
    try {
      return formatInTimeZone(currentTime, timezone, 'dd/MM/yyyy');
    } catch {
      return format(currentTime, 'dd/MM/yyyy');
    }
  };
  
  // Function to get timezone offset
  const getTimezoneOffset = (timezone: string) => {
    try {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const targetTime = new Date(utc + (getTimezoneOffsetInMs(timezone)));
      const offset = (targetTime.getTime() - utc) / (1000 * 60 * 60);
      return offset >= 0 ? `+${offset}` : `${offset}`;
    } catch {
      return '+0';
    }
  };
  
  // Helper function to get timezone offset in milliseconds
  const getTimezoneOffsetInMs = (timezone: string) => {
    try {
      const date = new Date();
      const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
      return tzDate.getTime() - utcDate.getTime();
    } catch {
      return 0;
    }
  };

  // Function to check if timezone is currently in DST
  const isDSTActive = (timezone: string) => {
    try {
      const now = new Date();
      const january = new Date(now.getFullYear(), 0, 1);
      const july = new Date(now.getFullYear(), 6, 1);
      
      const janOffset = getTimezoneOffsetInMs(timezone);
      const julOffset = getTimezoneOffsetInMs(timezone);
      const currentOffset = getTimezoneOffsetInMs(timezone);
      
      // If offsets are different between winter and summer, DST is used
      if (janOffset !== julOffset) {
        // DST is active if current offset matches the summer offset
        return currentOffset === Math.max(janOffset, julOffset);
      }
      
      return false;
    } catch {
      return false;
    }
  };

  // Function to get DST transition information
  const getDSTInfo = (timezone: string) => {
    try {
      const isDST = isDSTActive(timezone);
      const now = new Date();
      const year = now.getFullYear();
      
      // Common DST transition dates (approximation)
      const springTransition = new Date(year, 2, 31); // Last Sunday in March
      const fallTransition = new Date(year, 9, 31); // Last Sunday in October
      
      return {
        isDST,
        status: isDST ? 'Heure d\'été' : 'Heure standard',
        icon: isDST ? Sun : Moon,
        nextTransition: isDST ? fallTransition : springTransition
      };
    } catch {
      return {
        isDST: false,
        status: 'Heure standard',
        icon: Moon,
        nextTransition: null
      };
    }
   };

   // Export functions
   const exportToCSV = () => {
     const csvData = getAllTimezones().map(tz => {
       const dstInfo = getDSTInfo(tz.name);
       return {
         'Fuseau Horaire': tz.name,
         'Ville': tz.label,
         'Pays': tz.country,
         'Heure Actuelle': getTimeInTimezone(tz.name),
         'Date': getDateInTimezone(tz.name),
         'Décalage UTC': `UTC${getTimezoneOffset(tz.name)}`,
         'DST/STD': dstInfo.isDST ? 'DST' : 'STD',
         'Statut DST': dstInfo.status,
         'Favori': favoriteTimezones.includes(tz.name) ? 'Oui' : 'Non'
       };
     });

     const headers = Object.keys(csvData[0]);
     const csvContent = [
       headers.join(','),
       ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
     ].join('\n');

     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
     const link = document.createElement('a');
     const url = URL.createObjectURL(blob);
     link.setAttribute('href', url);
     link.setAttribute('download', `fuseaux-horaires-${format(new Date(), 'yyyy-MM-dd')}.csv`);
     link.style.visibility = 'hidden';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);

     toast({
       title: "Export CSV réussi",
       description: "Le fichier CSV a été téléchargé avec succès"
     });
   };

   const exportToICal = () => {
     const now = new Date();
     const icalContent = [
       'BEGIN:VCALENDAR',
       'VERSION:2.0',
       'PRODID:-//À votre service//Timezone Tool//EN',
       'CALSCALE:GREGORIAN',
       'METHOD:PUBLISH',
       'X-WR-CALNAME:Fuseaux Horaires Mondiaux',
       'X-WR-CALDESC:Horaires actuels des fuseaux horaires favoris'
     ];

     favoriteTimezones.forEach((tzName, index) => {
       const tz = getAllTimezones().find(t => t.name === tzName);
       if (tz) {
         const dstInfo = getDSTInfo(tz.name);
         const eventStart = format(now, "yyyyMMdd'T'HHmmss'Z'");
         const eventEnd = format(new Date(now.getTime() + 60000), "yyyyMMdd'T'HHmmss'Z'"); // 1 minute duration
         
         icalContent.push(
           'BEGIN:VEVENT',
           `UID:timezone-${index}-${Date.now()}@avotre-service.com`,
           `DTSTART:${eventStart}`,
           `DTEND:${eventEnd}`,
           `SUMMARY:${tz.label} - ${getTimeInTimezone(tz.name)}`,
           `DESCRIPTION:Fuseau horaire: ${tz.name}\\nPays: ${tz.country}\\nHeure locale: ${getTimeInTimezone(tz.name)}\\nDate: ${getDateInTimezone(tz.name)}\\nDécalage UTC: ${getTimezoneOffset(tz.name)}h\\nStatut: ${dstInfo.status}`,
           `LOCATION:${tz.country}`,
           `CATEGORIES:Fuseau Horaire,${dstInfo.isDST ? 'DST' : 'STD'}`,
           'STATUS:CONFIRMED',
           'TRANSP:TRANSPARENT',
           'END:VEVENT'
         );
       }
     });

     icalContent.push('END:VCALENDAR');

     const blob = new Blob([icalContent.join('\r\n')], { type: 'text/calendar;charset=utf-8;' });
     const link = document.createElement('a');
     const url = URL.createObjectURL(blob);
     link.setAttribute('href', url);
     link.setAttribute('download', `fuseaux-horaires-${format(new Date(), 'yyyy-MM-dd')}.ics`);
     link.style.visibility = 'hidden';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);

     toast({
       title: "Export iCal réussi",
       description: "Le fichier iCal a été téléchargé avec succès"
     });
   };
   
   // Function to toggle favorite timezone
  const toggleFavorite = (timezoneName: string) => {
    const newFavorites = favoriteTimezones.includes(timezoneName)
      ? favoriteTimezones.filter(tz => tz !== timezoneName)
      : [...favoriteTimezones, timezoneName];
    
    setFavoriteTimezones(newFavorites);
    localStorage.setItem('favoriteTimezones', JSON.stringify(newFavorites));
    
    toast({
      title: favoriteTimezones.includes(timezoneName) ? "Retiré des favoris" : "Ajouté aux favoris",
      description: `${getAllTimezones().find(tz => tz.name === timezoneName)?.label} ${favoriteTimezones.includes(timezoneName) ? 'retiré de' : 'ajouté à'} vos favoris`
    });
  };
  
  // Function to reorder favorites (drag and drop simulation)
  const reorderFavorites = (fromIndex: number, toIndex: number) => {
    const newFavorites = [...favoriteTimezones];
    const [removed] = newFavorites.splice(fromIndex, 1);
    newFavorites.splice(toIndex, 0, removed);
    
    setFavoriteTimezones(newFavorites);
    localStorage.setItem('favoriteTimezones', JSON.stringify(newFavorites));
  };
  
  // Function to clear all favorites
  const clearAllFavorites = () => {
    setFavoriteTimezones([]);
    localStorage.setItem('favoriteTimezones', JSON.stringify([]));
    toast({
       title: "Favoris effacés",
       description: "Tous les fuseaux horaires favoris ont été supprimés"
     });
   };
   
   // Function to add timezone to comparison
   const addToComparison = (timezoneName: string) => {
     if (comparisonTimezones.includes(timezoneName)) {
       toast({
         title: "Déjà en comparaison",
         description: "Ce fuseau horaire est déjà dans la vue comparative",
         variant: "destructive"
       });
       return;
     }
     
     const newComparison = [...comparisonTimezones, timezoneName];
     setComparisonTimezones(newComparison);
     localStorage.setItem('comparisonTimezones', JSON.stringify(newComparison));
     
     const tz = getAllTimezones().find(t => t.name === timezoneName);
     toast({
       title: "Ajouté à la comparaison",
       description: `${tz?.label} ajouté à la vue comparative`
     });
   };
   
   // Function to remove timezone from comparison
   const removeFromComparison = (timezoneName: string) => {
     const newComparison = comparisonTimezones.filter(tz => tz !== timezoneName);
     setComparisonTimezones(newComparison);
     localStorage.setItem('comparisonTimezones', JSON.stringify(newComparison));
   };

   // Function to clear all comparison timezones
   const clearComparisonTimezones = () => {
     setComparisonTimezones([]);
     localStorage.setItem('comparisonTimezones', JSON.stringify([]));
     toast({
       title: "Comparaison vidée",
       description: "Tous les fuseaux horaires ont été supprimés de la comparaison"
     });
   };
   
   // Function to get time difference in hours
   const getTimeDifference = (timezone1: string, timezone2: string) => {
     const now = new Date();
     const offset1 = getTimezoneOffsetInMs(timezone1);
     const offset2 = getTimezoneOffsetInMs(timezone2);
     return (offset1 - offset2) / (1000 * 60 * 60);
   };
   
   // Function to get time in timezone for specific date/time
   const getTimeInTimezoneForDate = (timezoneName: string, dateTime: string) => {
     try {
       const date = parseISO(dateTime);
       return formatInTimeZone(date, timezoneName, 'HH:mm', { locale: fr });
     } catch {
       return '--:--';
     }
   };
   
   // Function to get date in timezone for specific date/time
    const getDateInTimezoneForDate = (timezoneName: string, dateTime: string) => {
      try {
        const date = parseISO(dateTime);
        return formatInTimeZone(date, timezoneName, 'dd/MM/yyyy', { locale: fr });
      } catch {
        return '--/--/----';
      }
    };
    
    // Meeting planner functions
    const addParticipant = () => {
      const newParticipant = {
        name: `Participant ${meetingParticipants.length + 1}`,
        timezone: 'Europe/Paris'
      };
      const updated = [...meetingParticipants, newParticipant];
      setMeetingParticipants(updated);
      localStorage.setItem('meetingParticipants', JSON.stringify(updated));
    };
    
    const removeParticipant = (index: number) => {
      const updated = meetingParticipants.filter((_, i) => i !== index);
      setMeetingParticipants(updated);
      localStorage.setItem('meetingParticipants', JSON.stringify(updated));
    };
    
    const updateParticipant = (index: number, field: 'name' | 'timezone', value: string) => {
      const updated = meetingParticipants.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      );
      setMeetingParticipants(updated);
      localStorage.setItem('meetingParticipants', JSON.stringify(updated));
    };
    
    // Function to find optimal meeting times
    const findOptimalMeetingTimes = () => {
      const suggestions = [];
      const startHour = parseInt(workingHoursStart.split(':')[0]);
      const endHour = parseInt(workingHoursEnd.split(':')[0]);
      
      // Generate time slots every 30 minutes
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const dateTimeString = `${meetingDate} ${timeSlot}`;
          
          // Check if this time works for all participants
          const participantTimes = meetingParticipants.map(participant => {
            const localTime = getTimeInTimezoneForDate(participant.timezone, dateTimeString);
            const localHour = parseInt(localTime.split(':')[0]);
            const isWorkingHours = localHour >= startHour && localHour < endHour;
            
            return {
              name: participant.name,
              timezone: participant.timezone,
              localTime,
              localDate: getDateInTimezoneForDate(participant.timezone, dateTimeString),
              isWorkingHours,
              score: isWorkingHours ? (localHour >= 9 && localHour <= 17 ? 10 : 5) : 0
            };
          });
          
          const totalScore = participantTimes.reduce((sum, p) => sum + p.score, 0);
          const averageScore = totalScore / participantTimes.length;
          
          if (averageScore > 0) {
            suggestions.push({
              time: timeSlot,
              dateTime: dateTimeString,
              participantTimes,
              score: averageScore,
              suitability: averageScore >= 8 ? 'Excellent' : averageScore >= 5 ? 'Bon' : 'Acceptable'
            });
          }
        }
      }
      
      return suggestions.sort((a, b) => b.score - a.score).slice(0, 6);
    };
  
  // Function to convert time between timezones
  const convertTime = () => {
    try {
      const inputDateTime = parseISO(`${conversionDate}T${conversionTime}:00`);
      
      // Format times in both timezones
      const sourceTime = formatInTimeZone(inputDateTime, sourceTimezone, 'HH:mm:ss dd/MM/yyyy');
      const targetTime = formatInTimeZone(inputDateTime, targetTimezone, 'HH:mm:ss dd/MM/yyyy');
      
      // Calculate time difference
      const sourceOffset = getTimezoneOffsetInMs(sourceTimezone) / (1000 * 60 * 60);
      const targetOffset = getTimezoneOffsetInMs(targetTimezone) / (1000 * 60 * 60);
      const timeDiff = targetOffset - sourceOffset;
      
      // Calculate day difference
      const sourceDate = formatInTimeZone(inputDateTime, sourceTimezone, 'yyyy-MM-dd');
      const targetDate = formatInTimeZone(inputDateTime, targetTimezone, 'yyyy-MM-dd');
      const dayDiff = new Date(targetDate).getDate() - new Date(sourceDate).getDate();
      
      const result: ConversionResult = {
        sourceTime,
        targetTime,
        timeDifference: `${timeDiff >= 0 ? '+' : ''}${timeDiff}h`,
        dayDifference: dayDiff
      };
      
      setConversionResult(result);
      
      toast({
        title: "Conversion réussie",
        description: "Le temps a été converti avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur de conversion",
        description: "Impossible de convertir le temps",
        variant: "destructive"
      });
    }
  };
  
  // Function to copy time to clipboard
   const copyToClipboard = (text: string, label: string) => {
     navigator.clipboard.writeText(text);
     toast({
       title: "Copié!",
       description: `${label} copié dans le presse-papiers`
     });
   };
   
   // Function to search timezones
   const searchTimezones = (query: string) => {
     if (!query.trim()) {
       setSearchResults([]);
       return;
     }
     
     const filtered = extendedTimeZones.filter(tz => 
       tz.label.toLowerCase().includes(query.toLowerCase()) ||
       tz.country.toLowerCase().includes(query.toLowerCase()) ||
       tz.name.toLowerCase().includes(query.toLowerCase())
     );
     
     setSearchResults(filtered.slice(0, 10)); // Limit to 10 results
   };
   
   // Function to add custom timezone
   const addCustomTimezone = (timezone: TimeZoneData) => {
     const exists = customTimezones.some(tz => tz.name === timezone.name);
     if (exists) {
       toast({
         title: "Fuseau déjà ajouté",
         description: "Ce fuseau horaire est déjà dans votre liste personnalisée",
         variant: "destructive"
       });
       return;
     }
     
     const newCustomTimezones = [...customTimezones, timezone];
     setCustomTimezones(newCustomTimezones);
     localStorage.setItem('customTimezones', JSON.stringify(newCustomTimezones));
     
     // Also add to favorites
     if (!favoriteTimezones.includes(timezone.name)) {
       const newFavorites = [...favoriteTimezones, timezone.name];
       setFavoriteTimezones(newFavorites);
       localStorage.setItem('favoriteTimezones', JSON.stringify(newFavorites));
     }
     
     setSearchQuery('');
     setSearchResults([]);
     
     toast({
       title: "Fuseau ajouté",
       description: `${timezone.label} a été ajouté à vos fuseaux personnalisés et favoris`
     });
   };
   
   // Function to remove custom timezone
   const removeCustomTimezone = (timezoneName: string) => {
     const newCustomTimezones = customTimezones.filter(tz => tz.name !== timezoneName);
     setCustomTimezones(newCustomTimezones);
     localStorage.setItem('customTimezones', JSON.stringify(newCustomTimezones));
     
     // Also remove from favorites
     const newFavorites = favoriteTimezones.filter(tz => tz !== timezoneName);
     setFavoriteTimezones(newFavorites);
     localStorage.setItem('favoriteTimezones', JSON.stringify(newFavorites));
     
     toast({
       title: "Fuseau retiré",
       description: "Le fuseau horaire a été retiré de votre liste personnalisée"
     });
   };

  return (
    <Card className="shadow-lg border-2">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/50 dark:to-cyan-950/50">
        <CardTitle className="flex items-center gap-3 text-lg lg:text-xl">
          <Globe className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600" />
          Fuseaux Horaires Avancés
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-6 p-4 lg:p-6">
        <Tabs defaultValue="clocks" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
               <TabsTrigger value="clocks" className="flex items-center gap-2">
                 <Clock className="w-4 h-4" />
                 Horloges
               </TabsTrigger>
               <TabsTrigger value="converter" className="flex items-center gap-2">
                 <ArrowRightLeft className="w-4 h-4" />
                 Convertisseur
               </TabsTrigger>
               <TabsTrigger value="comparison" className="flex items-center gap-2">
                 <BarChart3 className="w-4 h-4" />
                 Comparaison
               </TabsTrigger>
               <TabsTrigger value="meeting" className="flex items-center gap-2">
                 <Users className="w-4 h-4" />
                 Réunions
               </TabsTrigger>
               <TabsTrigger value="search" className="flex items-center gap-2">
                 <Search className="w-4 h-4" />
                 Recherche
               </TabsTrigger>
               <TabsTrigger value="favorites" className="flex items-center gap-2">
                 <Star className="w-4 h-4" />
                 Favoris
               </TabsTrigger>
             </TabsList>

          <TabsContent value="clocks" className="space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {getAllTimezones().map((tz) => {
                const isFavorite = favoriteTimezones.includes(tz.name);
                return (
                  <div key={tz.name} className="relative p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/40 dark:to-cyan-900/40 rounded-xl border-2 border-teal-200 dark:border-teal-700">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base lg:text-lg text-teal-700 dark:text-teal-300 truncate">
                          {tz.label}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{tz.country}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(tz.name)}
                        className="p-1 h-auto"
                      >
                        {isFavorite ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl lg:text-2xl font-mono text-gray-800 dark:text-gray-200 mb-1">
                        {getTimeInTimezone(tz.name)}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                        {getDateInTimezone(tz.name)}
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {tz.offset} ({getTimezoneOffset(tz.name)}h)
                        </Badge>
                        {(() => {
                          const dstInfo = getDSTInfo(tz.name);
                          const IconComponent = dstInfo.icon;
                          return (
                            <Badge 
                              variant={dstInfo.isDST ? "default" : "secondary"}
                              className={`text-xs flex items-center gap-1 ${
                                dstInfo.isDST 
                                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300' 
                                  : 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300'
                              }`}
                            >
                              <IconComponent className="w-3 h-3" />
                              {dstInfo.isDST ? 'DST' : 'STD'}
                            </Badge>
                          );
                        })()}
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-3 space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `${tz.label}: ${getTimeInTimezone(tz.name)} (${getDateInTimezone(tz.name)})`,
                          `Heure de ${tz.label}`
                        )}
                        className="text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copier
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToComparison(tz.name)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Comparer
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="converter" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                  Convertisseur de Fuseaux Horaires
                </CardTitle>
              </CardHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Fuseau source</label>
                    <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                         {getAllTimezones().map((tz) => (
                           <SelectItem key={tz.name} value={tz.name}>
                             {tz.label} ({tz.country})
                           </SelectItem>
                         ))}
                       </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Date</label>
                    <Input
                      type="date"
                      value={conversionDate}
                      onChange={(e) => setConversionDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Heure</label>
                    <Input
                      type="time"
                      value={conversionTime}
                      onChange={(e) => setConversionTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Fuseau cible</label>
                    <Select value={targetTimezone} onValueChange={setTargetTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                         {getAllTimezones().map((tz) => (
                           <SelectItem key={tz.name} value={tz.name}>
                             {tz.label} ({tz.country})
                           </SelectItem>
                         ))}
                       </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end h-full">
                    <Button onClick={convertTime} className="w-full">
                      <ArrowRightLeft className="w-4 h-4 mr-2" />
                      Convertir
                    </Button>
                  </div>
                </div>
              </div>
              
              {conversionResult && (
                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Résultat de la conversion
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                         {getAllTimezones().find(tz => tz.name === sourceTimezone)?.label}
                       </p>
                      <p className="text-lg font-mono text-blue-600 dark:text-blue-400">
                        {conversionResult.sourceTime}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                       <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                         {getAllTimezones().find(tz => tz.name === targetTimezone)?.label}
                       </p>
                      <p className="text-lg font-mono text-green-600 dark:text-green-400">
                        {conversionResult.targetTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        Décalage: {conversionResult.timeDifference}
                      </Badge>
                      {conversionResult.dayDifference !== 0 && (
                        <Badge variant="outline">
                          {conversionResult.dayDifference > 0 ? '+' : ''}{conversionResult.dayDifference} jour(s)
                        </Badge>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `${conversionResult.sourceTime} → ${conversionResult.targetTime}`,
                        "Résultat de conversion"
                      )}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copier
                    </Button>
                  </div>
                </div>
              )}
            </Card>
           </TabsContent>
 
           <TabsContent value="comparison" className="space-y-6">
             <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
               <CardHeader className="p-0 mb-6">
                 <CardTitle className="flex items-center gap-2 text-lg">
                   <BarChart3 className="w-5 h-5 text-blue-600" />
                   Vue Comparative des Fuseaux Horaires
                 </CardTitle>
               </CardHeader>
               
               <div className="space-y-6">
                 {/* Time selection */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                       Date et heure de référence
                     </label>
                     <Input
                       type="datetime-local"
                       value={comparisonBaseTime}
                       onChange={(e) => setComparisonBaseTime(e.target.value)}
                       className="w-full"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                       Ajouter un fuseau horaire
                     </label>
                     <Select onValueChange={addToComparison}>
                       <SelectTrigger>
                         <SelectValue placeholder="Sélectionner un fuseau..." />
                       </SelectTrigger>
                       <SelectContent>
                         {getAllTimezones()
                           .filter(tz => !comparisonTimezones.includes(tz.name))
                           .map((tz) => (
                             <SelectItem key={tz.name} value={tz.name}>
                               {tz.label} ({tz.country})
                             </SelectItem>
                           ))}
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
                 
                 {/* Comparison table */}
                 {comparisonTimezones.length > 0 && (
                   <div className="overflow-x-auto">
                     <div className="min-w-full bg-white dark:bg-gray-800 rounded-lg border">
                       <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 dark:bg-gray-700 font-semibold text-sm border-b">
                         <div>Fuseau Horaire</div>
                         <div>Heure Locale</div>
                         <div>Date</div>
                         <div>Décalage UTC</div>
                         <div>DST/STD</div>
                         <div>Différence</div>
                         <div>Actions</div>
                       </div>
                       
                       {comparisonTimezones.map((tzName, index) => {
                         const tz = getAllTimezones().find(t => t.name === tzName);
                         if (!tz) return null;
                         
                         const baseTimezone = comparisonTimezones[0];
                         const timeDiff = index === 0 ? 0 : getTimeDifference(tzName, baseTimezone);
                         const diffText = timeDiff === 0 ? 'Base' : 
                           timeDiff > 0 ? `+${timeDiff}h` : `${timeDiff}h`;
                         
                         const dstInfo = getDSTInfo(tzName);
                         const DSTIcon = dstInfo.icon;
                         
                         return (
                           <div key={tzName} className={`grid grid-cols-7 gap-4 p-4 border-b last:border-b-0 ${
                             index === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                           }`}>
                             <div className="flex items-center gap-2">
                               <Globe className="w-4 h-4 text-blue-600" />
                               <div>
                                 <div className="font-medium">{tz.label}</div>
                                 <div className="text-xs text-gray-500">{tz.country}</div>
                               </div>
                             </div>
                             
                             <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300">
                               {getTimeInTimezoneForDate(tzName, comparisonBaseTime)}
                             </div>
                             
                             <div className="text-sm text-gray-600 dark:text-gray-400">
                               {getDateInTimezoneForDate(tzName, comparisonBaseTime)}
                             </div>
                             
                             <div className="text-sm">
                               <Badge variant="outline" className="text-xs">
                                 UTC{getTimezoneOffset(tzName)}
                               </Badge>
                             </div>
                             
                             <div className="text-sm">
                               <Badge 
                                 variant={dstInfo.isDST ? "default" : "secondary"}
                                 className={`text-xs flex items-center gap-1 ${
                                   dstInfo.isDST 
                                     ? 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300' 
                                     : 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300'
                                 }`}
                               >
                                 <DSTIcon className="w-3 h-3" />
                                 {dstInfo.isDST ? 'DST' : 'STD'}
                               </Badge>
                             </div>
                             
                             <div className="text-sm">
                               <Badge 
                                 variant={index === 0 ? "default" : "secondary"}
                                 className={`text-xs ${
                                   index === 0 ? 'bg-blue-600' : 
                                   timeDiff > 0 ? 'bg-green-100 text-green-800' : 
                                   timeDiff < 0 ? 'bg-red-100 text-red-800' : ''
                                 }`}
                               >
                                 {diffText}
                               </Badge>
                             </div>
                             
                             <div className="flex items-center gap-1">
                               <Button
                                 variant="ghost"
                                 size="sm"
                                 onClick={() => copyToClipboard(
                                   `${tz.label}: ${getTimeInTimezoneForDate(tzName, comparisonBaseTime)}`,
                                   tz.label
                                 )}
                                 className="text-blue-500 hover:text-blue-700"
                               >
                                 <Copy className="w-3 h-3" />
                               </Button>
                               {comparisonTimezones.length > 1 && (
                                 <Button
                                   variant="ghost"
                                   size="sm"
                                   onClick={() => removeFromComparison(tzName)}
                                   className="text-red-500 hover:text-red-700"
                                 >
                                   <Trash2 className="w-3 h-3" />
                                 </Button>
                               )}
                             </div>
                           </div>
                         );
                       })}
                     </div>
                   </div>
                 )}
                 
                 {/* Quick actions */}
                 <div className="flex flex-wrap gap-2 pt-4 border-t">
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       const comparisonData = comparisonTimezones.map(tzName => {
                         const tz = getAllTimezones().find(t => t.name === tzName);
                         if (!tz) return '';
                         const dstInfo = getDSTInfo(tzName);
                         return `${tz.label}: ${getTimeInTimezoneForDate(tzName, comparisonBaseTime)} (${getDateInTimezoneForDate(tzName, comparisonBaseTime)}) - ${dstInfo.isDST ? 'DST' : 'STD'}`;
                       }).filter(Boolean).join('\n');
                       copyToClipboard(comparisonData, 'Comparaison des fuseaux');
                     }}
                     className="flex items-center gap-1"
                   >
                     <Copy className="w-3 h-3 mr-1" />
                     Copier la comparaison
                   </Button>
                   
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       const csvData = comparisonTimezones.map(tzName => {
                         const tz = getAllTimezones().find(t => t.name === tzName);
                         if (!tz) return null;
                         const dstInfo = getDSTInfo(tzName);
                         const baseTimezone = comparisonTimezones[0];
                         const timeDiff = tzName === baseTimezone ? 0 : getTimeDifference(tzName, baseTimezone);
                         return {
                           'Fuseau Horaire': tz.name,
                           'Ville': tz.label,
                           'Pays': tz.country,
                           'Heure Locale': getTimeInTimezoneForDate(tzName, comparisonBaseTime),
                           'Date': getDateInTimezoneForDate(tzName, comparisonBaseTime),
                           'Décalage UTC': `UTC${getTimezoneOffset(tzName)}`,
                           'DST/STD': dstInfo.isDST ? 'DST' : 'STD',
                           'Différence (h)': timeDiff === 0 ? 'Base' : (timeDiff > 0 ? `+${timeDiff}` : `${timeDiff}`)
                         };
                       }).filter(Boolean);
                       
                       const headers = Object.keys(csvData[0]);
                       const csvContent = [
                         headers.join(','),
                         ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
                       ].join('\n');
                       
                       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                       const link = document.createElement('a');
                       const url = URL.createObjectURL(blob);
                       link.setAttribute('href', url);
                       link.setAttribute('download', `comparaison-fuseaux-${format(new Date(), 'yyyy-MM-dd')}.csv`);
                       link.style.visibility = 'hidden';
                       document.body.appendChild(link);
                       link.click();
                       document.body.removeChild(link);
                       
                       toast({
                         title: "Export CSV réussi",
                         description: "La comparaison a été exportée en CSV"
                       });
                     }}
                     className="flex items-center gap-1 text-green-600 hover:text-green-800"
                     disabled={comparisonTimezones.length === 0}
                   >
                     <FileText className="w-3 h-3 mr-1" />
                     Export CSV
                   </Button>
                   
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={clearComparisonTimezones}
                     className="flex items-center gap-1 text-red-600 hover:text-red-800"
                     disabled={comparisonTimezones.length === 0}
                   >
                     <Trash2 className="w-3 h-3" />
                     Vider la comparaison
                   </Button>
                   
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       const now = new Date();
                       setComparisonBaseTime(format(now, 'yyyy-MM-dd HH:mm'));
                     }}
                     className="flex items-center gap-1"
                   >
                     <Clock className="w-3 h-3" />
                     Maintenant
                   </Button>
                   
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => {
                       setComparisonTimezones(['Europe/Paris', 'America/New_York', 'Asia/Tokyo']);
                       localStorage.setItem('comparisonTimezones', JSON.stringify(['Europe/Paris', 'America/New_York', 'Asia/Tokyo']));
                     }}
                     className="flex items-center gap-1"
                   >
                     <BarChart3 className="w-3 h-3" />
                     Réinitialiser
                   </Button>
                 </div>
               </div>
             </Card>
           </TabsContent>
  
            <TabsContent value="meeting" className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                    Planificateur de Réunions Multi-Fuseaux
                  </CardTitle>
                </CardHeader>
                
                <div className="space-y-6">
                  {/* Meeting configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date de la réunion
                      </label>
                      <Input
                        type="date"
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Durée (minutes)
                      </label>
                      <Input
                        type="number"
                        value={meetingDuration}
                        onChange={(e) => setMeetingDuration(parseInt(e.target.value) || 60)}
                        min="15"
                        max="480"
                        step="15"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Heures de travail
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="time"
                          value={workingHoursStart}
                          onChange={(e) => setWorkingHoursStart(e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="time"
                          value={workingHoursEnd}
                          onChange={(e) => setWorkingHoursEnd(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Participants management */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Participants ({meetingParticipants.length})
                      </h3>
                      <Button
                        onClick={addParticipant}
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {meetingParticipants.map((participant, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                          <div className="flex-1">
                            <Input
                              value={participant.name}
                              onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                              placeholder="Nom du participant"
                              className="mb-2"
                            />
                            <Select
                              value={participant.timezone}
                              onValueChange={(value) => updateParticipant(index, 'timezone', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {getAllTimezones().map((tz) => (
                                  <SelectItem key={tz.name} value={tz.name}>
                                    {tz.label} ({tz.country})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {meetingParticipants.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeParticipant(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Meeting suggestions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-purple-600" />
                      Créneaux Suggérés
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {findOptimalMeetingTimes().map((suggestion, index) => (
                        <Card key={index} className={`p-4 border-l-4 ${
                          suggestion.suitability === 'Excellent' ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' :
                          suggestion.suitability === 'Bon' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                          'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-purple-600" />
                              <span className="font-bold text-lg">{suggestion.time}</span>
                            </div>
                            <Badge 
                              variant={suggestion.suitability === 'Excellent' ? 'default' : 'secondary'}
                              className={`${
                                suggestion.suitability === 'Excellent' ? 'bg-green-600' :
                                suggestion.suitability === 'Bon' ? 'bg-yellow-600' : 'bg-orange-600'
                              } text-white`}
                            >
                              {suggestion.suitability}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            {suggestion.participantTimes.map((pt, ptIndex) => (
                              <div key={ptIndex} className="flex items-center justify-between text-sm">
                                <span className="font-medium">{pt.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{pt.localTime}</span>
                                  {pt.isWorkingHours ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const meetingInfo = `Réunion planifiée\n` +
                                  `Date: ${format(parseISO(meetingDate), 'dd/MM/yyyy', { locale: fr })}\n` +
                                  `Heure: ${suggestion.time}\n` +
                                  `Durée: ${meetingDuration} minutes\n\n` +
                                  `Participants:\n` +
                                  suggestion.participantTimes.map(pt => 
                                    `- ${pt.name}: ${pt.localTime} (${pt.timezone})`
                                  ).join('\n');
                                copyToClipboard(meetingInfo, 'Informations de réunion');
                              }}
                              className="flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              Copier
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                    
                    {findOptimalMeetingTimes().length === 0 && (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Aucun créneau optimal trouvé pour ces participants.</p>
                        <p className="text-sm mt-1">Essayez d'ajuster les heures de travail ou la date.</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>
  
            <TabsContent value="search" className="space-y-6">
             <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
               <CardHeader className="p-0 mb-4">
                 <CardTitle className="flex items-center gap-2 text-lg">
                   <Search className="w-5 h-5 text-green-600" />
                   Recherche de Fuseaux Horaires
                 </CardTitle>
               </CardHeader>
               
               <div className="space-y-4">
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <Input
                     placeholder="Rechercher une ville, un pays ou un fuseau horaire..."
                     value={searchQuery}
                     onChange={(e) => {
                       setSearchQuery(e.target.value);
                       searchTimezones(e.target.value);
                     }}
                     className="pl-10"
                   />
                 </div>
                 
                 {searchResults.length > 0 && (
                   <div className="space-y-2 max-h-96 overflow-y-auto">
                     <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                       Résultats de recherche ({searchResults.length})
                     </h3>
                     {searchResults.map((tz) => (
                       <div key={tz.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                         <div className="flex items-center gap-3">
                           <MapPin className="w-4 h-4 text-green-600" />
                           <div>
                             <p className="font-medium">{tz.label}</p>
                             <p className="text-sm text-gray-600 dark:text-gray-400">
                               {tz.country} • {tz.offset}
                             </p>
                           </div>
                         </div>
                         <div className="flex gap-2">
                           <Button
                             size="sm"
                             onClick={() => addCustomTimezone(tz)}
                             className="flex items-center gap-1"
                           >
                             <Plus className="w-3 h-3" />
                             Ajouter
                           </Button>
                           <Button
                             size="sm"
                             variant="outline"
                             onClick={() => addToComparison(tz.name)}
                             className="flex items-center gap-1"
                           >
                             <BarChart3 className="w-3 h-3" />
                             Comparer
                           </Button>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
                 
                 {searchQuery && searchResults.length === 0 && (
                   <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                     <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                     <p>Aucun fuseau horaire trouvé pour "{searchQuery}"</p>
                   </div>
                 )}
               </div>
               
               {customTimezones.length > 0 && (
                 <div className="mt-6 pt-6 border-t">
                   <h3 className="font-semibold mb-4 flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-green-600" />
                     Fuseaux Personnalisés ({customTimezones.length})
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {customTimezones.map((tz) => (
                       <div key={tz.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                         <div>
                           <p className="font-medium">{tz.label}</p>
                           <p className="text-sm text-gray-600 dark:text-gray-400">
                             {tz.country} • {tz.offset}
                           </p>
                         </div>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => removeCustomTimezone(tz.name)}
                           className="text-red-500 hover:text-red-700"
                         >
                           <Trash2 className="w-4 h-4" />
                         </Button>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </Card>
           </TabsContent>
 
           <TabsContent value="favorites" className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="w-5 h-5 text-yellow-600" />
                    Fuseaux Horaires Favoris ({favoriteTimezones.length})
                  </CardTitle>
                  {favoriteTimezones.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFavorites}
                      className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Tout effacer
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              {favoriteTimezones.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                    <GripVertical className="w-4 h-4" />
                    Utilisez les flèches pour réorganiser vos favoris
                  </div>
                  
                  <div className="space-y-3">
                    {favoriteTimezones.map((tzName, index) => {
                      const tz = getAllTimezones().find(t => t.name === tzName);
                      if (!tz) return null;
                      
                      return (
                        <div key={tz.name} className="group relative">
                          <Card className="p-4 bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all duration-200">
                            <div className="flex items-center gap-4">
                              {/* Drag handle */}
                              <div className="flex flex-col gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => index > 0 && reorderFavorites(index, index - 1)}
                                  disabled={index === 0}
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => index < favoriteTimezones.length - 1 && reorderFavorites(index, index + 1)}
                                  disabled={index === favoriteTimezones.length - 1}
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                >
                                  ↓
                                </Button>
                              </div>
                              
                              {/* Timezone info */}
                              <div className="flex items-center gap-3 flex-1">
                                <Globe className="w-5 h-5 text-yellow-600" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-lg">{tz.label}</span>
                                    <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                                      {tz.country}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {tz.offset} • {getDateInTimezone(tz.name)}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Time display */}
                              <div className="text-right">
                                <div className="text-2xl font-mono font-bold text-yellow-700 dark:text-yellow-300">
                                  {getTimeInTimezone(tz.name)}
                                </div>
                                <div className="flex items-center justify-end gap-2 mt-1">
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    UTC{getTimezoneOffset(tz.name)}
                                  </div>
                                  {(() => {
                                    const dstInfo = getDSTInfo(tz.name);
                                    const DSTIcon = dstInfo.icon;
                                    return (
                                      <Badge 
                                        variant={dstInfo.isDST ? "default" : "secondary"}
                                        className={`text-xs flex items-center gap-1 ${
                                          dstInfo.isDST 
                                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300' 
                                            : 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300'
                                        }`}
                                      >
                                        <DSTIcon className="w-3 h-3" />
                                        {dstInfo.isDST ? 'DST' : 'STD'}
                                      </Badge>
                                    );
                                  })()}
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(`${getTimeInTimezone(tz.name)} - ${tz.label}`, tz.label)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFavorite(tz.name)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <StarOff className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Quick actions */}
                  <div className="pt-4 border-t border-yellow-200 dark:border-yellow-800">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const allTimes = favoriteTimezones.map(tzName => {
                            const tz = getAllTimezones().find(t => t.name === tzName);
                            return tz ? `${tz.label}: ${getTimeInTimezone(tz.name)}` : '';
                          }).filter(Boolean).join('\n');
                          copyToClipboard(allTimes, 'Tous les favoris');
                        }}
                        className="flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copier tout
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportToCSV}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800"
                      >
                        <FileText className="w-3 h-3" />
                        Export CSV
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportToICal}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        disabled={favoriteTimezones.length === 0}
                      >
                        <Calendar className="w-3 h-3" />
                        Export iCal
                      </Button>
                    </div>
                    
                    {favoriteTimezones.length === 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        L'export iCal nécessite au moins un fuseau horaire favori
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Aucun fuseau horaire favori
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Ajoutez des fuseaux horaires à vos favoris depuis les onglets "Horloges" ou "Recherche" pour un accès rapide.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => (document.querySelector('[value="clocks"]') as HTMLElement)?.click()}
                      className="flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Voir les horloges
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => (document.querySelector('[value="search"]') as HTMLElement)?.click()}
                      className="flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Rechercher des fuseaux
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        <CalculationHistory history={calculationHistory} />
      </CardContent>
    </Card>
  );
};
