import { ExpoConfig, ConfigContext } from 'expo/config';
export default ({config}:ConfigContext):ExpoConfig=>({
 ...config,
 extra:{...config.extra,eas:{projectId:process.env.EAS_PROJECT_ID||config.extra?.eas?.projectId}}
});
