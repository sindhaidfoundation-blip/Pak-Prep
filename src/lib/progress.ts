import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'pak-prep-progress-v1';
export type Progress = {bookmarks:string[];completedQuizIds:string[];lastOpenedAt?:string};
const empty:Progress = {bookmarks:[],completedQuizIds:[]};
export async function getProgress():Promise<Progress>{
 try { const raw=await AsyncStorage.getItem(KEY); return raw ? {...empty,...JSON.parse(raw)} : empty; }
 catch { return empty; }
}
export async function saveProgress(progress:Progress):Promise<void>{ await AsyncStorage.setItem(KEY,JSON.stringify(progress)); }
export async function toggleBookmark(id:string):Promise<Progress>{
 const p=await getProgress(); const bookmarks=p.bookmarks.includes(id)?p.bookmarks.filter(x=>x!==id):[...p.bookmarks,id];
 const next={...p,bookmarks}; await saveProgress(next); return next;
}
