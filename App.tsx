import React, { useMemo, useState } from 'react';
import { StatusBar, SafeAreaView, ScrollView, View, Text, Pressable, TextInput, StyleSheet, Linking, Alert } from 'react-native';

type Tab = 'Home' | 'Past Papers' | 'Subjects' | 'Dawn English';
type Region = 'All Pakistan' | 'Federal' | 'Punjab' | 'Sindh' | 'Khyber Pakhtunkhwa' | 'Balochistan' | 'AJK' | 'Gilgit-Baltistan';
const GREEN = '#075B32', PALE = '#EAF4EE', ink = '#17231C';
const regions: Region[] = ['All Pakistan','Federal','Punjab','Sindh','Khyber Pakhtunkhwa','Balochistan','AJK','Gilgit-Baltistan'];
const recruiters = [
 {region:'Federal',name:'FPSC',kind:'Federal Public Service Commission',url:'https://www.fpsc.gov.pk/'},
 {region:'Federal',name:'NJP',kind:'National Jobs Portal',url:'https://njp.gov.pk/'},
 {region:'Punjab',name:'PPSC',kind:'Punjab Public Service Commission',url:'https://www.ppsc.gop.pk/'},
 {region:'Punjab',name:'Punjab Departments',kind:'Departmental recruitments',url:'https://punjab.gov.pk/'},
 {region:'Sindh',name:'SPSC',kind:'Sindh Public Service Commission',url:'https://www.spsc.gov.pk/'},
 {region:'Sindh',name:'STS',kind:'SIBA Testing Services',url:'https://www.sts.net.pk/'},
 {region:'Khyber Pakhtunkhwa',name:'KPPSC',kind:'Khyber Pakhtunkhwa Public Service Commission',url:'https://www.kppsc.gov.pk/'},
 {region:'Khyber Pakhtunkhwa',name:'ETEA',kind:'Educational Testing and Evaluation Agency',url:'https://etea.edu.pk/'},
 {region:'Balochistan',name:'BPSC',kind:'Balochistan Public Service Commission',url:'https://www.bpsc.gob.pk/'},
 {region:'AJK',name:'AJKPSC',kind:'Azad Jammu and Kashmir Public Service Commission',url:'https://ajkpsc.gov.pk/'},
 {region:'Gilgit-Baltistan',name:'GBPSC',kind:'Gilgit-Baltistan recruitment',url:''},
 {region:'All Pakistan',name:'NTS / PTS / OTS',kind:'National and provincial testing services',url:'https://www.nts.org.pk/'},
];
const jobFamilies = [
 {name:'Clerical & Office',posts:'Junior Clerk · Senior Clerk · Assistant · Stenotypist · Data Entry Operator',bps:'5–16'},
 {name:'Police & Law Enforcement',posts:'Constable · ASI · Sub-Inspector · Inspector · Investigation Officer',bps:'5–17'},
 {name:'Teaching & Education',posts:'Primary Teacher · EST · SST · Lecturer · Subject Specialist · Head Teacher',bps:'9–19'},
 {name:'Health & Medical',posts:'Technician · Dispenser · Nurse · Medical Officer · Specialist',bps:'5–20'},
 {name:'Engineering & Technical',posts:'Sub Engineer · Engineer · Technical Assistant · Surveyor',bps:'11–19'},
 {name:'IT & Computing',posts:'Computer Operator · IT Assistant · Programmer · Network / System Officer',bps:'11–19'},
 {name:'Accounts, Audit & Finance',posts:'Accountant · Auditor · Accounts Officer · Finance Officer',bps:'11–19'},
 {name:'Revenue & Land Administration',posts:'Patwari · Tehsildar · Naib Tehsildar · Revenue Officer',bps:'5–17'},
 {name:'Agriculture & Environment',posts:'Field Assistant · Agriculture Officer · Inspector · Research Officer',bps:'5–19'},
 {name:'Judiciary & Court Staff',posts:'Process Server · Reader · Stenographer · Assistant / Court Officer',bps:'5–17'},
 {name:'Management & Administration',posts:'Assistant Director · Deputy Director · Admin Officer · Project Officer',bps:'16–20'},
 {name:'Competitive Examinations',posts:'CSS · PMS · CCE · Combined Competitive Examinations',bps:'17+'},
];
const subjects = [
 ['English','Grammar, vocabulary, synonyms, antonyms'],['General Knowledge','Pakistan and world GK'],['Pakistan Studies','History, constitution and geography'],['Islamic Studies','Seerat, Quran, Hadith and Islamic history'],['Everyday Science','Basic science and daily applications'],['Computer','IT fundamentals and office applications'],['Mathematics','Arithmetic, algebra and analytical skills'],['Current Affairs','Pakistan and international developments'],['Urdu','Grammar, literature and vocabulary'],['Pedagogy','Teaching methods and education'],['Analytical Reasoning','Logic, patterns and problem solving'],['Geography','Pakistan and world geography']
];
const articles = [
 {title:'Governance failures',category:'Dawn · Opinion / Editorial',url:'https://www.dawn.com/news/2021796',summary:'Read the original Dawn article, then revise these independent vocabulary notes.',words:[
  {word:'Spurious',urdu:'جعلی / بے بنیاد',synonyms:'false, unfounded, invalid',antonyms:'genuine, authentic, valid',essay:'A spurious argument cannot provide a sound basis for public policy.'},
  {word:'Traction',urdu:'پذیرائی / پیش رفت',synonyms:'momentum, acceptance, progress',antonyms:'stagnation, rejection',essay:'The reform proposal failed to gain traction among stakeholders.'},
  {word:'Cumulative',urdu:'مجموعی / بتدریج جمع ہونے والا',synonyms:'collective, accumulated, combined',antonyms:'individual, separate',essay:'The cumulative impact of weak institutions can undermine development.'}]},
 {title:'Tick, tick ... boom',category:'Dawn · Opinion',url:'https://www.dawn.com/news/2021794',summary:'Read the original Dawn piece and practise identifying its central argument, tone and evidence.',words:[
  {word:'Prevailing',urdu:'رائج / غالب',synonyms:'existing, current, widespread',antonyms:'uncommon, absent',essay:'Prevailing economic conditions demand practical policy responses.'},
  {word:'Oppressive',urdu:'ظالمانہ / جابرانہ',synonyms:'tyrannical, harsh, repressive',antonyms:'liberal, tolerant, just',essay:'Oppressive policies can deepen public resentment.'},
  {word:'Backfire',urdu:'الٹا اثر کرنا',synonyms:'rebound, misfire, boomerang',antonyms:'succeed, work, achieve',essay:'A poorly designed restriction may backfire and intensify resistance.'}]}
];
function openUrl(url:string){if(!url){Alert.alert('Source not added yet','This source link will be added after verification.');return;}Linking.openURL(url).catch(()=>Alert.alert('Unable to open link','Please check your internet connection.'));}
function Header({title,subtitle}:{title:string;subtitle?:string}){return <View style={styles.header}><Text style={styles.brand}>PAK-PREP</Text><Text style={styles.headerTitle}>{title}</Text>{subtitle?<Text style={styles.headerSub}>{subtitle}</Text>:null}</View>;}
function Action({label,onPress,secondary=false}:{label:string;onPress:()=>void;secondary?:boolean}){return <Pressable onPress={onPress} style={[styles.action,secondary&&styles.actionSecondary]}><Text style={[styles.actionText,secondary&&styles.actionTextSecondary]}>{label}</Text></Pressable>;}
function Card({children}:{children:React.ReactNode}){return <View style={styles.card}>{children}</View>;}
export default function App(){
 const [tab,setTab]=useState<Tab>('Home'),[region,setRegion]=useState<Region>('All Pakistan'),[search,setSearch]=useState(''),[minBps,setMinBps]=useState(5),[expandedArticle,setExpandedArticle]=useState(0);
 const visibleRecruiters=useMemo(()=>recruiters.filter(r=>(region==='All Pakistan'||r.region===region||r.region==='All Pakistan')&&(r.name+' '+r.kind).toLowerCase().includes(search.toLowerCase())),[region,search]);
 const visibleFamilies=useMemo(()=>jobFamilies.filter(j=>(j.name+' '+j.posts).toLowerCase().includes(search.toLowerCase())),[search]);
 const Home=()=><><Header title="Pakistan-wide preparation" subtitle="Government jobs · BPS-5 to BPS-22 · All regions"/><View style={styles.content}>
  <View style={styles.hero}><Text style={styles.heroEyebrow}>PAK-PREP · NATIONAL JOB DIRECTORY</Text><Text style={styles.heroTitle}>One platform for government job past papers.</Text><Text style={styles.heroText}>Federal, provincial, AJK and Gilgit-Baltistan recruitment — organized by recruiting body, post and BPS.</Text></View>
  <Text style={styles.sectionTitle}>Study modules</Text><View style={styles.tiles}>{(['Past Papers','Subjects','Dawn English'] as Tab[]).map((t,i)=><Pressable key={t} onPress={()=>setTab(t)} style={styles.tile}><Text style={styles.tileIcon}>{['📚','🧠','📰'][i]}</Text><Text style={styles.tileTitle}>{t}</Text><Text style={styles.tileSub}>{['Job-wise papers · BPS 5+','Topic-wise MCQs','Articles + Urdu vocabulary'][i]}</Text></Pressable>)}</View>
  <Text style={styles.sectionTitle}>Browse by region</Text>{regions.map(r=><Pressable key={r} style={styles.rowCard} onPress={()=>{setRegion(r);setTab('Past Papers');setSearch('');}}><View><Text style={styles.rowTitle}>{r}</Text><Text style={styles.muted}>Recruiting bodies and job-wise paper index</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}
  <Text style={styles.note}>The directory is designed for BPS-5 through BPS-22. A listed category is an index, not a claim that every historical paper has already been collected or verified.</Text>
 </View></>;
 const Papers=()=><><Header title="Pakistan Past Papers" subtitle="Select region, recruiter and exact post. BPS-5 to BPS-22."/><View style={styles.content}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:12}}>{regions.map(r=><Pressable key={r} onPress={()=>setRegion(r)} style={[styles.chip,region===r&&styles.chipActive]}><Text style={[styles.chipText,region===r&&styles.chipTextActive]}>{r}</Text></Pressable>)}</ScrollView>
  <TextInput value={search} onChangeText={setSearch} placeholder="Search commission, department or post..." placeholderTextColor="#89948D" style={styles.search}/>
  <Text style={styles.sectionTitle}>Recruiting bodies</Text>{visibleRecruiters.map(r=><Card key={r.name}><Text style={styles.rowTitle}>{r.name}</Text><Text style={styles.muted}>{r.kind} · {r.region}</Text><Action label="Open official recruitment source ↗" onPress={()=>openUrl(r.url)} secondary/></Card>)}
  <Text style={styles.sectionTitle}>Job-wise past-paper categories</Text><Text style={styles.muted}>Each post must have its own paper records. These are job-family indexes; exact paper records are added only after source verification.</Text>
  {visibleFamilies.map(j=><Card key={j.name}><Text style={styles.rowTitle}>{j.name}</Text><Text style={styles.muted}>Typical scale range: BPS {j.bps}</Text><Text style={styles.familyPosts}>{j.posts}</Text><Action label="Open job-family index" onPress={()=>Alert.alert(j.name,'This category is ready for individual post records. Add only verified past papers, answer keys and source details here.')} secondary/></Card>)}
  <Text style={styles.note}>Past-paper records should include recruiter, department, exact post title, BPS, year, exam date, paper file/link, answer key and source provenance. No paper is marked available until verified.</Text>
 </View></>;
 const Subjects=()=><><Header title="Subject MCQs" subtitle="Independent subject practice, separate from job past papers"/><View style={styles.content}><TextInput value={search} onChangeText={setSearch} placeholder="Search subjects..." placeholderTextColor="#89948D" style={styles.search}/>{subjects.filter(s=>s[0].toLowerCase().includes(search.toLowerCase())).map(s=><Pressable key={s[0]} style={styles.rowCard} onPress={()=>Alert.alert(s[0],'This subject section is ready for authorized MCQ import, answers and explanations.')}><View style={{flex:1}}><Text style={styles.rowTitle}>{s[0]}</Text><Text style={styles.muted}>{s[1]}</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}</View></>;
 const Dawn=()=><><Header title="Dawn English" subtitle="Original Dawn articles + independent vocabulary notes"/><View style={styles.content}><View style={styles.info}><Text style={styles.infoTitle}>Editorial study routine</Text><Text style={styles.infoText}>Open the article at Dawn. Learn key words with Urdu meanings, synonyms, antonyms and original essay sentences. Article text itself is not republished.</Text></View>{articles.map((a,i)=><Card key={a.title}><Text style={styles.jobNo}>{a.category.toUpperCase()}</Text><Text style={styles.articleTitle}>{a.title}</Text><Text style={styles.muted}>{a.summary}</Text><Action label="Read original on Dawn ↗" onPress={()=>openUrl(a.url)}/><Action secondary label={expandedArticle===i?'Hide vocabulary':'Show vocabulary'} onPress={()=>setExpandedArticle(expandedArticle===i?-1:i)}/>{expandedArticle===i&&a.words.map(w=><View key={w.word} style={styles.word}><Text style={styles.wordTitle}>{w.word}</Text><Text style={styles.wordLine}>Urdu: {w.urdu}</Text><Text style={styles.wordLine}>Synonyms: {w.synonyms}</Text><Text style={styles.wordLine}>Antonyms: {w.antonyms}</Text><Text style={styles.essay}>Essay use: {w.essay}</Text></View>)}</Card>)}<Text style={styles.note}>Add article links after editorial verification. Vocabulary and example sentences are original study notes.</Text></View></>;
 return <SafeAreaView style={styles.safe}><StatusBar barStyle="light-content" backgroundColor={GREEN}/><View style={styles.body}><ScrollView keyboardShouldPersistTaps="handled">{tab==='Home'?<Home/>:tab==='Past Papers'?<Papers/>:tab==='Subjects'?<Subjects/>:<Dawn/>}</ScrollView></View><View style={styles.nav}>{(['Home','Past Papers','Subjects','Dawn English'] as Tab[]).map((t,i)=><Pressable key={t} onPress={()=>{setTab(t);setSearch('');}} style={styles.navItem}><Text style={[styles.navIcon,tab===t&&styles.navSelected]}>{['⌂','▤','▦','文'][i]}</Text><Text style={[styles.navLabel,tab===t&&styles.navSelected]}>{t}</Text></Pressable>)}</View></SafeAreaView>;
}
const styles=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#F6F8F6'},body:{flex:1},header:{backgroundColor:GREEN,paddingHorizontal:22,paddingTop:20,paddingBottom:25,borderBottomLeftRadius:24,borderBottomRightRadius:24},brand:{color:'#BFE6CD',fontSize:13,fontWeight:'900',letterSpacing:2,marginBottom:16},headerTitle:{color:'#FFF',fontSize:27,fontWeight:'800'},headerSub:{color:'#D8EBDD',fontSize:13,marginTop:6},content:{padding:16,paddingBottom:28},
 hero:{backgroundColor:'#08733D',borderRadius:22,padding:20,marginBottom:24},heroEyebrow:{color:'#BDE6CE',fontSize:11,fontWeight:'800',letterSpacing:1.2},heroTitle:{color:'#FFF',fontSize:24,fontWeight:'800',lineHeight:30,marginTop:10},heroText:{color:'#E4F3E9',fontSize:14,lineHeight:21,marginTop:9},sectionTitle:{fontSize:18,fontWeight:'800',color:ink,marginBottom:12,marginTop:12},
 tiles:{flexDirection:'row',flexWrap:'wrap',gap:12,marginBottom:18},tile:{width:'48%',backgroundColor:'#FFF',borderRadius:18,padding:16,minHeight:132,borderWidth:1,borderColor:'#E5ECE7',elevation:2},tileIcon:{fontSize:27},tileTitle:{fontSize:16,fontWeight:'800',color:GREEN,marginTop:12},tileSub:{fontSize:12,color:'#66736A',marginTop:5},
 rowCard:{backgroundColor:'#FFF',borderRadius:14,padding:16,marginBottom:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderWidth:1,borderColor:'#E7ECE8',elevation:1},rowTitle:{fontSize:16,fontWeight:'800',color:ink},muted:{color:'#68756D',fontSize:13,lineHeight:19,marginTop:4},chevron:{fontSize:28,color:GREEN,marginLeft:12},
 chip:{paddingHorizontal:13,paddingVertical:9,backgroundColor:'#E8EEE9',borderRadius:20,marginRight:7},chipActive:{backgroundColor:GREEN},chipText:{fontSize:12,color:'#405047',fontWeight:'700'},chipTextActive:{color:'#FFF'},search:{backgroundColor:'#FFF',borderRadius:13,paddingHorizontal:15,paddingVertical:13,fontSize:15,borderWidth:1,borderColor:'#DDE6DF',marginBottom:13,color:ink},
 card:{backgroundColor:'#FFF',borderRadius:17,padding:16,marginBottom:13,borderWidth:1,borderColor:'#E5ECE7',elevation:1},jobNo:{fontSize:10,fontWeight:'900',letterSpacing:1.2,color:'#18814A',marginBottom:8},action:{backgroundColor:GREEN,paddingVertical:12,paddingHorizontal:14,borderRadius:11,alignItems:'center',marginTop:12},actionSecondary:{backgroundColor:PALE,borderWidth:1,borderColor:'#C9E0D0'},actionText:{color:'#FFF',fontWeight:'800',fontSize:13},actionTextSecondary:{color:GREEN},note:{fontSize:11,color:'#77837B',lineHeight:17,marginTop:12},familyPosts:{fontSize:13,color:'#34443A',lineHeight:21,marginTop:8},
 info:{backgroundColor:'#E6F2EA',padding:16,borderRadius:15,marginBottom:14},infoTitle:{fontWeight:'800',color:GREEN,fontSize:16},infoText:{color:'#3D5747',fontSize:13,lineHeight:19,marginTop:6},articleTitle:{fontSize:20,fontWeight:'800',color:ink,marginBottom:7},word:{backgroundColor:'#F5F8F5',padding:12,borderRadius:12,marginTop:10},wordTitle:{fontWeight:'900',fontSize:16,color:GREEN},wordLine:{fontSize:12,color:'#34443A',marginTop:5,lineHeight:17},essay:{fontSize:12,color:'#5A4A24',fontStyle:'italic',marginTop:7,lineHeight:18},
 nav:{flexDirection:'row',backgroundColor:'#FFF',borderTopWidth:1,borderTopColor:'#E4EAE5',paddingTop:9,paddingBottom:8},navItem:{flex:1,alignItems:'center',gap:2},navIcon:{fontSize:22,color:'#849188'},navLabel:{fontSize:10,color:'#849188',fontWeight:'700'},navSelected:{color:GREEN,fontWeight:'900'}
});
