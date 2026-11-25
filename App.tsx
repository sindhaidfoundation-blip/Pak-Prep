import React, { useMemo, useState } from 'react';
import { StatusBar, SafeAreaView, ScrollView, View, Text, Pressable, TextInput, StyleSheet, Linking, Alert } from 'react-native';

type Tab = 'Home' | 'Past Papers' | 'Subjects' | 'Dawn English';
const GREEN = '#075B32';
const PALE = '#EAF4EE';
const ink = '#17231C';

const paperSources = {
  FPSC: 'https://testpointpk.com/past-papers-mcqs/fpsc-past-papers',
  PPSC: 'https://testpointpk.com/past-papers-mcqs/ppsc-past-papers',
  SPSC: 'https://testpointpk.com/past-papers-mcqs/spsc-past-papers',
};
const jobs = [
  { board: 'FPSC', title: 'Vice Principal', detail: 'Past paper · 12 May 2026', url: paperSources.FPSC },
  { board: 'FPSC', title: 'Senior Elementary Teacher – Chemistry', detail: 'Past papers collection', url: paperSources.FPSC },
  { board: 'FPSC', title: 'ASF Inspector', detail: 'Past papers collection', url: paperSources.FPSC },
  { board: 'FPSC', title: 'ASF Assistant Director', detail: 'Past paper · 9 May 2026', url: paperSources.FPSC },
  { board: 'FPSC', title: 'CSS MPT', detail: 'Past papers collection', url: paperSources.FPSC },
  { board: 'FPSC', title: 'Inspector Customs / Intelligence Officer', detail: 'Past papers collection', url: paperSources.FPSC },
  { board: 'PPSC', title: 'Junior Clerk', detail: 'Past papers and solved papers', url: paperSources.PPSC },
  { board: 'PPSC', title: 'Assistant', detail: 'Past papers collection', url: paperSources.PPSC },
  { board: 'PPSC', title: 'Sub Engineer – Civil', detail: 'Past papers collection', url: paperSources.PPSC },
  { board: 'PPSC', title: 'Lecturer – English', detail: 'Past papers collection', url: paperSources.PPSC },
  { board: 'SPSC', title: 'CCE / Combined Competitive Exam', detail: 'Past papers collection', url: paperSources.SPSC },
  { board: 'SPSC', title: 'Assistant Sub-Inspector', detail: 'Past papers collection', url: paperSources.SPSC },
  { board: 'SPSC', title: 'Subject Specialist / Lecturer', detail: 'Past papers collection', url: paperSources.SPSC },
];
const subjects = [
  ['English', 'Grammar, vocabulary, synonyms, antonyms'],
  ['General Knowledge', 'Pakistan and world GK'],
  ['Pakistan Studies', 'History, constitution and geography'],
  ['Islamic Studies', 'Seerat, Quran, Hadith and Islamic history'],
  ['Everyday Science', 'Basic science and daily applications'],
  ['Computer', 'IT fundamentals and office applications'],
  ['Mathematics', 'Arithmetic, algebra and analytical skills'],
  ['Current Affairs', 'Pakistan and international developments'],
  ['Urdu', 'Grammar, literature and vocabulary'],
  ['Pedagogy', 'Teaching methods and education'],
];
const articles = [
  {
    title: 'Governance failures',
    category: 'Dawn · Opinion / Editorial',
    url: 'https://www.dawn.com/news/2021796',
    summary: 'Study the article on governance challenges. Read the original article on Dawn, then use the vocabulary notes below for comprehension and essay writing.',
    words: [
      { word: 'Governance', urdu: 'طرزِ حکمرانی / نظامِ حکومت', synonyms: 'administration, management, leadership', antonyms: 'misrule, disorder', essay: 'Effective governance is essential for institutional stability.' },
      { word: 'Failure', urdu: 'ناکامی', synonyms: 'breakdown, collapse, defeat', antonyms: 'success, achievement', essay: 'Policy failure often reflects weak implementation.' },
      { word: 'Accountability', urdu: 'جوابدہی', synonyms: 'responsibility, answerability', antonyms: 'irresponsibility, impunity', essay: 'Public accountability strengthens trust in institutions.' },
    ],
  },
  {
    title: 'Tick, tick ... boom',
    category: 'Dawn · Opinion',
    url: 'https://www.dawn.com/news/2021794',
    summary: 'Read the original Dawn piece and practise identifying its central argument, tone and supporting evidence.',
    words: [
      { word: 'Imminent', urdu: 'قریب الوقوع', synonyms: 'approaching, impending, near', antonyms: 'distant, remote', essay: 'The country faces an imminent need for structural reform.' },
      { word: 'Escalate', urdu: 'شدت اختیار کرنا / بڑھ جانا', synonyms: 'intensify, heighten, increase', antonyms: 'decrease, subside', essay: 'Unresolved disputes can escalate into wider crises.' },
      { word: 'Urgency', urdu: 'فوری ضرورت / عجلت', synonyms: 'pressing need, importance, haste', antonyms: 'delay, indifference', essay: 'The urgency of reform cannot be ignored.' },
    ],
  },
];

function openUrl(url: string) {
  Linking.openURL(url).catch(() => Alert.alert('Unable to open link', 'Please check your internet connection.'));
}
function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return <View style={styles.header}><Text style={styles.brand}>PAK-PREP</Text><Text style={styles.headerTitle}>{title}</Text>{subtitle ? <Text style={styles.headerSub}>{subtitle}</Text> : null}</View>;
}
function Action({ label, onPress, secondary=false }: { label: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable onPress={onPress} style={[styles.action, secondary && styles.actionSecondary]}><Text style={[styles.actionText, secondary && styles.actionTextSecondary]}>{label}</Text></Pressable>;
}
function Card({ children }: { children: React.ReactNode }) { return <View style={styles.card}>{children}</View>; }

export default function App() {
  const [tab, setTab] = useState<Tab>('Home');
  const [board, setBoard] = useState<'FPSC'|'PPSC'|'SPSC'>('FPSC');
  const [search, setSearch] = useState('');
  const [expandedArticle, setExpandedArticle] = useState(0);
  const filteredJobs = useMemo(() => jobs.filter(j => j.board === board && j.title.toLowerCase().includes(search.toLowerCase())), [board, search]);

  const Home = () => <><Header title="Welcome back" subtitle="Your competitive exam preparation hub" />
    <View style={styles.content}>
      <View style={styles.hero}><Text style={styles.heroEyebrow}>PREPARE SMARTER</Text><Text style={styles.heroTitle}>One app. Three commissions. Your next success.</Text><Text style={styles.heroText}>Past papers, subject practice and Dawn-based English learning.</Text></View>
      <Text style={styles.sectionTitle}>Study modules</Text>
      <View style={styles.tiles}>
        {(['Past Papers','Subjects','Dawn English'] as Tab[]).map((t, i) => <Pressable key={t} onPress={() => setTab(t)} style={styles.tile}><Text style={styles.tileIcon}>{['📚','🧠','📰'][i]}</Text><Text style={styles.tileTitle}>{t}</Text><Text style={styles.tileSub}>{['Job-wise papers only','Topic-wise MCQs','Articles + Urdu vocabulary'][i]}</Text></Pressable>)}
      </View>
      <Text style={styles.sectionTitle}>Quick access</Text>
      {(['FPSC','PPSC','SPSC'] as const).map(b => <Pressable key={b} style={styles.rowCard} onPress={() => {setBoard(b); setTab('Past Papers');}}><View><Text style={styles.rowTitle}>{b} past papers</Text><Text style={styles.muted}>Browse job-wise paper collections</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}
      <Text style={styles.note}>Source links open the original TestPoint.pk or Dawn pages. Imported full question banks are not included unless licensed or supplied with permission.</Text>
    </View></>;

  const Papers = () => <><Header title="Past Papers" subtitle="Each job has its own paper section — no general notes here." />
    <View style={styles.content}>
      <View style={styles.segment}>{(['FPSC','PPSC','SPSC'] as const).map(b => <Pressable key={b} onPress={() => {setBoard(b);setSearch('');}} style={[styles.segmentBtn, board===b && styles.segmentActive]}><Text style={[styles.segmentText,board===b && styles.segmentTextActive]}>{b}</Text></Pressable>)}</View>
      <TextInput value={search} onChangeText={setSearch} placeholder="Search job / post title..." placeholderTextColor="#89948D" style={styles.search} />
      <Text style={styles.count}>{filteredJobs.length} job sections</Text>
      {filteredJobs.map((j, i) => <Card key={j.title}><Text style={styles.jobNo}>PAST PAPER SECTION {String(i+1).padStart(2,'0')}</Text><Text style={styles.rowTitle}>{j.title}</Text><Text style={styles.muted}>{j.detail}</Text><Action label="Open past papers ↗" onPress={() => openUrl(j.url)} /></Card>)}
      <Action secondary label={'Open all '+board+' papers on TestPoint ↗'} onPress={() => openUrl(paperSources[board])} />
      <Text style={styles.note}>Job titles are starter index entries. The linked source contains the full paper listings; individual paper records can be added to Pak-Prep after authorized import.</Text>
    </View></>;

  const Subjects = () => <><Header title="Subject MCQs" subtitle="Choose a subject to practise" /><View style={styles.content}>
    <TextInput value={search} onChangeText={setSearch} placeholder="Search subjects..." placeholderTextColor="#89948D" style={styles.search} />
    {subjects.filter(s => s[0].toLowerCase().includes(search.toLowerCase())).map((s,i) => <Pressable key={s[0]} style={styles.rowCard} onPress={() => Alert.alert(s[0], 'Subject section ready for authorized question-bank import. Add topic-wise MCQs, answers and explanations here.')}><View style={{flex:1}}><Text style={styles.rowTitle}>{s[0]}</Text><Text style={styles.muted}>{s[1]}</Text></View><Text style={styles.chevron}>›</Text></Pressable>)}
    <Text style={styles.note}>Subject categories are based on the categories visible on TestPoint.pk. This starter app does not copy its complete MCQ database.</Text>
  </View></>;

  const Dawn = () => <><Header title="Dawn English" subtitle="Read the article at Dawn; learn vocabulary here." /><View style={styles.content}>
    <View style={styles.info}><Text style={styles.infoTitle}>Daily editorial study</Text><Text style={styles.infoText}>Read the original article, write a short summary, then revise Urdu meanings, synonyms, antonyms and essay-ready sentences.</Text></View>
    {articles.map((a,i) => <Card key={a.title}><Text style={styles.jobNo}>{a.category.toUpperCase()}</Text><Text style={styles.articleTitle}>{a.title}</Text><Text style={styles.muted}>{a.summary}</Text><Action label="Read original on Dawn ↗" onPress={() => openUrl(a.url)} /><Action secondary label={expandedArticle===i ? 'Hide vocabulary' : 'Show vocabulary'} onPress={() => setExpandedArticle(expandedArticle===i ? -1 : i)} />
      {expandedArticle===i && a.words.map(w => <View key={w.word} style={styles.word}><Text style={styles.wordTitle}>{w.word}</Text><Text style={styles.wordLine}>Urdu: {w.urdu}</Text><Text style={styles.wordLine}>Synonyms: {w.synonyms}</Text><Text style={styles.wordLine}>Antonyms: {w.antonyms}</Text><Text style={styles.essay}>Essay use: {w.essay}</Text></View>)}
    </Card>)}
    <Text style={styles.note}>Article titles and links point to Dawn. Vocabulary and example sentences are original study notes, not copied article text. Add new articles through an authorized feed or editor-curated links.</Text>
  </View></>;

  return <SafeAreaView style={styles.safe}><StatusBar barStyle="light-content" backgroundColor={GREEN} />
    <View style={styles.body}><ScrollView keyboardShouldPersistTaps="handled">{tab==='Home' ? <Home/> : tab==='Past Papers' ? <Papers/> : tab==='Subjects' ? <Subjects/> : <Dawn/>}</ScrollView></View>
    <View style={styles.nav}>{(['Home','Past Papers','Subjects','Dawn English'] as Tab[]).map((t,i)=><Pressable key={t} onPress={()=>{setTab(t);setSearch('');}} style={styles.navItem}><Text style={[styles.navIcon,tab===t&&styles.navSelected]}>{['⌂','▤','▦','文'][i]}</Text><Text style={[styles.navLabel,tab===t&&styles.navSelected]}>{t}</Text></Pressable>)}</View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F6F8F6'}, body:{flex:1}, header:{backgroundColor:GREEN,paddingHorizontal:22,paddingTop:20,paddingBottom:25,borderBottomLeftRadius:24,borderBottomRightRadius:24},
  brand:{color:'#BFE6CD',fontSize:13,fontWeight:'900',letterSpacing:2,marginBottom:16},headerTitle:{color:'#FFF',fontSize:28,fontWeight:'800'},headerSub:{color:'#D8EBDD',fontSize:13,marginTop:6},
  content:{padding:16,paddingBottom:28},hero:{backgroundColor:'#08733D',borderRadius:22,padding:20,marginBottom:24},heroEyebrow:{color:'#BDE6CE',fontSize:11,fontWeight:'800',letterSpacing:1.5},heroTitle:{color:'#FFF',fontSize:25,fontWeight:'800',lineHeight:31,marginTop:10},heroText:{color:'#E4F3E9',fontSize:14,lineHeight:21,marginTop:9},
  sectionTitle:{fontSize:19,fontWeight:'800',color:ink,marginBottom:12,marginTop:6},tiles:{flexDirection:'row',flexWrap:'wrap',gap:12,marginBottom:24},tile:{width:'48%',backgroundColor:'#FFF',borderRadius:18,padding:16,minHeight:135,borderWidth:1,borderColor:'#E5ECE7',elevation:2},tileIcon:{fontSize:27},tileTitle:{fontSize:16,fontWeight:'800',color:GREEN,marginTop:12},tileSub:{fontSize:12,color:'#66736A',marginTop:5},
  rowCard:{backgroundColor:'#FFF',borderRadius:14,padding:16,marginBottom:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderWidth:1,borderColor:'#E7ECE8',elevation:1},rowTitle:{fontSize:16,fontWeight:'800',color:ink},muted:{color:'#68756D',fontSize:13,lineHeight:19,marginTop:4},chevron:{fontSize:28,color:GREEN,marginLeft:12},
  segment:{flexDirection:'row',backgroundColor:'#E4ECE6',borderRadius:14,padding:4,marginBottom:14},segmentBtn:{flex:1,paddingVertical:11,alignItems:'center',borderRadius:11},segmentActive:{backgroundColor:GREEN},segmentText:{fontWeight:'800',color:'#526158'},segmentTextActive:{color:'#FFF'},
  search:{backgroundColor:'#FFF',borderRadius:13,paddingHorizontal:15,paddingVertical:13,fontSize:15,borderWidth:1,borderColor:'#DDE6DF',marginBottom:13,color:ink},count:{fontSize:12,color:'#6B786F',fontWeight:'700',marginBottom:10},
  card:{backgroundColor:'#FFF',borderRadius:17,padding:16,marginBottom:13,borderWidth:1,borderColor:'#E5ECE7',elevation:1},jobNo:{fontSize:10,fontWeight:'900',letterSpacing:1.2,color:'#18814A',marginBottom:8},action:{backgroundColor:GREEN,paddingVertical:12,paddingHorizontal:14,borderRadius:11,alignItems:'center',marginTop:12},actionSecondary:{backgroundColor:PALE,borderWidth:1,borderColor:'#C9E0D0'},actionText:{color:'#FFF',fontWeight:'800',fontSize:13},actionTextSecondary:{color:GREEN},note:{fontSize:11,color:'#77837B',lineHeight:17,marginTop:12},
  info:{backgroundColor:'#E6F2EA',padding:16,borderRadius:15,marginBottom:14},infoTitle:{fontWeight:'800',color:GREEN,fontSize:16},infoText:{color:'#3D5747',fontSize:13,lineHeight:19,marginTop:6},articleTitle:{fontSize:20,fontWeight:'800',color:ink,marginBottom:7},word:{backgroundColor:'#F5F8F5',padding:12,borderRadius:12,marginTop:10},wordTitle:{fontWeight:'900',fontSize:16,color:GREEN},wordLine:{fontSize:12,color:'#34443A',marginTop:5,lineHeight:17},essay:{fontSize:12,color:'#5A4A24',fontStyle:'italic',marginTop:7,lineHeight:18},
  nav:{flexDirection:'row',backgroundColor:'#FFF',borderTopWidth:1,borderTopColor:'#E4EAE5',paddingTop:9,paddingBottom:8},navItem:{flex:1,alignItems:'center',gap:2},navIcon:{fontSize:22,color:'#849188'},navLabel:{fontSize:10,color:'#849188',fontWeight:'700'},navSelected:{color:GREEN,fontWeight:'900'}
});
