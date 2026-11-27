import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({config}:ConfigContext):ExpoConfig=>({
 ...config,
 name:config.name??'Pak-Prep',
 slug:config.slug??'pak-prep',
 extra:{
  ...config.extra,
  eas:{
   ...config.extra?.eas,
   projectId:process.env.EAS_PROJECT_ID||config.extra?.eas?.projectId
  }
 }
});
