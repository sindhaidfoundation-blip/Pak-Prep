export const regions = [
  'Federal','Punjab','Sindh','Khyber Pakhtunkhwa','Balochistan','Azad Jammu & Kashmir','Gilgit-Baltistan'
] as const;
export type Region = typeof regions[number];
export const recruiters = [
 {name:'FPSC',region:'Federal',url:'https://www.fpsc.gov.pk/',type:'Public Service Commission'},
 {name:'National Jobs Portal',region:'Federal',url:'https://njp.gov.pk/',type:'Government job portal'},
 {name:'PPSC',region:'Punjab',url:'https://www.ppsc.gop.pk/',type:'Public Service Commission'},
 {name:'Punjab Departments',region:'Punjab',url:'https://punjab.gov.pk/',type:'Departmental recruitment'},
 {name:'SPSC',region:'Sindh',url:'https://www.spsc.gov.pk/',type:'Public Service Commission'},
 {name:'STS',region:'Sindh',url:'https://www.sts.net.pk/',type:'Testing service'},
 {name:'KPPSC',region:'Khyber Pakhtunkhwa',url:'https://www.kppsc.gov.pk/',type:'Public Service Commission'},
 {name:'ETEA',region:'Khyber Pakhtunkhwa',url:'https://etea.edu.pk/',type:'Testing service'},
 {name:'BPSC',region:'Balochistan',url:'https://www.bpsc.gob.pk/',type:'Public Service Commission'},
 {name:'AJKPSC',region:'Azad Jammu & Kashmir',url:'https://ajkpsc.gov.pk/',type:'Public Service Commission'},
 {name:'NTS',region:'Federal',url:'https://www.nts.org.pk/',type:'Testing service'},
 {name:'PTS',region:'Federal',url:'https://pts.org.pk/',type:'Testing service'},
 {name:'OTS',region:'Federal',url:'https://ots.org.pk/',type:'Testing service'}
] as const;
export const jobFamilies = [
 {id:'clerical',name:'Clerical & Office',posts:['Junior Clerk','Senior Clerk','Assistant','Stenotypist','Data Entry Operator','Office Assistant'],bps:'5–16'},
 {id:'police',name:'Police & Law Enforcement',posts:['Constable','Head Constable','ASI','Sub-Inspector','Inspector','Investigation Officer','Traffic Warden','Prison Warder'],bps:'5–17'},
 {id:'education',name:'Teaching & Education',posts:['Primary School Teacher','EST','SST','Lecturer','Subject Specialist','Head Teacher','Education Officer','Librarian'],bps:'9–19'},
 {id:'health',name:'Health & Medical',posts:['Health Technician','Dispenser','Nurse','Medical Officer','Women Medical Officer','Specialist','Lab Technician','Pharmacist'],bps:'5–20'},
 {id:'engineering',name:'Engineering & Technical',posts:['Sub Engineer','Assistant Engineer','Executive Engineer','Surveyor','Technical Assistant','Draftsman'],bps:'5–19'},
 {id:'it',name:'IT & Computing',posts:['Computer Operator','IT Assistant','Programmer','Network Administrator','System Analyst','Database Administrator'],bps:'5–19'},
 {id:'accounts',name:'Accounts, Audit & Finance',posts:['Junior Auditor','Auditor','Accountant','Accounts Officer','Finance Officer','Treasury Officer'],bps:'5–19'},
 {id:'revenue',name:'Revenue & Land Administration',posts:['Patwari','Naib Tehsildar','Tehsildar','Revenue Officer','Land Record Assistant'],bps:'5–17'},
 {id:'agriculture',name:'Agriculture & Environment',posts:['Field Assistant','Agriculture Officer','Inspector','Research Officer','Forest Guard','Range Forest Officer','Veterinary Officer'],bps:'5–19'},
 {id:'judiciary',name:'Judiciary & Court Staff',posts:['Process Server','Reader','Stenographer','Court Assistant','Court Officer','Civil Judge'],bps:'5–21'},
 {id:'admin',name:'Management & Administration',posts:['Assistant Director','Deputy Director','Admin Officer','Project Officer','Section Officer','Deputy Secretary'],bps:'16–22'},
 {id:'taxation',name:'Taxation, Customs & Excise',posts:['Inland Revenue Inspector','Customs Inspector','Preventive Officer','Appraising Officer','Excise Inspector'],bps:'11–17'},
 {id:'transport',name:'Transport & Infrastructure',posts:['Transport Inspector','Motor Vehicle Examiner','Road Inspector','Planning Officer'],bps:'5–19'},
 {id:'irrigation',name:'Irrigation, Water & Power',posts:['Canal Patwari','Sub Engineer','Assistant Engineer','Research Officer','Line Superintendent'],bps:'5–19'},
 {id:'social',name:'Social Welfare & Community Services',posts:['Social Welfare Officer','Women Development Officer','Child Protection Officer','Population Welfare Officer'],bps:'11–19'},
 {id:'legal',name:'Legal & Prosecution',posts:['Law Officer','Assistant District Public Prosecutor','Prosecutor','Legal Inspector'],bps:'16–20'},
 {id:'competitive',name:'Competitive Examinations',posts:['CSS','PMS','CCE','Combined Competitive Examination'],bps:'17–22'}
] as const;

export const subjects = [
 'English','General Knowledge','Pakistan Studies / Pak Affairs','Islamic Studies','Everyday Science','Mathematics','Computer Science','Current Affairs','Urdu','Sindhi','Pedagogy','Analytical Reasoning','Geography'
] as const;
