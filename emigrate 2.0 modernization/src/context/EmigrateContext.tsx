import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Country,
  EmigrantApplication,
  FERegistration,
  FontScale,
  RARegistration,
  SupportedLanguage,
  SupportTicket,
  UserRole,
} from '../types/emigrate';
import { INITIAL_EMIGRANTS, INITIAL_FE, INITIAL_RA, MRW_MATRIX } from '../data/seedData';

// Collision-resistant numeric suffix (uses Web Crypto instead of Math.random)
const secureSuffix = (min: number, max: number): number => {
  const range = max - min + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return min + (buf[0] % range);
};


interface EmigrateContextType {
  // Data State
  emigrants: EmigrantApplication[];
  foreignEmployers: FERegistration[];
  recruitingAgents: RARegistration[];
  supportTickets: SupportTicket[];

  // User & Auth State
  currentUser: { role: UserRole; username: string } | null;
  login: (role: UserRole, username: string) => void;
  logout: () => void;

  // Global UI State
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  serverDowntimeActive: boolean;
  setServerDowntimeActive: (val: boolean) => void;

  // Active Modals & Views
  activeView: string;
  setActiveView: (view: string) => void;
  inspectedEmigrant: EmigrantApplication | null;
  setInspectedEmigrant: (app: EmigrantApplication | null) => void;
  inspectedFE: FERegistration | null;
  setInspectedFE: (fe: FERegistration | null) => void;
  activeContractPass: EmigrantApplication | null;
  setActiveContractPass: (app: EmigrantApplication | null) => void;
  activeRaCertificate: RARegistration | null;
  setActiveRaCertificate: (ra: RARegistration | null) => void;
  activeFeCertificate: FERegistration | null;
  setActiveFeCertificate: (fe: FERegistration | null) => void;
  tutorialOpen: boolean;
  setTutorialOpen: (open: boolean) => void;
  prefilledMitraQuery: string | null;
  setPrefilledMitraQuery: (q: string | null) => void;
  isMitraOpen: boolean;
  setIsMitraOpen: (open: boolean) => void;

  // Actions
  addEmigrantApplication: (app: Omit<EmigrantApplication, 'arn' | 'submissionDate' | 'status' | 'aiScore' | 'aiTelemetry' | 'ocrDocuments'>) => string;
  addFERegistration: (fe: Omit<FERegistration, 'feId' | 'status' | 'aiScore' | 'ocrDocuments'>) => string;
  addRARegistration: (ra: Omit<RARegistration, 'raId' | 'status' | 'aiScore'>) => string;
  updateEmigrantStatus: (
    arn: string,
    status: EmigrantApplication['status'],
    officerRemarks: string,
    forwardRemarks?: string
  ) => void;
  forwardEmigrantToPge: (arn: string, forwardRemarks: string) => void;
  updateFEStatus: (
    feId: string,
    status: FERegistration['status'],
    officerRemarks: string
  ) => void;
  createSupportTicket: (
    category: string,
    subject: string,
    description: string,
    mobile: string,
    email: string,
    arn?: string
  ) => string;
  resetAllSeedData: () => void;
}

const EmigrateContext = createContext<EmigrateContextType | undefined>(undefined);

export const EmigrateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Emigrant applications with localStorage persistence
  const [emigrants, setEmigrants] = useState<EmigrantApplication[]>(() => {
    try {
      const saved = localStorage.getItem('emigrate_applications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EMIGRANTS;
  });

  // 2. Foreign Employers
  const [foreignEmployers, setForeignEmployers] = useState<FERegistration[]>(() => {
    try {
      const saved = localStorage.getItem('emigrate_fe');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_FE;
  });

  // 3. Recruiting Agents
  const [recruitingAgents, setRecruitingAgents] = useState<RARegistration[]>(() => {
    try {
      const saved = localStorage.getItem('emigrate_ra');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RA;
  });

  // 4. Support Tickets
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem('emigrate_tickets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Auth & Settings
  const [currentUser, setCurrentUser] = useState<{ role: UserRole; username: string } | null>(() => {
    try {
      const saved = localStorage.getItem('emigrate_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [fontScale, setFontScale] = useState<FontScale>('base');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [serverDowntimeActive, setServerDowntimeActive] = useState<boolean>(false);

  // Navigation & Modals
  const [activeView, setActiveView] = useState<string>('home');
  const [inspectedEmigrant, setInspectedEmigrant] = useState<EmigrantApplication | null>(null);
  const [inspectedFE, setInspectedFE] = useState<FERegistration | null>(null);
  const [activeContractPass, setActiveContractPass] = useState<EmigrantApplication | null>(null);
  const [activeRaCertificate, setActiveRaCertificate] = useState<RARegistration | null>(null);
  const [activeFeCertificate, setActiveFeCertificate] = useState<FERegistration | null>(null);
  const [tutorialOpen, setTutorialOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem('emigrate_tutorial_seen');
    } catch (e) {
      return false;
    }
  });
  const [prefilledMitraQuery, setPrefilledMitraQuery] = useState<string | null>(null);
  const [isMitraOpen, setIsMitraOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('emigrate_applications', JSON.stringify(emigrants));
  }, [emigrants]);

  useEffect(() => {
    localStorage.setItem('emigrate_fe', JSON.stringify(foreignEmployers));
  }, [foreignEmployers]);

  useEffect(() => {
    localStorage.setItem('emigrate_ra', JSON.stringify(recruitingAgents));
  }, [recruitingAgents]);

  useEffect(() => {
    localStorage.setItem('emigrate_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('emigrate_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('emigrate_user');
    }
  }, [currentUser]);

  // Auth functions
  const login = (role: UserRole, username: string) => {
    const user = { role, username };
    setCurrentUser(user);
    if (role === 'POE') {
      setActiveView('poe-dashboard');
    } else if (role === 'PGE') {
      setActiveView('pge-dashboard');
    } else if (role === 'MISSION') {
      setActiveView('mission-dashboard');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
    setInspectedEmigrant(null);
    setInspectedFE(null);
  };

  // Add Emigrant with algorithmic triage simulation
  const addEmigrantApplication = (
    data: Omit<EmigrantApplication, 'arn' | 'submissionDate' | 'status' | 'aiScore' | 'aiTelemetry' | 'ocrDocuments'>
  ): string => {
    const randomSuffix = secureSuffix(1000, 9999);
    const countryCode = data.destinationCountry.substring(0, 3).toUpperCase();
    const arn = `ARN-2026-${countryCode}-${randomSuffix}`;

    // Lookup statutory MRW
    const benchmark = MRW_MATRIX.find(
      (m) => m.country === data.destinationCountry && m.trade === data.tradeCategory
    );
    const minSalary = benchmark ? benchmark.minimumWageLocal : 1200;
    const isWageCompliant = data.offeredSalary >= minSalary;
    const isPbbyValid = data.pbbyStatus === 'VALID';
    const isMrzMatch = true; // High fidelity default for scanned biometric doc

    // Calculate AI triage score
    let score = 75;
    if (isWageCompliant) score += 15;
    else score -= 30;
    if (isPbbyValid) score += 10;
    else score -= 15;

    const notes: string[] = [];
    if (isMrzMatch) {
      notes.push(`Machine Readable Zone (MRZ) characters match entered passport number ${data.passportNumber} 100%.`);
    }
    if (isWageCompliant) {
      notes.push(
        `Offered wage (${data.currency} ${data.offeredSalary.toLocaleString()}) meets or exceeds statutory MRW benchmark of ${data.currency} ${minSalary.toLocaleString()}.`
      );
    } else {
      notes.push(
        `CRITICAL WAGE DEFICIT: Offered wage (${data.currency} ${data.offeredSalary.toLocaleString()}) is below the statutory Minimum Referral Wage (MRW) of ${data.currency} ${minSalary.toLocaleString()}.`
      );
    }
    if (isPbbyValid) {
      notes.push(`PBBY Policy #${data.pbbyPolicyNo} active in sovereign database with ₹10 Lakh cover.`);
    } else {
      notes.push('PBBY policy confirmation pending verification or unverified.');
    }
    notes.push('Stated service fee complies with Rule 25 ceiling (≤ ₹30,000 + GST).');

    const cleanDob = data.dob.replace(/-/g, '').substring(2);
    const cleanExp = data.passportExpiry.replace(/-/g, '').substring(2);
    const cleanSurname = data.fullName.split(' ').pop()?.toUpperCase() || 'WORKER';
    const cleanGiven = data.fullName.split(' ')[0]?.toUpperCase() || 'INDIAN';
    const mrzString = `P<IND${cleanSurname}<<${cleanGiven}<<<<<<<<<<<${data.passportNumber}IND${cleanDob}M${cleanExp}<<<<<<<<<<<<<<01`;

    const newApp: EmigrantApplication = {
      ...data,
      arn,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'PENDING_POE',
      aiScore: Math.min(Math.max(score, 45), 98),
      aiTelemetry: {
        mrzMatch: isMrzMatch,
        wageCompliant: isWageCompliant,
        pbbyVerified: isPbbyValid,
        rule25Compliant: true,
        notes,
      },
      ocrDocuments: {
        passport: {
          score: 95,
          mrz: mrzString,
          legible: true,
        },
        contract: {
          score: 92,
          extractedSalary: data.offeredSalary,
          legible: true,
        },
        photo: {
          score: 97,
          validDimensions: true,
        },
      },
    };

    setEmigrants((prev) => [newApp, ...prev]);
    return arn;
  };

  // Add Foreign Employer
  const addFERegistration = (
    data: Omit<FERegistration, 'feId' | 'status' | 'aiScore' | 'ocrDocuments'>
  ): string => {
    const randomSuffix = secureSuffix(1000, 9999);
    const feId = `FE-2026-${randomSuffix}`;

    const newFE: FERegistration = {
      ...data,
      feId,
      status: 'PENDING_MISSION',
      aiScore: 89,
      ocrDocuments: {
        tradeLicense: { score: 92, verifiedEntity: true },
        demandLetter: { score: 86, quotaApproved: true },
      },
    };

    setForeignEmployers((prev) => [newFE, ...prev]);
    return feId;
  };

  // Add Recruiting Agent
  const addRARegistration = (
    data: Omit<RARegistration, 'raId' | 'status' | 'aiScore'>
  ): string => {
    const randomSuffix = secureSuffix(100, 999);
    const raId = `RA-NEW-${randomSuffix}`;

    const newRA: RARegistration = {
      ...data,
      raId,
      status: 'PENDING_POE',
      aiScore: 88,
    };

    setRecruitingAgents((prev) => [newRA, ...prev]);
    return raId;
  };

  // Update Emigrant status by POE Officer or PGE Higher Officer
  const updateEmigrantStatus = (
    arn: string,
    status: EmigrantApplication['status'],
    officerRemarks: string,
    forwardRemarks?: string
  ) => {
    setEmigrants((prev) =>
      prev.map((app) => {
        if (app.arn !== arn) return app;
        const updated: EmigrantApplication = {
          ...app,
          status,
          officerRemarks,
          ...(forwardRemarks ? { poeForwardRemarks: forwardRemarks } : {}),
          ...(status === 'PENDING_PGE_APPROVAL'
            ? {
                poeVerifiedBy: currentUser?.username || 'PoE Reviewing Officer',
                poeVerifiedAt: new Date().toISOString(),
              }
            : {}),
          ...(status === 'APPROVED_EC_GRANTED'
            ? {
                pgeApprovedBy: currentUser?.username || 'Protector General of Emigrants (PGE)',
                pgeApprovedAt: new Date().toISOString(),
              }
            : {}),
        };
        return updated;
      })
    );
    if (inspectedEmigrant && inspectedEmigrant.arn === arn) {
      setInspectedEmigrant((prev) =>
        prev
          ? {
              ...prev,
              status,
              officerRemarks,
              ...(forwardRemarks ? { poeForwardRemarks: forwardRemarks } : {}),
            }
          : null
      );
    }
  };

  const forwardEmigrantToPge = (arn: string, forwardRemarks: string) => {
    updateEmigrantStatus(
      arn,
      'PENDING_PGE_APPROVAL',
      'Forwarded to Higher Officer (PGE) with verification findings.',
      forwardRemarks
    );
  };

  // Update FE status by Indian Mission
  const updateFEStatus = (
    feId: string,
    status: FERegistration['status'],
    officerRemarks: string
  ) => {
    setForeignEmployers((prev) =>
      prev.map((fe) => (fe.feId === feId ? { ...fe, status, officerRemarks } : fe))
    );
    if (inspectedFE && inspectedFE.feId === feId) {
      setInspectedFE((prev) => (prev ? { ...prev, status, officerRemarks } : null));
    }
  };

  // Create PBSK Support Ticket
  const createSupportTicket = (
    category: string,
    subject: string,
    description: string,
    mobile: string,
    email: string,
    arn?: string
  ): string => {
    const ticketId = `TICKET-PBSK-2026-${secureSuffix(1000, 9999)}`;
    const ticket: SupportTicket = {
      ticketId,
      arn,
      category,
      subject,
      description,
      mobile,
      email,
      createdAt: new Date().toISOString(),
      status: 'OPEN',
    };
    setSupportTickets((prev) => [ticket, ...prev]);
    return ticketId;
  };

  // Reset function
  const resetAllSeedData = () => {
    setEmigrants(INITIAL_EMIGRANTS);
    setForeignEmployers(INITIAL_FE);
    setRecruitingAgents(INITIAL_RA);
    setSupportTickets([]);
    localStorage.removeItem('emigrate_applications');
    localStorage.removeItem('emigrate_fe');
    localStorage.removeItem('emigrate_ra');
    localStorage.removeItem('emigrate_tickets');
    localStorage.removeItem('emigrate_user');
    setCurrentUser(null);
    setActiveView('home');
  };

  return (
    <EmigrateContext.Provider
      value={{
        emigrants,
        foreignEmployers,
        recruitingAgents,
        supportTickets,
        currentUser,
        login,
        logout,
        language,
        setLanguage,
        fontScale,
        setFontScale,
        darkMode,
        setDarkMode,
        serverDowntimeActive,
        setServerDowntimeActive,
        activeView,
        setActiveView,
        inspectedEmigrant,
        setInspectedEmigrant,
        inspectedFE,
        setInspectedFE,
        activeContractPass,
        setActiveContractPass,
        activeRaCertificate,
        setActiveRaCertificate,
        activeFeCertificate,
        setActiveFeCertificate,
        tutorialOpen,
        setTutorialOpen,
        prefilledMitraQuery,
        setPrefilledMitraQuery,
        isMitraOpen,
        setIsMitraOpen,
        addEmigrantApplication,
        addFERegistration,
        addRARegistration,
        updateEmigrantStatus,
        forwardEmigrantToPge,
        updateFEStatus,
        createSupportTicket,
        resetAllSeedData,
      }}
    >
      {children}
    </EmigrateContext.Provider>
  );
};

export const useEmigrate = () => {
  const context = useContext(EmigrateContext);
  if (!context) {
    throw new Error('useEmigrate must be used within an EmigrateProvider');
  }
  return context;
};
