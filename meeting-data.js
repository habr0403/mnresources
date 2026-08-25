window.RECOVERY_RESOURCES = [
  {
    id: 'aa', name: 'Alcoholics Anonymous', abbreviation: 'AA',
    concerns: ['Alcohol'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Statewide', 'Twin Cities', 'Greater Minnesota'],
    summary: 'Peer-led 12-Step fellowship for people who want to stop drinking. Minnesota has statewide, Minneapolis-area, and Saint Paul-area official meeting directories.',
    fit: 'Best known for a large meeting network, sponsorship, step work, speaker meetings, discussion groups, Big Book studies, and many identity-specific formats.',
    spirituality: 'Spiritual but not affiliated with a specific religion; individual groups vary in tone.',
    localStatus: 'Strong Minnesota in-person network',
    url: 'https://aaminnesota.org/meetings/', sourceLabel: 'AA Minnesota (Areas 35 & 36)'
  },
  {
    id: 'na', name: 'Narcotics Anonymous', abbreviation: 'NA',
    concerns: ['Any drug / polysubstance', 'Opioids / heroin / fentanyl', 'Stimulants / meth', 'Cocaine / crack', 'Cannabis'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Statewide', 'Twin Cities', 'Greater Minnesota'],
    summary: 'Peer-led 12-Step fellowship for people for whom drugs have become a major problem. NA is substance-inclusive rather than drug-specific.',
    fit: 'Useful when a person identifies with addiction broadly, uses multiple substances, or wants a large statewide peer network.',
    spirituality: 'Spiritual, not religious; higher-power language is interpreted personally.',
    localStatus: 'Strong Minnesota in-person network',
    url: 'https://naminnesota.org/find-a-meeting/', sourceLabel: 'Minnesota Region of NA'
  },
  {
    id: 'ca', name: 'Cocaine Anonymous Minnesota', abbreviation: 'CA',
    concerns: ['Cocaine / crack', 'Stimulants / meth', 'Any drug / polysubstance'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Statewide / locator'],
    summary: '12-Step fellowship with a Minnesota-specific resource site serving the Minneapolis–Saint Paul region. Despite the name, CA welcomes people recovering from alcohol and other mind-altering substances as well.',
    fit: 'A good option for people who relate strongly to cocaine/crack or stimulant culture but want a traditional 12-Step format.',
    spirituality: 'Spiritual, non-denominational 12-Step framework.',
    localStatus: 'Minnesota-specific meetings available',
    url: 'https://www.caminnesota.org/', sourceLabel: 'Cocaine Anonymous Minnesota'
  },
  {
    id: 'cma', name: 'Crystal Meth Anonymous', abbreviation: 'CMA',
    concerns: ['Stimulants / meth'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Central Minnesota', 'Online'],
    summary: '12-Step fellowship focused on recovery from crystal methamphetamine. The official CMA meeting directory lists Minnesota meetings including Twin Cities-area options.',
    fit: 'Useful for people who want peers who understand meth-specific triggers, recovery challenges, and culture.',
    spirituality: 'Spiritual 12-Step approach.',
    localStatus: 'Confirmed Minnesota meetings in official locator',
    url: 'https://www.crystalmeth.org/meetings/', sourceLabel: 'Crystal Meth Anonymous'
  },
  {
    id: 'ma', name: 'Marijuana Anonymous', abbreviation: 'MA',
    concerns: ['Cannabis'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Online'],
    summary: '12-Step recovery fellowship for cannabis dependence and marijuana addiction. Official listings include Minnesota meetings and many virtual options.',
    fit: 'For people who want cannabis-specific identification rather than a general drug meeting.',
    spirituality: '12-Step program with room for all beliefs or none.',
    localStatus: 'Confirmed Minnesota meetings plus extensive online access',
    url: 'https://marijuana-anonymous.org/find-a-meeting/', sourceLabel: 'Marijuana Anonymous World Services'
  },
  {
    id: 'ha', name: 'Heroin Anonymous', abbreviation: 'HA',
    concerns: ['Opioids / heroin / fentanyl'], pathway: ['12-Step / Spiritual'], access: ['Minnesota / locator', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Statewide / locator', 'Online'],
    summary: '12-Step fellowship specifically centered on heroin and opioid addiction. Minnesota availability is smaller than NA, so the official locator should be checked before travel.',
    fit: 'Can offer strong identification for people whose primary addiction has been heroin or closely related opioids.',
    spirituality: 'Traditional 12-Step framework.',
    localStatus: 'Limited; verify current Minnesota listing',
    url: 'https://heroinanonymous.org/meetings/', sourceLabel: 'Heroin Anonymous World Services'
  },
  {
    id: 'mara', name: 'Medication-Assisted Recovery Anonymous', abbreviation: 'MARA',
    concerns: ['Opioids / heroin / fentanyl', 'Any drug / polysubstance'], pathway: ['12-Step / Spiritual', 'Medication-friendly'], access: ['Minnesota online', 'Online accessible'], audience: ['Person in recovery'],
    region: ['Statewide online'],
    summary: 'Recovery fellowship created specifically to support people using medication as part of recovery. Minnesota currently has an official online meeting listing.',
    fit: 'Especially useful for people taking buprenorphine, methadone, naltrexone, or other recovery medications who want a judgment-free peer setting.',
    spirituality: 'Structured recovery fellowship; explicitly medication-supportive.',
    localStatus: 'Minnesota online meeting confirmed',
    url: 'https://www.mara-international.org/minnesota', sourceLabel: 'MARA International – Minnesota'
  },
  {
    id: 'smart', name: 'SMART Recovery', abbreviation: 'SMART',
    concerns: ['Alcohol', 'Any drug / polysubstance', 'Gambling', 'Nicotine / vaping', 'Food / compulsive eating', 'Internet / technology / gaming', 'Other compulsive behavior'], pathway: ['Secular / Evidence-informed'], access: ['Minnesota / locator', 'Online accessible'], audience: ['Person in recovery'],
    region: ['Statewide / locator', 'Online'],
    summary: 'Facilitator-guided mutual support using practical tools from cognitive-behavioral and motivational approaches. SMART supports many addictive and problem behaviors.',
    fit: 'Good for people seeking a secular, skills-based alternative or complement to 12-Step recovery.',
    spirituality: 'No spiritual or religious requirement.',
    localStatus: 'Minnesota meetings available; online network is extensive',
    url: 'https://smartrecovery.org/meeting', sourceLabel: 'SMART Recovery USA'
  },
  {
    id: 'mrc-all', name: 'Minnesota Recovery Connection – All Recovery', abbreviation: 'MRC',
    concerns: ['Alcohol', 'Any drug / polysubstance', 'Opioids / heroin / fentanyl', 'Gambling', 'Other compulsive behavior'], pathway: ['All pathways / Peer recovery'], access: ['Minnesota online', 'Online accessible'], audience: ['Person in recovery', 'Family / ally'],
    region: ['Statewide online'],
    summary: 'Minnesota-based peer meetings that intentionally welcome many recovery pathways, including 12-Step, medication-assisted recovery, harm reduction, SMART, and other approaches.',
    fit: 'Excellent when someone does not want to choose a single recovery philosophy or is still exploring what works.',
    spirituality: 'Pathway-neutral; no single belief system required.',
    localStatus: 'Minnesota organization; current meetings operate online',
    url: 'https://www.minnesotarecovery.org/all-recovery-meetings/', sourceLabel: 'Minnesota Recovery Connection'
  },
  {
    id: 'rd', name: 'Recovery Dharma Minnesota', abbreviation: 'RD',
    concerns: ['Alcohol', 'Any drug / polysubstance', 'Gambling', 'Food / compulsive eating', 'Sex / love / pornography', 'Internet / technology / gaming', 'Spending / debt', 'Other compulsive behavior'], pathway: ['Buddhist / Mindfulness'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Moorhead / West', 'Online'],
    summary: 'Peer-led recovery using Buddhist-inspired practices such as meditation, mindfulness, compassion, inquiry, and community. No meditation experience is required.',
    fit: 'Good for people drawn to meditation and a non-theistic spiritual path.',
    spirituality: 'Buddhist-inspired, non-theistic; belief in Buddhism is not required.',
    localStatus: 'Active Minnesota-specific meeting network',
    url: 'https://recoverydharmamn.org/', sourceLabel: 'Recovery Dharma Minnesota'
  },
  {
    id: 'refuge', name: 'Refuge Recovery', abbreviation: 'RR',
    concerns: ['Alcohol', 'Any drug / polysubstance', 'Gambling', 'Food / compulsive eating', 'Sex / love / pornography', 'Internet / technology / gaming', 'Spending / debt', 'Other compulsive behavior'], pathway: ['Buddhist / Mindfulness'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Online', 'Statewide / locator'],
    summary: 'Buddhist-oriented recovery community addressing substances and behavioral addictions through meditation, ethical practice, wisdom, and compassion.',
    fit: 'A mindfulness-centered alternative for people who want recovery without a higher-power requirement.',
    spirituality: 'Buddhist-based and non-theistic.',
    localStatus: 'Check current locator for Minnesota; online options available',
    url: 'https://www.refugerecovery.org/', sourceLabel: 'Refuge Recovery World Services'
  },
  {
    id: 'lifering', name: 'LifeRing Secular Recovery', abbreviation: 'LifeRing',
    concerns: ['Alcohol', 'Any drug / polysubstance'], pathway: ['Secular / Evidence-informed'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Online', 'Statewide / locator'],
    summary: 'Secular peer recovery organized around sobriety, secularity, and self-empowerment. Meetings often focus on current challenges and the week ahead.',
    fit: 'A strong fit for people who want abstinence-oriented mutual support without spiritual language.',
    spirituality: 'Explicitly secular.',
    localStatus: 'Online access is reliable; verify Minnesota in-person availability',
    url: 'https://lifering.org/meeting-menu/', sourceLabel: 'LifeRing Secular Recovery'
  },
  {
    id: 'wfs', name: 'Women for Sobriety', abbreviation: 'WFS',
    concerns: ['Alcohol', 'Any drug / polysubstance'], pathway: ['Secular / Evidence-informed'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Women'],
    region: ['Statewide / locator', 'Online'],
    summary: 'Women-centered recovery program based on the New Life Program and 13 Acceptance Statements, with peer connection and positive identity development.',
    fit: 'For women who want a recovery setting built specifically around women’s experiences and growth.',
    spirituality: 'Not a 12-Step program; no required religious belief.',
    localStatus: 'Nationwide/online access; Minnesota resource listing available',
    url: 'https://meetings.womenforsobriety.org/meetings/', sourceLabel: 'Women for Sobriety'
  },
  {
    id: 'celebrate', name: 'Celebrate Recovery', abbreviation: 'CR',
    concerns: ['Alcohol', 'Any drug / polysubstance', 'Gambling', 'Food / compulsive eating', 'Sex / love / pornography', 'Codependency / relationships', 'Other compulsive behavior'], pathway: ['Christian / Faith-based'], access: ['Minnesota / locator', 'Minnesota in-person'], audience: ['Person in recovery', 'Family / ally'],
    region: ['Statewide / locator', 'Greater Minnesota', 'Twin Cities'],
    summary: 'Christ-centered recovery ministry addressing “hurts, habits, and hang-ups,” including substance and behavioral addictions.',
    fit: 'Best for people who specifically want Christian faith integrated into recovery meetings and step work.',
    spirituality: 'Explicitly Christian.',
    localStatus: 'Minnesota groups listed through official locator',
    url: 'https://crlocator.com/', sourceLabel: 'Celebrate Recovery Group Finder'
  },
  {
    id: 'wellbriety', name: 'Wellbriety / White Bison', abbreviation: 'Wellbriety',
    concerns: ['Alcohol', 'Any drug / polysubstance', 'Other compulsive behavior'], pathway: ['Indigenous / Cultural', '12-Step / Spiritual'], access: ['Minnesota / locator', 'Online accessible'], audience: ['Person in recovery', 'Family / ally'],
    region: ['Twin Cities', 'Statewide / locator', 'Online'],
    summary: 'Culturally grounded recovery circles developed by White Bison, integrating Indigenous teachings, community, healing, and recovery principles.',
    fit: 'Especially meaningful for Native/Indigenous participants or anyone seeking a culturally rooted circle-based recovery approach where the group permits.',
    spirituality: 'Culturally and spiritually grounded in Indigenous traditions.',
    localStatus: 'Minnesota Wellbriety listings have been documented; verify current circle schedule',
    url: 'https://whitebison.org/circle-meetings/', sourceLabel: 'White Bison / Wellbriety'
  },
  {
    id: 'ga', name: 'Minnesota Gamblers Anonymous', abbreviation: 'GA',
    concerns: ['Gambling'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Duluth / Northland', 'Central Minnesota', 'Greater Minnesota'],
    summary: '12-Step fellowship for people with gambling problems. Minnesota has a dedicated meeting directory with in-person and phone/virtual options.',
    fit: 'Primary peer fellowship for sports betting, casino gambling, online gambling, lottery, cards, and other compulsive gambling.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Active Minnesota-specific meeting network',
    url: 'https://www.minnesotaga.com/find-a-meeting.html', sourceLabel: 'Minnesota Gamblers Anonymous'
  },
  {
    id: 'nicotine', name: 'Nicotine Anonymous', abbreviation: 'NicA',
    concerns: ['Nicotine / vaping'], pathway: ['12-Step / Spiritual'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Statewide / locator', 'Online'],
    summary: '12-Step fellowship for people seeking freedom from nicotine in cigarettes, vaping, chewing tobacco, nicotine pouches, and other forms.',
    fit: 'Provides addiction-focused peer support beyond standard quit-smoking education.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Official organization recognizes a Minnesota intergroup; verify current meeting details',
    url: 'https://nicotine-anonymous.org/find-a-meeting/', sourceLabel: 'Nicotine Anonymous'
  },
  {
    id: 'oa', name: 'Overeaters Anonymous – Minnesota / Unity Intergroup', abbreviation: 'OA',
    concerns: ['Food / compulsive eating'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Central / Southern Minnesota', 'Greater Minnesota'],
    summary: '12-Step fellowship for compulsive eating, bingeing, restricting, food obsession, and related eating behaviors. Minnesota’s Unity Intergroup supports local meetings.',
    fit: 'Broad food/eating recovery fellowship with many meeting styles and focus groups.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Minnesota-specific intergroup and meetings',
    url: 'https://overeaters.org/find-an-overeaters-anonymous-meeting/', sourceLabel: 'Unity Intergroup of Overeaters Anonymous'
  },
  {
    id: 'fa', name: 'Food Addicts in Recovery Anonymous', abbreviation: 'FA',
    concerns: ['Food / compulsive eating'], pathway: ['12-Step / Spiritual'], access: ['Minnesota / locator', 'Online accessible'], audience: ['Person in recovery'],
    region: ['Statewide / locator', 'Online'],
    summary: '12-Step fellowship for people who identify with food addiction. Meetings are free and the official finder can be filtered by location and format.',
    fit: 'Often chosen by people seeking a highly structured abstinence-oriented food recovery fellowship.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Use official locator for current Minnesota meetings',
    url: 'https://www.foodaddicts.org/find-a-meeting', sourceLabel: 'Food Addicts in Recovery Anonymous'
  },
  {
    id: 'faa', name: 'Food Addicts Anonymous', abbreviation: 'FAA',
    concerns: ['Food / compulsive eating'], pathway: ['12-Step / Spiritual'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Online', 'Statewide / locator'],
    summary: '12-Step fellowship focused on food addiction and recovery from compulsive eating behaviors, with virtual meetings available.',
    fit: 'Another food-specific fellowship for people who want 12-Step community and food-focused identification.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Online meetings accessible from Minnesota; verify local options',
    url: 'https://faacanhelp.org/meetings/', sourceLabel: 'Food Addicts Anonymous'
  },
  {
    id: 'saa', name: 'Sex Addicts Anonymous – Twin Cities', abbreviation: 'SAA',
    concerns: ['Sex / love / pornography'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Online'],
    summary: '12-Step fellowship for compulsive sexual behavior. The Twin Cities SAA site directs people to official Minnesota meetings and electronic options.',
    fit: 'Useful when someone wants to define individualized sexual sobriety while receiving peer support around compulsive sexual behavior.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Minnesota / Twin Cities meeting network',
    url: 'https://saatc.org/find-a-meeting/', sourceLabel: 'SAA Twin Cities'
  },
  {
    id: 'sa', name: 'Sexaholics Anonymous – Twin Cities', abbreviation: 'SA',
    concerns: ['Sex / love / pornography'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Online'],
    summary: '12-Step fellowship for people seeking recovery from lust, pornography, and compulsive sexual behavior. Twin Cities meetings include in-person and dial-in options.',
    fit: 'For people who identify with SA’s specific definition of sexual sobriety and want a structured 12-Step fellowship.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Active Twin Cities-specific site',
    url: 'https://satwincities.org/find-a-meeting/', sourceLabel: 'Sexaholics Anonymous Twin Cities'
  },
  {
    id: 'slaa', name: 'Sex and Love Addicts Anonymous', abbreviation: 'S.L.A.A.',
    concerns: ['Sex / love / pornography', 'Codependency / relationships'], pathway: ['12-Step / Spiritual'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Statewide / locator', 'Online'],
    summary: '12-Step fellowship for patterns involving sex addiction, love addiction, romantic obsession, relationship dependence, sexual anorexia, and avoidance.',
    fit: 'Especially useful when the addictive pattern centers on relationships, fantasy, attachment, dating, sex, or avoidance of intimacy.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Use official meeting finder for Minnesota and virtual options',
    url: 'https://slaafws.org/meetings/', sourceLabel: 'S.L.A.A. Fellowship-Wide Services'
  },
  {
    id: 'itaa', name: 'Internet and Technology Addicts Anonymous – Minnesota', abbreviation: 'ITAA',
    concerns: ['Internet / technology / gaming'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Online accessible'], audience: ['Person in recovery'],
    region: ['International Falls / Northland', 'Statewide online'],
    summary: '12-Step fellowship for compulsive internet, smartphone, social media, streaming, browsing, and technology use. ITAA maintains a Minnesota-specific meeting page.',
    fit: 'One of the clearest peer-support options for screen and technology addiction that does not require complete abstinence from all technology.',
    spirituality: '12-Step framework; members define healthy technology use individually.',
    localStatus: 'Minnesota in-person listings confirmed plus online meetings',
    url: 'https://internetaddictsanonymous.org/in-person-meetings/usa-mn/', sourceLabel: 'ITAA – Minnesota'
  },
  {
    id: 'gaa-gaming', name: 'Gaming Addicts Anonymous', abbreviation: 'GAA',
    concerns: ['Internet / technology / gaming'], pathway: ['12-Step / Spiritual'], access: ['Online accessible'], audience: ['Person in recovery'],
    region: ['Online'],
    summary: 'Peer fellowship specifically for recovery from excessive or addictive video gaming. Multiple online meetings are available and accessible from Minnesota.',
    fit: 'Best when gaming itself—not general internet use—is the primary problem.',
    spirituality: '12-Step-influenced fellowship; no required religious affiliation.',
    localStatus: 'Online meetings accessible from Minnesota',
    url: 'https://www.gamingaddictsanonymous.org/online-meetings/', sourceLabel: 'Gaming Addicts Anonymous'
  },
  {
    id: 'media', name: 'Media Addicts Anonymous', abbreviation: 'MAA',
    concerns: ['Internet / technology / gaming', 'Other compulsive behavior'], pathway: ['12-Step / Spiritual'], access: ['Online accessible'], audience: ['Person in recovery'],
    region: ['Online'],
    summary: '12-Step community for unhealthy or addictive use of media, including compulsive news, video, streaming, social media, and other media consumption.',
    fit: 'Useful when the problem is broader than gaming or internet access and centers on compulsive media consumption.',
    spirituality: '12-Step framework.',
    localStatus: 'Free online meetings accessible from Minnesota',
    url: 'https://www.mediaaddictsanonymous.org/meetings', sourceLabel: 'Media Addicts Anonymous'
  },
  {
    id: 'da', name: 'Debtors Anonymous – Northern Plains / Minnesota', abbreviation: 'DA',
    concerns: ['Spending / debt'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Statewide online', 'Northern Plains'],
    summary: '12-Step fellowship for compulsive debting and financial unmanageability. The Northern Plains Intergroup serves Minnesota and neighboring states.',
    fit: 'For people whose addictive pattern involves unsecured debt, chronic financial chaos, compulsive borrowing, or avoidance of money reality.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Minnesota-specific intergroup with local/online meetings',
    url: 'https://www.danorthernplains.org/minnesota', sourceLabel: 'Northern Plains Debtors Anonymous Intergroup'
  },
  {
    id: 'spenders', name: 'Spenders Anonymous', abbreviation: 'SA (Spending)',
    concerns: ['Spending / debt'], pathway: ['12-Step / Spiritual'], access: ['Online accessible'], audience: ['Person in recovery'],
    region: ['Online'],
    summary: '12-Step fellowship focused specifically on compulsive spending and shopping, with regular virtual meetings available in Central Time.',
    fit: 'A direct fit when shopping/spending behavior is the main problem rather than debt alone.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Virtual meetings accessible from Minnesota',
    url: 'https://www.spenders.org/meetings', sourceLabel: 'Spenders Anonymous'
  },
  {
    id: 'wa', name: 'Workaholics Anonymous', abbreviation: 'WA',
    concerns: ['Work / overactivity', 'Other compulsive behavior'], pathway: ['12-Step / Spiritual'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Online', 'Statewide / locator'],
    summary: '12-Step recovery community for compulsive working, overactivity, work avoidance, burnout patterns, and inability to stop or rest.',
    fit: 'For people whose relationship with work, productivity, or activity has become compulsive and unmanageable.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Global online finder; verify Minnesota listings',
    url: 'https://workaholics-anonymous.org/meetings/', sourceLabel: 'Workaholics Anonymous'
  },
  {
    id: 'clutter', name: 'Clutterers Anonymous', abbreviation: 'CLA',
    concerns: ['Clutter / acquiring', 'Other compulsive behavior'], pathway: ['12-Step / Spiritual'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Person in recovery'],
    region: ['Online', 'Statewide / locator'],
    summary: '12-Step fellowship for people struggling with clutter, excessive acquiring, inability to discard, and related compulsive behaviors.',
    fit: 'For people who experience clutter as a compulsive, recurring problem and want peer accountability and recovery tools.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Virtual meetings accessible; verify local Minnesota options',
    url: 'https://clutterersanonymous.org/meetings/', sourceLabel: 'Clutterers Anonymous'
  },
  {
    id: 'coda', name: 'Co-Dependents Anonymous of Minnesota', abbreviation: 'CoDA',
    concerns: ['Codependency / relationships'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Person in recovery'],
    region: ['Twin Cities', 'Greater Minnesota', 'Online'],
    summary: '12-Step fellowship for people seeking healthier relationships and recovery from codependent patterns. Minnesota has its own intergroup and meeting list.',
    fit: 'For people who overfocus on others, struggle with boundaries, self-worth, control, rescuing, or unhealthy relationship patterns.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Active Minnesota-specific meeting network',
    url: 'https://minncoda.org/meetings/', sourceLabel: 'MinnCoDA'
  },
  {
    id: 'aca', name: 'Adult Children of Alcoholics / Dysfunctional Families – Minnesota', abbreviation: 'ACA',
    concerns: ['Family-of-origin / dysfunction', 'Codependency / relationships'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Adult child / family impact'],
    region: ['Statewide', 'Twin Cities', 'Greater Minnesota'],
    summary: '12-Step recovery for adults raised in alcoholic or otherwise dysfunctional families. Minnesota has a dedicated ACA intergroup site and statewide meeting resources.',
    fit: 'Useful when childhood family dysfunction continues to affect adult relationships, emotional regulation, boundaries, or self-concept.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Minnesota-specific intergroup and meetings',
    url: 'https://www.adultchildrenmn.com/meetings-list/', sourceLabel: 'ACA Minnesota'
  },
  {
    id: 'alanon', name: 'Al-Anon / Alateen – Minnesota', abbreviation: 'Al-Anon',
    concerns: ['Family / loved one affected by alcohol'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Family / ally', 'Teens'],
    region: ['Statewide', 'Twin Cities', 'Greater Minnesota'],
    summary: 'Support for family members and friends affected by someone else’s drinking. Alateen provides age-appropriate peer support for teens.',
    fit: 'For loved ones who need their own recovery, boundaries, support, and tools regardless of whether the drinker changes.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Large Minnesota meeting network',
    url: 'https://www.al-anon-alateen-msp.org/pages/meetings.html', sourceLabel: 'Minnesota Al-Anon / Alateen'
  },
  {
    id: 'naranon', name: 'Nar-Anon / Narateen', abbreviation: 'Nar-Anon',
    concerns: ['Family / loved one affected by drugs'], pathway: ['12-Step / Spiritual'], access: ['Minnesota / locator', 'Online accessible'], audience: ['Family / ally', 'Teens'],
    region: ['Statewide / locator', 'Online'],
    summary: '12-Step support for relatives and friends affected by another person’s drug addiction. Narateen is designed for teens.',
    fit: 'For loved ones of people using opioids, stimulants, cannabis, or other drugs who need support for themselves.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Minnesota resources available; verify current meeting schedule',
    url: 'https://naminnesota.org/family-resources/', sourceLabel: 'Minnesota Region NA – Family Resources'
  },
  {
    id: 'gamanon', name: 'Gam-Anon – Minnesota', abbreviation: 'Gam-Anon',
    concerns: ['Family / loved one affected by gambling'], pathway: ['12-Step / Spiritual'], access: ['Minnesota in-person', 'Hybrid / Online'], audience: ['Family / ally'],
    region: ['Twin Cities', 'Online'],
    summary: 'Support fellowship for people affected by another person’s gambling. The official directory lists Minnesota options including hybrid meetings.',
    fit: 'For spouses, partners, family members, and close friends dealing with financial and emotional effects of compulsive gambling.',
    spirituality: '12-Step-inspired family recovery.',
    localStatus: 'Minnesota listing confirmed',
    url: 'https://gam-anon.org/meeting-directory/meeting-details/united-states/minnesota', sourceLabel: 'Gam-Anon International'
  },
  {
    id: 'familiesanon', name: 'Families Anonymous', abbreviation: 'FA (Family)',
    concerns: ['Family / loved one affected by drugs', 'Family / loved one affected by alcohol', 'Family / loved one affected by behavior'], pathway: ['12-Step / Spiritual'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Family / ally'],
    region: ['Online', 'Statewide / locator'],
    summary: '12-Step fellowship for family and friends of people with drug, alcohol, or related behavioral problems.',
    fit: 'Broad family support when the concern spans substances and behavior rather than one specific drug.',
    spirituality: '12-Step spiritual framework.',
    localStatus: 'Online and locator-based access',
    url: 'https://familiesanonymous.org/', sourceLabel: 'Families Anonymous'
  },
  {
    id: 'smart-ff', name: 'SMART Recovery Family & Friends', abbreviation: 'SMART F&F',
    concerns: ['Family / loved one affected by drugs', 'Family / loved one affected by alcohol', 'Family / loved one affected by gambling', 'Family / loved one affected by behavior'], pathway: ['Secular / Evidence-informed'], access: ['Online accessible', 'Minnesota / locator'], audience: ['Family / ally'],
    region: ['Online', 'Statewide / locator'],
    summary: 'Skills-based support for people affected by a loved one’s addictive behavior, using tools influenced by CRAFT and cognitive-behavioral approaches.',
    fit: 'A secular alternative for family members who want communication, boundary, coping, and behavior-change tools.',
    spirituality: 'No spiritual or religious requirement.',
    localStatus: 'Online meetings widely accessible; locator can identify Minnesota options',
    url: 'https://smartrecovery.org/meeting', sourceLabel: 'SMART Recovery USA'
  }
];

window.MEETING_TERMS = [
  ['Open', 'Anyone may attend, including visitors, family, professionals, or people exploring recovery—depending on the fellowship’s rules.'],
  ['Closed', 'Usually limited to people who identify with the addiction/problem or have a desire to stop. Always read the listing before attending.'],
  ['Discussion', 'Members share on a topic or recovery question. Participation is generally optional.'],
  ['Speaker', 'One or more members share their recovery story, experience, strength, and hope.'],
  ['Step / Tradition', 'Focuses on a specific Step, Tradition, or related recovery principle.'],
  ['Literature / Book Study', 'Uses fellowship-approved literature as the structure for reading and discussion.'],
  ['Beginner / Newcomer', 'Designed to be especially welcoming to people attending early in recovery or for the first time.'],
  ['Meditation', 'Includes silent or guided meditation, mindfulness, reflection, or contemplative practice.'],
  ['Hybrid', 'Meets in a physical location while also allowing remote participation.'],
  ['Online / Virtual', 'Meets by Zoom, phone, video platform, chat, or another remote format.'],
  ['Identity-specific', 'May be designed for women, men, LGBTQ+ people, young people, veterans, parents, or another shared identity. Check eligibility notes.'],
  ['Child-friendly', 'Some meetings allow children or provide accommodations. This varies greatly; verify directly before attending.']
];

window.SOURCE_NOTES = [
  'Meeting schedules change often. The directory emphasizes official fellowship and Minnesota service-body finders instead of copying large static schedules.',
  '“Minnesota in-person” means a Minnesota-specific or official locator showed current Minnesota meetings during review. “Minnesota / locator” means availability should be checked in the linked finder before traveling.',
  'Online-only fellowships are included when Minnesotans can participate even if no current in-person Minnesota group was confirmed.',
  'Peer recovery meetings are community support, not a substitute for emergency care, medical detoxification, psychiatric care, or professional treatment when those are needed.'
];
