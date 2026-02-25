export const getWeatherIcon = (code: number, isDay: boolean = true): string => {
  // Weather codes mapping based on Weatherstack
  const iconMap: Record<number, string> = {
    113: isDay ? 'sun' : 'moon',
    116: isDay ? 'cloud-sun' : 'cloud-moon',
    119: 'cloud',
    122: 'cloud',
    143: 'cloud-fog',
    176: 'cloud-drizzle',
    179: 'cloud-snow',
    182: 'cloud-snow',
    185: 'cloud-snow',
    200: 'cloud-lightning',
    227: 'snowflake',
    230: 'snowflake',
    248: 'cloud-fog',
    260: 'cloud-fog',
    263: 'cloud-drizzle',
    266: 'cloud-drizzle',
    281: 'cloud-drizzle',
    284: 'cloud-drizzle',
    293: 'cloud-rain',
    296: 'cloud-rain',
    299: 'cloud-rain',
    302: 'cloud-rain',
    305: 'cloud-rain',
    308: 'cloud-rain',
    311: 'cloud-rain',
    314: 'cloud-rain',
    317: 'cloud-rain',
    320: 'cloud-snow',
    323: 'cloud-snow',
    326: 'cloud-snow',
    329: 'snowflake',
    332: 'snowflake',
    335: 'snowflake',
    338: 'snowflake',
    350: 'cloud-hail',
    353: 'cloud-drizzle',
    356: 'cloud-rain',
    359: 'cloud-rain',
    362: 'cloud-snow',
    365: 'cloud-snow',
    368: 'cloud-snow',
    371: 'snowflake',
    374: 'cloud-hail',
    377: 'cloud-hail',
    386: 'cloud-lightning',
    389: 'cloud-lightning',
    392: 'cloud-lightning',
    395: 'cloud-lightning',
  };

  return iconMap[code] || 'cloud';
};

export const getWeatherDescription = (code: number): string => {
  const descriptionMap: Record<number, string> = {
    113: 'Clear',
    116: 'Partly Cloudy',
    119: 'Cloudy',
    122: 'Overcast',
    143: 'Mist',
    176: 'Patchy Rain',
    179: 'Patchy Snow',
    182: 'Patchy Sleet',
    185: 'Patchy Freezing Drizzle',
    200: 'Thundery Outbreaks',
    227: 'Blowing Snow',
    230: 'Blizzard',
    248: 'Fog',
    260: 'Freezing Fog',
    263: 'Patchy Light Drizzle',
    266: 'Light Drizzle',
    281: 'Freezing Drizzle',
    284: 'Heavy Freezing Drizzle',
    293: 'Patchy Light Rain',
    296: 'Light Rain',
    299: 'Moderate Rain',
    302: 'Heavy Rain',
    305: 'Heavy Rain at Times',
    308: 'Heavy Rain',
    311: 'Light Freezing Rain',
    314: 'Moderate/Heavy Freezing Rain',
    317: 'Light Sleet',
    320: 'Moderate/Heavy Sleet',
    323: 'Patchy Light Snow',
    326: 'Light Snow',
    329: 'Patchy Moderate Snow',
    332: 'Moderate Snow',
    335: 'Patchy Heavy Snow',
    338: 'Heavy Snow',
    350: 'Ice Pellets',
    353: 'Light Rain Shower',
    356: 'Moderate/Heavy Rain Shower',
    359: 'Torrential Rain Shower',
    362: 'Light Sleet Showers',
    365: 'Moderate/Heavy Sleet Showers',
    368: 'Light Snow Showers',
    371: 'Moderate/Heavy Snow Showers',
    374: 'Light Showers of Ice Pellets',
    377: 'Moderate/Heavy Showers of Ice Pellets',
    386: 'Patchy Light Rain with Thunder',
    389: 'Moderate/Heavy Rain with Thunder',
    392: 'Patchy Light Snow with Thunder',
    395: 'Moderate/Heavy Snow with Thunder',
  };

  return descriptionMap[code] || 'Unknown';
};

export const getUnitSymbol = (unit: string): string => {
  switch (unit) {
    case 's':
      return '°K';
    case 'f':
      return '°F';
    case 'm':
    default:
      return '°C';
  }
};

export const getSpeedUnit = (unit: string): string => {
  switch (unit) {
    case 's':
      return 'km/h';
    case 'f':
      return 'mph';
    case 'm':
    default:
      return 'km/h';
  }
};
