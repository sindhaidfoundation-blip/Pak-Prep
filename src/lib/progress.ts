import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'pak-prep-progress-v1';
export type Progress = {bookmarks:string[];completedQuizIds:string[];lastOpenedAt?:string};
const empty:Progress = {bookmarks:[],completedQuizIds:[]};

export async function getProgress():Promise<Progress>{
 try {
  const raw=await AsyncStorage.getItem(KEY);
  if(!raw) return empty;
  const parsed:unknown=JSON.parse(raw);
  if(!parsed || typeof parsed!=='object') return empty;
  const value=parsed as Record<string,unknown>;
  return {
   bookmarks:Array.isArray(value.bookmarks)?value.bookmarks.filter((x):x is string=>typeof x==='string'):[],
   completedQuizIds:Array.isArray(value.completedQuizIds)?value.completedQuizIds.filter((x):x is string=>typeof x==='string'):[],
   ...(typeof value.lastOpenedAt==='string'?{lastOpenedAt:value.lastOpenedAt}:{})
  };
 } catch { return empty; }
}
export async function saveProgress(progress:Progress):Promise<void>{ await AsyncStorage.setItem(KEY,JSON.stringify(progress)); }
export async function toggleBookmark(id:string):Promise<Progress>{
 const p=await getProgress(); const bookmarks=p.bookmarks.includes(id)?p.bookmarks.filter(x=>x!==id):[...p.bookmarks,id];
 const next={...p,bookmarks}; await saveProgress(next); return next;
}
