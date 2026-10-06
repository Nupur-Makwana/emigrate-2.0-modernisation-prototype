import React, { useState, useEffect, useRef } from 'react';
import { useEmigrate } from '../context/EmigrateContext';
import { SupportedLanguage } from '../types/emigrate';
import {
  Globe2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Languages,
  Sparkles,
} from 'lucide-react';

interface TutorialStepTranslation {
  title: string;
  desc: string;
  badge?: string;
}

export const PortalTutorialModal: React.FC = () => {
  const { tutorialOpen, setTutorialOpen, language, setLanguage, setActiveView } = useEmigrate();

  // Step 0: Language selection & Welcome
  // Step 1: Top Bar (language, text size, theme)
  // Step 2: Login for registered users
  // Step 3: The main menu
  // Step 4: If you are an Emigrant
  // Step 5: If you are a Recruiting Agent or Foreign Employer
  // Step 6: How officers review files
  // Step 7: Need help? Ask Mitra
  // Step 8: You are ready
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const resizeObserverRef = useRef<number | null>(null);

  // Supported language list for selection
  const languagesList: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  ];

  // Multilingual content aligned exactly with video walkthrough
  const translations: Record<SupportedLanguage, {
    welcomeTitle: string;
    welcomeDesc: string;
    chooseLang: string;
    btnNext: string;
    btnBack: string;
    btnSkip: string;
    btnStart: string;
    readyTitle: string;
    readyDesc: string;
    steps: TutorialStepTranslation[];
  }> = {
    en: {
      welcomeTitle: 'Welcome to eMigrate 2.0',
      welcomeDesc:
        'eMigrate helps Indian workers go abroad safely, and helps officers check files faster. This short tour explains where everything is. You can skip it and replay it any time from "Site Walkthrough".',
      chooseLang: 'Choose your preferred language for the tutorial and portal:',
      btnNext: 'Next',
      btnBack: 'Back',
      btnSkip: 'Skip',
      btnStart: 'Start using eMigrate',
      readyTitle: 'You are ready',
      readyDesc: 'Start from the Home page, or open Emigrant to begin an application.',
      steps: [
        {
          title: 'Top bar: language, text size, theme',
          desc: 'Use the dropdowns on the left for About Us and Help. On the right, choose your language, make text larger (A+) or smaller (A-), and switch light or dark mode.',
        },
        {
          title: 'Login for registered users',
          desc: "Officers sign in with 'Registered User Login'. Each officer goes straight to their own dashboard: Port of Emigration (PoE), Embassy / Mission, or PGE/OE Executive. Demo IDs are shown on the login box.",
        },
        {
          title: 'The main menu',
          desc: 'Emigrant, Employer, and Recruiting Agent each open only their own application form. Directory lets you search employees, agents, Minimum Referral Wages and Project Exporters. Welfare Schemes, RTI and Alerts are here too.',
        },
        {
          title: 'If you are an Emigrant',
          desc: "Open Emigrant, fill the form in six steps (personal, passport, visa and employment, nominee, PBBY insurance, documents) and submit. You receive an ARN. Use 'Track & Contract' to follow your file. After officers grant clearance, your digital contract appears with a signed QR code. Airport officers can scan it even offline.",
        },
        {
          title: 'If you are a Recruiting Agent or Foreign Employer',
          desc: 'Recruiting Agents use a five-tab form. Foreign Employers use a four-step form with trade licence uploads. Foreign Employer files are attested by the Mission in your jurisdiction.',
        },
        {
          title: 'How officers review files',
          desc: 'An AI engine reads uploaded documents (OCR) and gives each file a confidence score. It never approves anything. Officers open each file, check the information, OCR output and AI insights, write a note, then approve and send it to the higher officer, or flag it.',
        },
        {
          title: 'Need help? Ask Mitra',
          desc: 'The chat assistant works in English, Hindi, and Tamil. You can type, tap a prompt, or use the mic. If it cannot answer, it frames your question and sends it to the Helpdesk as a ticket.',
        },
      ],
    },
    hi: {
      welcomeTitle: 'ई-माइग्रेट 2.0 में आपका स्वागत है',
      welcomeDesc:
        'ई-माइग्रेट भारतीय कामगारों को सुरक्षित रूप से विदेश जाने में मदद करता है, और अधिकारियों को फाइलों की तेजी से जांच करने में सहायता करता है। यह संक्षिप्त टूर आपको पोर्टल के सभी मुख्य भागों से परिचित कराएगा। आप इसे कभी भी छोड़ सकते हैं या दोबारा देख सकते हैं।',
      chooseLang: 'ट्यूटोरियल और पोर्टल के लिए अपनी पसंदीदा भाषा चुनें:',
      btnNext: 'आगे',
      btnBack: 'पीछे',
      btnSkip: 'छोड़ें',
      btnStart: 'ई-माइग्रेट का उपयोग शुरू करें',
      readyTitle: 'आप तैयार हैं',
      readyDesc: 'मुख्य पृष्ठ से शुरुआत करें, या नया आवेदन शुरू करने के लिए "उत्प्रवासी" खोलें।',
      steps: [
        {
          title: 'शीर्ष पट्टी: भाषा, टेक्स्ट आकार और थीम',
          desc: 'बाईं ओर "हमारे बारे में" और "सहायता" के लिए ड्रॉपडाउन का उपयोग करें। दाईं ओर, अपनी भाषा चुनें, टेक्स्ट को बड़ा (A+) या छोटा (A-) करें, और लाइट या डार्क मोड बदलें।',
        },
        {
          title: 'पंजीकृत उपयोगकर्ताओं के लिए लॉगिन',
          desc: 'अधिकारी "पंजीकृत उपयोगकर्ता लॉगिन" से साइन इन करते हैं। प्रत्येक अधिकारी सीधे अपने डैशबोर्ड पर जाता है: उत्प्रवासी संरक्षक (PoE), दूतावास / मिशन, या PGE कार्यकारी। डेमो आईडी लॉगिन बॉक्स पर दिखाई गई हैं।',
        },
        {
          title: 'मुख्य मेनू',
          desc: 'उत्प्रवासी (Emigrant), नियोक्ता (Employer), और भर्ती एजेंट (RA) प्रत्येक अपना आवेदन फॉर्म खोलते हैं। निर्देशिका आपको एजेंटों, न्यूनतम संदर्भ वेतन (MRW) और प्रोजेक्ट निर्यातकों को खोजने की अनुमति देती है। कल्याणकारी योजनाएं, RTI और अलर्ट भी यहां हैं।',
        },
        {
          title: 'यदि आप एक उत्प्रवासी कामगार हैं',
          desc: 'उत्प्रवासी खोलें, छह चरणों (व्यक्तिगत, पासपोर्ट, वीजा व रोजगार, नॉमिनी, PBBY बीमा, दस्तावेज) में फॉर्म भरें और जमा करें। आपको ARN प्राप्त होगा। अधिकारी द्वारा मंजूरी मिलने पर, आपका डिजिटल अनुबंध हस्ताक्षरित QR कोड के साथ दिखाई देगा जिसे हवाई अड्डे के अधिकारी ऑफलाइन भी स्कैन कर सकते हैं।',
        },
        {
          title: 'यदि आप भर्ती एजेंट या विदेशी नियोक्ता हैं',
          desc: 'भर्ती एजेंट पांच-टैब फॉर्म का उपयोग करते हैं। विदेशी नियोक्ता ट्रेड लाइसेंस अपलोड के साथ चार-चरणीय फॉर्म का उपयोग करते हैं। विदेशी नियोक्ता की फाइलों को उनके अधिकार क्षेत्र के भारतीय मिशन द्वारा सत्यापित किया जाता है।',
        },
        {
          title: 'अधिकारी फाइलों की समीक्षा कैसे करते हैं',
          desc: 'एक AI इंजन अपलोड किए गए दस्तावेजों (OCR) को पढ़ता है और प्रत्येक फाइल को एक आत्मविश्वास स्कोर देता है। यह कभी कुछ स्वीकृत नहीं करता। अधिकारी फाइल खोलते हैं, विवरण व AI इनसाइट्स जांचते हैं, टिप्पणी लिखते हैं, फिर इसे उच्च अधिकारी (PGE) को अनुमोदन हेतु भेजते हैं या फ्लैग करते हैं।',
        },
        {
          title: 'मदद चाहिए? मित्र से पूछें',
          desc: 'चैट सहायक अंग्रेजी, हिंदी और तमिल में काम करता है। आप टाइप कर सकते हैं, प्रॉम्प्ट चुन सकते हैं या माइक का उपयोग कर सकते हैं। यदि यह उत्तर नहीं दे पाता, तो यह टिकट बनाकर सहायता केंद्र को भेज देता है।',
        },
      ],
    },
    ta: {
      welcomeTitle: 'இ-மைக்ரேட் 2.0-க்கு வரவேற்கிறோம்',
      welcomeDesc:
        'இந்திய பணியாளர்கள் பாதுகாப்பாக வெளிநாடு செல்லவும், அதிகாரிகள் விரைவாக கோப்புகளை சரிபார்க்கவும் இ-மைக்ரேட் உதவுகிறது. இந்த குறுகிய வழிகாட்டி அனைத்தும் எங்குள்ளது என்பதை விளக்குகிறது.',
      chooseLang: 'வழிகாட்டி மற்றும் தளத்திற்கான மொழியைத் தேர்ந்தெடுக்கவும்:',
      btnNext: 'அடுத்து',
      btnBack: 'பின்செல்',
      btnSkip: 'தவிர்',
      btnStart: 'இ-மைக்ரேட்டைப் பயன்படுத்தத் தொடங்குங்கள்',
      readyTitle: 'நீங்கள் தயாராகிவிட்டீர்கள்',
      readyDesc: 'முகப்புப் பக்கத்திலிருந்து தொடங்கவும், அல்லது விண்ணப்பிக்க "பணியாளர்" பகுதியைத் திறக்கவும்.',
      steps: [
        {
          title: 'மேல் பட்டி: மொழி, எழுத்து அளவு, தீம்',
          desc: 'இடதுபுறத்தில் எங்களைப் பற்றி மற்றும் உதவிப் பிரிவுகள் உள்ளன. வலதுபுறத்தில் உங்கள் மொழியைத் தேர்ந்தெடுக்கவும், எழுத்து அளவை மாற்றவும்.',
        },
        {
          title: 'பதிவு செய்த பயனர்களுக்கான உள்நுழைவு',
          desc: 'அதிகாரிகள் "பதிவுசெய்த பயனர் உள்நுழைவு" மூலம் தங்கள் PoE, தூதரகம் அல்லது PGE டாஷ்போர்டுக்கு நேராகச் செல்லலாம்.',
        },
        {
          title: 'முதன்மை மெனு',
          desc: 'பணியாளர், முதலாளி மற்றும் ஆட்சேர்ப்பு முகவர் படிவங்கள் இங்கு உள்ளன. குறைந்தபட்ச ஊதியங்கள் மற்றும் திட்ட ஏற்றுமதியாளர்களையும் பார்க்கலாம்.',
        },
        {
          title: 'நீங்கள் ஒரு வெளிநாட்டு பணியாளர் என்றால்',
          desc: 'படிவத்தை 6 படிகளில் பூர்த்தி செய்து சமர்ப்பிக்கவும். அனுமதி கிடைத்ததும் டிஜிட்டல் ஒப்பந்தம் QR குறியீட்டுடன் கிடைக்கும்.',
        },
        {
          title: 'முகவர் அல்லது வெளிநாட்டு முதலாளி என்றால்',
          desc: 'முகவர்கள் 5-படிவ அமைப்பையும், வெளிநாட்டு முதலாளிகள் 4-படிவ அமைப்பையும் பயன்படுத்துகின்றனர்.',
        },
        {
          title: 'அதிகாரிகள் எவ்வாறு ஆய்வு செய்கிறார்கள்',
          desc: 'AI இயந்திரம் ஆவணங்களை சரிபார்த்து மதிப்பெண் அளிக்கிறது. அதிகாரி ஆய்வு செய்து மேல் அதிகாரிக்கு அனுப்புவார்.',
        },
        {
          title: 'உதவி தேவையா? மித்ராவிடம் கேளுங்கள்',
          desc: 'உதவியாளர் ஆங்கிலம், இந்தி மற்றும் தமிழில் பதிலளிக்கிறது. குரல் வழியாகவும் கேட்கலாம்.',
        },
      ],
    },
    te: {
      welcomeTitle: 'ఇ-మైగ్రేట్ 2.0 కి స్వాగతం',
      welcomeDesc:
        'భారతీయ కార్మికులు సురక్షితంగా విదేశాలకు వెళ్లడానికి మరియు అధికారులు ఫైళ్లను వేగంగా ధృవీకరించడానికి ఇ-మైగ్రేట్ సహాయపడుతుంది.',
      chooseLang: 'ట్యుటోరియల్ మరియు పోర్టల్ కోసం మీ భాషను ఎంచుకోండి:',
      btnNext: 'తదుపరి',
      btnBack: 'వెనుకకు',
      btnSkip: 'వదిలివేయి',
      btnStart: 'ఇ-మైగ్రేట్ ఉపయోగించడం ప్రారంభించండి',
      readyTitle: 'మీరు సిద్ధంగా ఉన్నారు',
      readyDesc: 'హోమ్ పేజీ నుండి ప్రారంభించండి లేదా దరఖాస్తు చేసుకోవడానికి వలసదారుని తెరవండి.',
      steps: [
        {
          title: 'టాప్ బార్: భాష, టెక్స్ట్ పరిమాణం, థీమ్',
          desc: 'ఎడమ వైపున సమాచారం మరియు సహాయం కోసం డ్రాప్‌డౌన్‌లు ఉన్నాయి. కుడి వైపున భాష మరియు టెక్స్ట్ సైజ్ మార్చవచ్చు.',
        },
        {
          title: 'నమోదిత వినియోగదారుల లాగిన్',
          desc: 'అధికారులు తమ PoE, ఎంబసీ లేదా PGE డ్యాష్‌బోర్డ్‌లోకి నేరుగా వెళ్లడానికి లాగిన్ అవ్వండి.',
        },
        {
          title: 'ప్రధాన మెనూ',
          desc: 'వలసదారు, యజమాని మరియు రిక్రూటింగ్ ఏజెంట్ దరఖాస్తు ఫారమ్‌లు ఇక్కడ అందుబాటులో ఉన్నాయి.',
        },
        {
          title: 'మీరు వలస కార్మికులైతే',
          desc: 'దరఖాస్తును 6 దశల్లో పూర్తి చేయండి. ఆమోదం తర్వాత QR కోడ్‌తో కూడిన డిజిటల్ కాంట్రాక్ట్ లభిస్తుంది.',
        },
        {
          title: 'రిక్రూటింగ్ ఏజెంట్ లేదా విదేశీ యజమాని అయితే',
          desc: 'లైసెన్స్ మరియు కోటా ధృవీకరణ కోసం ప్రత్యేక ఫారమ్‌లను ఉపయోగించండి.',
        },
        {
          title: 'అధికారులు ఫైళ్లను ఎలా సమీక్షిస్తారు',
          desc: 'AI ఇంజిన్ పత్రాలను చదివి స్కోర్ ఇస్తుంది. అధికారులు పరిశీలించి ఉన్నతాధికారికి పంపుతారు.',
        },
        {
          title: 'సహాయం కావాలా? మిత్రను అడగండి',
          desc: 'చాట్ అసిస్టెంట్ మీ ప్రశ్నలకు సమాధానమిస్తుంది మరియు హెల్ప్‌డెస్క్ టికెట్ రూపొందిస్తుంది.',
        },
      ],
    },
    kn: {
      welcomeTitle: 'ಇ-ಮೈಗ್ರೇಟ್ 2.0 ಗೆ ಸುಸ್ವಾಗತ',
      welcomeDesc:
        'ಭಾರತೀಯ ಕಾರ್ಮಿಕರು ಸುರಕ್ಷಿತವಾಗಿ ವಿದೇಶಕ್ಕೆ ಹೋಗಲು ಮತ್ತು ಅಧಿಕಾರಿಗಳು ಕಡತಗಳನ್ನು ವೇಗವಾಗಿ ಪರಿಶೀಲಿಸಲು ಇ-ಮೈಗ್ರೇಟ್ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
      chooseLang: 'ಟ್ಯುಟೋರಿಯಲ್ ಮತ್ತು ಪೋರ್ಟಲ್‌ಗಾಗಿ ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
      btnNext: 'ಮುಂದೆ',
      btnBack: 'ಹಿಂದೆ',
      btnSkip: 'ಬಿಟ್ಟುಬಿಡಿ',
      btnStart: 'ಇ-ಮೈಗ್ರೇಟ್ ಬಳಸಲು ಪ್ರಾರಂಭಿಸಿ',
      readyTitle: 'ನೀವು ಸಿದ್ಧರಿದ್ದೀರಿ',
      readyDesc: 'ಮುಖಪುಟದಿಂದ ಪ್ರಾರಂಭಿಸಿ ಅಥವಾ ಅರ್ಜಿಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ವಲಸಿಗರನ್ನು ತೆರೆಯಿರಿ.',
      steps: [
        {
          title: 'ಮೇಲಿನ ಬಾರ್: ಭಾಷೆ, ಪಠ್ಯ ಗಾತ್ರ, ಥೀಮ್',
          desc: 'ಎಡಭಾಗದಲ್ಲಿ ನಮ್ಮ ಬಗ್ಗೆ ಮತ್ತು ಸಹಾಯಕ್ಕಾಗಿ ಡ್ರಾಪ್‌ಡೌನ್‌ಗಳಿವೆ. ಬಲಭಾಗದಲ್ಲಿ ಭಾಷೆ ಮತ್ತು ಪಠ್ಯ ಗಾತ್ರವನ್ನು ಆರಿಸಿ.',
        },
        {
          title: 'ನೋಂದಾಯಿತ ಬಳಕೆದಾರರ ಲಾಗಿನ್',
          desc: 'ಅಧಿಕಾರಿಗಳು ತಮ್ಮ PoE, ರಾಯಭಾರ ಕಚೇರಿ ಅಥವಾ PGE ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಲಾಗಿನ್ ಆಗುತ್ತಾರೆ.',
        },
        {
          title: 'ಮುಖ್ಯ ಮೆನು',
          desc: 'ವಲಸಿಗ, ಉದ್ಯೋಗದಾತ ಮತ್ತು ನೇಮಕಾತಿ ಏಜೆಂಟ್ ಅರ್ಜಿ ನಮೂನೆಗಳು ಇಲ್ಲಿ ಲಭ್ಯವಿದೆ.',
        },
        {
          title: 'ನೀವು ವಲಸಿಗರಾಗಿದ್ದರೆ',
          desc: 'ಅರ್ಜಿಯನ್ನು 6 ಹಂತಗಳಲ್ಲಿ ಸಲ್ಲಿಸಿ. ಅನುಮೋದನೆಯ ನಂತರ QR ಕೋಡ್ ಹೊಂದಿರುವ ಡಿಜಿಟಲ್ ಒಪ್ಪಂದ ಲಭ್ಯವಾಗುತ್ತದೆ.',
        },
        {
          title: 'ನೇಮಕಾತಿ ಏಜೆಂಟ್ ಅಥವಾ ವಿದೇಶಿ ಉದ್ಯೋಗದಾತರಾಗಿದ್ದರೆ',
          desc: 'ಪರವಾನಗಿ ಮತ್ತು ಬೇಡಿಕೆ ಕೋಟಾಗಳನ್ನು ನೋಂದಾಯಿಸಲು ವಿಶೇಷ ನಮೂನೆಗಳನ್ನು ಬಳಸಿ.',
        },
        {
          title: 'ಅಧಿಕಾರಿಗಳು ಕಡತಗಳನ್ನು ಹೇಗೆ ಪರಿಶೀಲಿಸುತ್ತಾರೆ',
          desc: 'AI ಎಂಜಿನ್ ದಾಖಲೆಗಳನ್ನು ಓದಿ ಸ್ಕೋರ್ ನೀಡುತ್ತದೆ. ಅಧಿಕಾರಿಗಳು ಪರಿಶೀಲಿಸಿ ಅನುಮೋದನೆಗೆ ಕಳುಹಿಸುತ್ತಾರೆ.',
        },
        {
          title: 'ಸಹಾಯ ಬೇಕೇ? ಮಿತ್ರನನ್ನು ಕೇಳಿ',
          desc: 'ಚಾಟ್ ಸಹಾಯಕ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸುತ್ತದೆ ಮತ್ತು ಹೆಲ್ಪ್‌ಡೆಸ್ಕ್‌ಗೆ ಟಿಕೆಟ್ ಕಳುಹಿಸುತ್ತದೆ.',
        },
      ],
    },
    bn: {
      welcomeTitle: 'ই-মাইগ্রেট ২.০-তে স্বাগতম',
      welcomeDesc:
        'ই-মাইগ্রেট ভারতীয় কর্মীদের নিরাপদে বিদেশে যেতে সাহায্য করে এবং কর্মকর্তাদের দ্রুত ফাইল যাচাইয়ে সহায়তা করে।',
      chooseLang: 'টিউটোরিয়াল ও পোর্টালের জন্য ভাষা নির্বাচন করুন:',
      btnNext: 'পরবর্তী',
      btnBack: 'পূর্ববর্তী',
      btnSkip: 'এড়িয়ে যান',
      btnStart: 'ই-মাইগ্রেট ব্যবহার শুরু করুন',
      readyTitle: 'আপনি প্রস্তুত',
      readyDesc: 'হোম পেজ থেকে শুরু করুন বা আবেদন করতে "অভিবাসী" খুলুন।',
      steps: [
        {
          title: 'শীর্ষ বার: ভাষা, পাঠ্যের আকার, থিম',
          desc: 'বাম পাশে আমাদের সম্পর্কে এবং সহায়তা রয়েছে। ডান পাশে ভাষা নির্বাচন এবং টেক্সটের আকার পরিবর্তন করুন।',
        },
        {
          title: 'নিবন্ধিত ব্যবহারকারীদের জন্য লগইন',
          desc: 'কর্মকর্তারা PoE, দূতাবাস বা PGE ড্যাশবোর্ডে লগইন করে কাজ করেন।',
        },
        {
          title: 'প্রধান মেনু',
          desc: 'অভিবাসী, নিয়োগকর্তা এবং রিক্রুটিং এজেন্টের আবেদন ফর্ম এখান থেকে পাওয়া যাবে।',
        },
        {
          title: 'আপনি যদি একজন অভিবাসী হন',
          desc: 'ফর্মটি পূরণ করুন এবং জমা দিন। অনুমোদনের পর স্বাক্ষরিত QR কোডসহ ডিজিটাল চুক্তিপত্র পাবেন।',
        },
        {
          title: 'রিক্রুটিং এজেন্ট বা বিদেশী নিয়োগকর্তা হলে',
          desc: 'বাণিজ্য লাইসেন্স ও কোটার জন্য নির্দিষ্ট ফর্ম পূরণ করুন।',
        },
        {
          title: 'কর্মকর্তারা কীভাবে ফাইল পর্যালোচনা করেন',
          desc: 'AI ইঞ্জিন নথি যাচাই করে স্কোর দেয়। কর্মকর্তারা তা দেখে উচ্চপদস্থ কর্মকর্তার কাছে পাঠান।',
        },
        {
          title: 'সাহায্য দরকার? মিত্রকে জিজ্ঞাসা করুন',
          desc: 'চ্যাট সহকারী ইংরেজি, হিন্দি ও বাংলায় উত্তর দেয় এবং টিকিট তৈরি করতে পারে।',
        },
      ],
    },
  };

  const t = translations[language] || translations.en;

  // Map step index to DOM target element ID
  const targetIds: (string | null)[] = [
    null, // Step 0: Welcome / Lang
    'tour-top-strip', // Step 1: Top bar
    'tour-login-btn', // Step 2: Login button
    'tour-main-nav', // Step 3: Main navigation
    'tour-emigrant-hero', // Step 4: Emigrant card
    'tour-services-grid', // Step 5: Recruiting Agent / Employer
    'tour-video-review', // Step 6: Officer review / video
    'tour-mitra-fab', // Step 7: Mitra floating button
    null, // Step 8: You are ready
  ];

  // Update target rect on step change or resize/scroll
  useEffect(() => {
    if (!tutorialOpen) return;

    const updateRect = () => {
      const targetId = targetIds[currentStep];
      if (!targetId) {
        setTargetRect(null);
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        // Scroll target into view
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    const interval = setInterval(updateRect, 300);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [currentStep, tutorialOpen]);

  if (!tutorialOpen) return null;

  const handleClose = () => {
    localStorage.setItem('emigrate_tutorial_seen', 'true');
    setTutorialOpen(false);
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Compute position of the callout popover box relative to target rect
  const getPopoverStyle = () => {
    if (!targetRect || currentStep === 0 || currentStep === 8) {
      // Centered on screen for Welcome and Ready screens
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed' as const,
      };
    }

    const { top, bottom, left, right, width, height } = targetRect;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Default positioning logic:
    // If target is in top half of screen, place popover below target
    // If target is in bottom half, place popover above target
    const popoverWidth = Math.min(480, windowWidth - 32);

    let popoverTop = 0;
    let popoverLeft = Math.max(16, Math.min(left + width / 2 - popoverWidth / 2, windowWidth - popoverWidth - 16));

    if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
      // Top bar / Login / Main nav -> place popover below the header
      popoverTop = Math.min(bottom + 16, windowHeight - 240);
    } else if (currentStep === 7) {
      // Mitra fab in bottom right -> place popover above and to the left of the button
      popoverTop = Math.max(20, top - 200);
      popoverLeft = Math.max(16, windowWidth - popoverWidth - 24);
    } else {
      // Hero sections -> place in middle/below
      if (top < windowHeight / 2) {
        popoverTop = Math.min(bottom + 16, windowHeight - 240);
      } else {
        popoverTop = Math.max(20, top - 210);
      }
    }

    return {
      top: `${popoverTop}px`,
      left: `${popoverLeft}px`,
      width: `${popoverWidth}px`,
      position: 'fixed' as const,
    };
  };

  // Determine arrow direction pointing to target
  const getArrow = () => {
    if (!targetRect || currentStep === 0 || currentStep === 8) return null;

    if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
      // Target is above popover -> arrow points UP
      return (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-navy-900 filter drop-shadow-md" />
      );
    }

    if (currentStep === 7) {
      // Target is below-right -> arrow points DOWN toward Mitra
      return (
        <div className="absolute -bottom-3 right-8 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-navy-900 filter drop-shadow-md" />
      );
    }

    return (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-navy-900 filter drop-shadow-md" />
    );
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* 1. Dark Backdrop Overlay */}
      <div className="fixed inset-0 bg-black/60 transition-opacity duration-300" />

      {/* 2. Highlight Box around targeted element (Golden border with glowing pulse) */}
      {targetRect && currentStep > 0 && currentStep < 8 && (
        <div
          className="fixed pointer-events-none transition-all duration-300 z-50 border-3 border-amber-400 rounded-xl ring-4 ring-amber-400/40 shadow-[0_0_35px_rgba(245,158,11,0.7)] animate-pulse"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
          }}
        />
      )}

      {/* 3. Popover Card (Walkthrough Controller) */}
      <div
        style={getPopoverStyle()}
        className="z-50 bg-navy-900 text-white rounded-xl shadow-2xl border border-navy-700 overflow-hidden animate-in fade-in duration-200"
      >
        {/* Tricolor Ribbon on top of card */}
        <div className="tricolor-stripe" />

        {/* Arrow pointer toward highlighted area */}
        {getArrow()}

        {/* STEP 0: LANGUAGE SELECTION & WELCOME SCREEN */}
        {currentStep === 0 && (
          <div className="p-6 space-y-4 max-w-lg">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500 text-navy-950 font-bold">
                  <Languages className="w-4 h-4" />
                </span>
                <span className="font-bold text-xs uppercase tracking-wider text-amber-400">
                  Select Language / भाषा चुनें
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-navy-800 transition"
                title="Skip Tutorial"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector Grid (At the beginning of the tutorial as requested!) */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 block">
                {t.chooseLang}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {languagesList.map((langItem) => (
                  <button
                    key={langItem.code}
                    onClick={() => setLanguage(langItem.code)}
                    className={`p-2.5 rounded-lg text-left transition border text-xs flex flex-col justify-center ${
                      language === langItem.code
                        ? 'bg-amber-500 text-navy-950 font-black border-amber-400 shadow-md ring-2 ring-amber-300/50'
                        : 'bg-navy-800 text-slate-200 hover:bg-navy-700 border-navy-700'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{langItem.native}</span>
                    <span className={`text-[10px] ${language === langItem.code ? 'text-navy-900 opacity-80' : 'text-slate-400'}`}>
                      {langItem.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Welcome Description */}
            <div className="bg-navy-950/80 p-4 rounded-xl border border-navy-800 space-y-2">
              <h3 className="font-black text-base text-white">{t.welcomeTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {t.welcomeDesc}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-navy-800">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition"
              >
                {t.btnSkip}
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs rounded-lg transition flex items-center gap-1.5 shadow-md"
              >
                <span>{t.btnNext}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEPS 1 to 7: HIGHLIGHTED STEPS AS SHOWN IN VIDEO */}
        {currentStep >= 1 && currentStep <= 7 && (
          <div className="p-5 space-y-3">
            {/* Header with step number and title */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-2">
              <span className="text-[10px] font-bold text-amber-400 font-mono tracking-wider uppercase">
                Step {currentStep} of 7
              </span>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-navy-800 transition"
                title={t.btnSkip}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="font-black text-sm text-white leading-tight">
              {t.steps[currentStep - 1].title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {t.steps[currentStep - 1].desc}
            </p>

            {/* Step Controller Buttons (Skip, Back, Next) */}
            <div className="flex items-center justify-between pt-3 border-t border-navy-800 text-xs">
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white font-medium text-xs transition"
              >
                {t.btnSkip}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded font-semibold text-xs border border-navy-700 transition"
                >
                  {t.btnBack}
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs rounded transition flex items-center gap-1 shadow-sm"
                >
                  <span>{t.btnNext}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: COMPLETION SCREEN ("You are ready") */}
        {currentStep === 8 && (
          <div className="p-6 space-y-4 max-w-md text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">{t.readyTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                {t.readyDesc}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 border-t border-navy-800">
              <button
                onClick={handleBack}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-navy-800 rounded-lg transition"
              >
                {t.btnBack}
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setActiveView('home');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center gap-1.5"
              >
                <span>{t.btnStart}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
