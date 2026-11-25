import {supabase} from './supabase';
export async function getPublishedPapers(filters:{region?:string;bps?:number;postTitle?:string}={}){
 if(!supabase) return [];
 let q=supabase.from('past_papers').select('id,title,exam_year,exam_date,paper_language,paper_url,source_url,answer_key_url,verification,job_posts(title,bps,region,departments(name),recruiting_bodies(name))').eq('status','published').order('exam_year',{ascending:false});
 if(filters.bps) q=q.eq('job_posts.bps',filters.bps);
 if(filters.region) q=q.eq('job_posts.region',filters.region);
 if(filters.postTitle) q=q.ilike('job_posts.title',`%${filters.postTitle}%`);
 const {data,error}=await q;
 if(error) throw error;
 return data??[];
}
export async function getPublishedMcqs(subjectId?:string){
 if(!supabase) return [];
 let q=supabase.from('mcqs').select('id,question,options,answer_index,explanation,subjects(name)').eq('status','published');
 if(subjectId) q=q.eq('subject_id',subjectId);
 const {data,error}=await q;
 if(error) throw error;
 return data??[];
}
export async function getPublishedDawnArticles(){
 if(!supabase) return [];
 const {data,error}=await supabase.from('dawn_articles').select('id,title,author,published_on,article_url,summary,vocabulary(word,urdu_meaning,synonyms,antonyms,essay_example)').eq('status','published').order('published_on',{ascending:false});
 if(error) throw error;
 return data??[];
}
