import React, { useState } from 'react';
import { useEmigrate } from '../context/EmigrateContext';
import { Country } from '../types/emigrate';
import { ECR_COUNTRIES, MRW_MATRIX } from '../data/seedData';
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Upload,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  FileCheck2,
} from 'lucide-react';

export const EmigrantForm: React.FC = () => {
  const { addEmigrantApplication, setPrefilledMitraQuery, setIsMitraOpen, setActiveView } = useEmigrate();

  const [step, setStep] = useState(1);
  const [submittedArn, setSubmittedArn] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('Mukesh Kumar Verma');
  const [fatherName, setFatherName] = useState('Suresh Kumar Verma');
  const [dob, setDob] = useState('1995-07-14');
  const [passportNumber, setPassportNumber] = useState('K7819234');
  const [placeOfIssue, setPlaceOfIssue] = useState('Jaipur');
  const [dateOfIssue, setDateOfIssue] = useState('2021-08-10');
  const [passportExpiry, setPassportExpiry] = useState('2031-08-09');

  // Overseas Employment
  const [destinationCountry, setDestinationCountry] = useState<Country>('United Arab Emirates');
  const [tradeCategory, setTradeCategory] = useState('Construction Mason');
  const [offeredSalary, setOfferedSalary] = useState<number>(1450);
  const [currency, setCurrency] = useState('AED');
  const [feId, setFeId] = useState('FE-UAE-9921');
  const [raId, setRaId] = useState('RA-DEL-0418');

  // Education
  const [educationLevel, setEducationLevel] = useState('Below 10th Standard');
  const [ecrStatus, setEcrStatus] = useState<'ECR' | 'ECNR'>('ECR');

  // PBBY Insurance
  const [pbbyPolicyNo, setPbbyPolicyNo] = useState('PBBY-2026-90214');
  const [pbbyStatus, setPbbyStatus] = useState<'VALID' | 'PENDING' | 'REJECTED'>('PENDING');
  const [isVerifyingPbby, setIsVerifyingPbby] = useState(false);
  const [pbbyVerifiedMessage, setPbbyVerifiedMessage] = useState<string | null>(null);

  // Documents
  const [passportDocName, setPassportDocName] = useState('passport_bio_scan_k7819234.pdf');
  const [contractDocName, setContractDocName] = useState('uae_employment_contract_signed.pdf');
  const [photoDocName, setPhotoDocName] = useState('passport_photo_mukesh.jpg');

  // MRW comparison lookup
  const currentBenchmark = MRW_MATRIX.find(
    (m) => m.country === destinationCountry && m.trade === tradeCategory
  );
  const benchmarkMinimum = currentBenchmark ? currentBenchmark.minimumWageLocal : 1250;
  const isBelowMRW = offeredSalary > 0 && offeredSalary < benchmarkMinimum;

  // Handle destination country change
  const handleCountryChange = (c: Country) => {
    setDestinationCountry(c);
    if (c === 'United Arab Emirates') setCurrency('AED');
    else if (c === 'Kingdom of Saudi Arabia') setCurrency('SAR');
    else if (c === 'Qatar') setCurrency('QAR');
    else if (c === 'Kuwait') setCurrency('KWD');
    else if (c === 'Oman') setCurrency('OMR');
    else if (c === 'Bahrain') setCurrency('BHD');
  };

  // Education change automatically sets ECR / ECNR
  const handleEducationChange = (val: string) => {
    setEducationLevel(val);
    if (val === 'Below 10th Standard' || val === 'Primary School') {
      setEcrStatus('ECR');
    } else {
      setEcrStatus('ECNR');
    }
  };

  // Asynchronous non-blocking PBBY verification simulation
  const handleVerifyPbby = () => {
    setIsVerifyingPbby(true);
    setPbbyVerifiedMessage(null);

    setTimeout(() => {
      setIsVerifyingPbby(false);
      setPbbyStatus('VALID');
      setPbbyVerifiedMessage('Policy Verified Active (₹10 Lakh Cover Valid with Sovereign Insurance Gateway)');
    }, 1500);
  };

  // Trigger eMigrate Mitra help with pre-drafted context
  const handleNeedHelp = (field: string) => {
    let question = `Explain the requirements for ${field} on eMigrate 2.0`;
    if (field === 'MRW') {
      question = `What is the Minimum Referral Wage (MRW) for ${tradeCategory} in ${destinationCountry}?`;
    } else if (field === 'PBBY') {
      question = 'What is Pravasi Bharatiya Bima Yojana (PBBY) and why is it mandatory?';
    } else if (field === 'ECR') {
      question = 'How do I know if my passport is ECR or ECNR?';
    }
    setPrefilledMitraQuery(question);
    setIsMitraOpen(true);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const arn = addEmigrantApplication({
      fullName,
      fatherName,
      dob,
      passportNumber,
      passportExpiry,
      ecrStatus,
      destinationCountry,
      tradeCategory,
      offeredSalary,
      currency,
      pbbyPolicyNo: pbbyStatus === 'VALID' ? pbbyPolicyNo : 'PBBY-PENDING',
      pbbyStatus,
      raId,
      feId,
    });

    setSubmittedArn(arn);
  };

  if (submittedArn) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="tricolor-stripe" />
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
              Application Dossier Submitted Successfully
            </span>

            <h2 className="text-2xl font-black text-navy-900">
              Application Reference Number (ARN)
            </h2>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto">
              <span className="font-mono text-2xl font-extrabold text-navy-900 tracking-wider">
                {submittedArn}
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Preserve this ARN for tracking your Emigration Clearance status with the Protector of Emigrants.
              </p>
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your application has entered the sovereign verification queue. The Protector of Emigrants (PoE) will verify biometric MRZ conformity, contract wages against statutory MRW benchmarks, and PBBY insurance authenticity.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmittedArn(null);
                  setStep(1);
                }}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 rounded hover:bg-slate-100 transition"
              >
                File Another Application
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="px-5 py-2 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded shadow transition"
              >
                Return to Home Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Page Title & Breadcrumb */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Ministry of External Affairs • Form e-EC-01
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-navy-900">
          Application for Emigration Clearance (EC)
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          For Emigration Check Required (ECR) passport holders traveling to 18 notified countries for overseas employment.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {/* Tricolor accent */}
        <div className="tricolor-stripe" />

        {/* Wizard Step Progression Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between overflow-x-auto text-xs font-semibold">
          {[
            { num: 1, label: 'Passport & Bio' },
            { num: 2, label: 'Employment Details' },
            { num: 3, label: 'Qualifications' },
            { num: 4, label: 'PBBY Insurance' },
            { num: 5, label: 'Documents' },
            { num: 6, label: 'Review & File' },
          ].map((item) => (
            <div
              key={item.num}
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 ${
                step === item.num
                  ? 'text-navy-900 font-bold border-b-2 border-navy-900'
                  : step > item.num
                  ? 'text-emerald-700'
                  : 'text-slate-400'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === item.num
                    ? 'bg-navy-900 text-white'
                    : step > item.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > item.num ? '✓' : item.num}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Wizard Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Personal & Passport Details */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-navy-900" />
                  Step 1: Personal & Passport Information
                </h3>
                <span className="text-xs text-slate-500 font-medium">As stated on Indian Passport</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Full Name (as per Passport) *</label>
                    <button
                      type="button"
                      onClick={() => handleNeedHelp('Full Name')}
                      className="text-slate-400 hover:text-navy-900"
                      title="Need Help?"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Father's / Husband's Name *</label>
                    <button
                      type="button"
                      onClick={() => handleNeedHelp('Father Name')}
                      className="text-slate-400 hover:text-navy-900"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth (DOB) *</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Passport Number *</label>
                    <button
                      type="button"
                      onClick={() => handleNeedHelp('Passport Number')}
                      className="text-slate-400 hover:text-navy-900"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono font-bold focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Place of Issue *</label>
                  <input
                    type="text"
                    value={placeOfIssue}
                    onChange={(e) => setPlaceOfIssue(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Issue *</label>
                  <input
                    type="date"
                    value={dateOfIssue}
                    onChange={(e) => setDateOfIssue(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Expiry *</label>
                  <input
                    type="date"
                    value={passportExpiry}
                    onChange={(e) => setPassportExpiry(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500">Must have at least 6 months validity</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Overseas Employment Details & Statutory MRW Guardrail */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-navy-900" />
                  Step 2: Overseas Employment Details & MRW Guardrail
                </h3>
                <span className="text-xs text-slate-500 font-medium">Statutory Wage Gate</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination Country (18 Notified ECR Nations) *
                  </label>
                  <select
                    value={destinationCountry}
                    onChange={(e) => handleCountryChange(e.target.value as Country)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    {ECR_COUNTRIES.slice(0, 6).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Trade Category / Job Title *</label>
                    <button
                      type="button"
                      onClick={() => handleNeedHelp('MRW')}
                      className="text-slate-400 hover:text-navy-900"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <select
                    value={tradeCategory}
                    onChange={(e) => setTradeCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    <option value="Construction Mason">Construction Mason</option>
                    <option value="General Electrician">General Electrician</option>
                    <option value="Heavy Vehicle Driver">Heavy Vehicle Driver</option>
                    <option value="Staff Nurse">Staff Nurse</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Offered Monthly Wage ({currency}) *
                    </label>
                    <span className="text-[11px] text-slate-500">
                      MRW Benchmark: {currency} {benchmarkMinimum.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={offeredSalary}
                      onChange={(e) => setOfferedSalary(Number(e.target.value))}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Authorized Foreign Employer ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={feId}
                    onChange={(e) => setFeId(e.target.value)}
                    placeholder="e.g. FE-UAE-9921"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Recruiting Agent ID (RA-ID)
                  </label>
                  <input
                    type="text"
                    value={raId}
                    onChange={(e) => setRaId(e.target.value)}
                    placeholder="e.g. RA-DEL-0418"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Interactive Statutory MRW Guardrail Alert */}
              {isBelowMRW ? (
                <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded-md text-red-900 text-xs flex items-start gap-3 animate-in fade-in">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">
                      Statutory Warning: Entered wage falls below the Minimum Referral Wage (MRW) of {currency} {benchmarkMinimum.toLocaleString()}!
                    </strong>
                    <span>
                      Under Section 15 of the Emigration Act 1983, you cannot be legally cleared for less than the statutory baseline. The Protector of Emigrants will reject this clearance until the Foreign Employer amends the contract wage.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    <strong>MRW Compliant:</strong> Offered wage ({currency} {offeredSalary.toLocaleString()}) complies with or exceeds the statutory MEA baseline of {currency} {benchmarkMinimum.toLocaleString()}.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Educational Qualifications */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-navy-900" />
                  Step 3: Educational Qualifications (ECR vs ECNR Determination)
                </h3>
                <span className="text-xs text-slate-500 font-medium">Statutory Criteria</span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Highest Class Passed / Academic Attainment *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Below 10th Standard',
                    'Matriculation / 10th Standard Passed',
                    'Higher Secondary (10+2)',
                    'Graduate / Degree Holder',
                    'Diploma / ITI Technical Certificate',
                  ].map((level) => (
                    <label
                      key={level}
                      className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between text-xs transition ${
                        educationLevel === level
                          ? 'border-navy-900 bg-blue-50/50 font-bold text-navy-900'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{level}</span>
                      <input
                        type="radio"
                        name="education"
                        checked={educationLevel === level}
                        onChange={() => handleEducationChange(level)}
                        className="text-navy-900"
                      />
                    </label>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block">Determined Emigration Status:</span>
                    <strong className="text-navy-900 text-sm">{ecrStatus}</strong>
                  </div>
                  <span className="text-slate-500 text-[11px] max-w-xs text-right">
                    {ecrStatus === 'ECR'
                      ? 'Emigration Check Required: Clearance through eMigrate is mandatory before airport departure.'
                      : 'Emigration Check Not Required: Exempt from mandatory PoE clearance.'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PBBY Verification with Asynchronous Polling */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-navy-900" />
                  Step 4: Pravasi Bharatiya Bima Yojana (PBBY) Verification
                </h3>
                <span className="text-xs text-slate-500 font-medium">Asynchronous Sovereign Gate</span>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2">
                <h4 className="font-bold text-navy-900">Mandatory PBBY Coverage:</h4>
                <p className="text-slate-700">
                  Every Indian emigrant proceeding on an ECR passport must hold an active PBBY policy covering accidental death/permanent disability up to ₹10 Lakhs. Policies are verified electronically via the Insurance Regulatory and Development Authority (IRDAI) repository.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PBBY Insurance Policy Number *
                  </label>
                  <input
                    type="text"
                    value={pbbyPolicyNo}
                    onChange={(e) => setPbbyPolicyNo(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono font-bold focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleVerifyPbby}
                    disabled={isVerifyingPbby}
                    className="w-full py-2 px-4 bg-navy-900 hover:bg-navy-800 disabled:bg-slate-400 text-white font-bold text-xs rounded transition flex items-center justify-center gap-2"
                  >
                    {isVerifyingPbby ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Connecting to Insurance Repository...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Verify Insurance with PBBY Gateway</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {pbbyVerifiedMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{pbbyVerifiedMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Document Uploads */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-navy-900" />
                  Step 5: Document Uploads for Automated OCR Triage
                </h3>
                <span className="text-xs text-slate-500 font-medium">Front-End Legibility Check</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center space-y-2 hover:border-navy-900 transition">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 block">Passport Bio-Page Scan</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">{passportDocName}</span>
                  <span className="text-[10px] text-slate-500">PDF, JPG (Max 2MB)</span>
                </div>

                <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center space-y-2 hover:border-navy-900 transition">
                  <FileCheck2 className="w-8 h-8 text-slate-400 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 block">Signed Employment Contract</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">{contractDocName}</span>
                  <span className="text-[10px] text-slate-500">Bilingual Signed PDF</span>
                </div>

                <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center space-y-2 hover:border-navy-900 transition">
                  <User className="w-8 h-8 text-slate-400 mx-auto" />
                  <span className="font-bold text-xs text-slate-800 block">Passport Photograph</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">{photoDocName}</span>
                  <span className="text-[10px] text-slate-500">White Background (35x45mm)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded text-[11px] text-slate-500">
                Notice: Uploaded documents will be processed by the PoE automated OCR parser to verify machine-readable characters, wage seals, and signatory legitimacy.
              </div>
            </div>
          )}

          {/* STEP 6: Review & Final Submission */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-navy-900" />
                  Step 6: Review Application Dossier
                </h3>
                <span className="text-xs text-slate-500 font-medium">Final Statutory Declaration</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block">Applicant Name:</span>
                    <strong className="text-navy-900">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Passport Number:</span>
                    <strong className="text-navy-900 font-mono">{passportNumber}</strong> ({ecrStatus})
                  </div>
                  <div>
                    <span className="text-slate-500 block">Destination Country:</span>
                    <strong className="text-navy-900">{destinationCountry}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Trade / Job Title:</span>
                    <strong className="text-navy-900">{tradeCategory}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contract Monthly Wage:</span>
                    <strong className="text-navy-900">
                      {currency} {offeredSalary.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">PBBY Policy:</span>
                    <strong className="text-emerald-700">{pbbyPolicyNo} ({pbbyStatus})</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 space-y-1">
                <strong>Applicant Statutory Declaration:</strong>
                <p>
                  I hereby solemnly affirm that the details entered above are true and complete to the best of my knowledge. I understand that any false statement or submission of forged documents is a punishable offense under Section 24 of the Emigration Act, 1983.
                </p>
              </div>
            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded border border-slate-300 flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Step
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="px-5 py-2 text-xs font-bold bg-navy-900 hover:bg-navy-800 text-white rounded shadow transition flex items-center gap-1.5"
              >
                Continue to Step {step + 1} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white rounded shadow transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Dossier for PoE Review
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
