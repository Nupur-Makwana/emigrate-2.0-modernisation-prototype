import React, { useState } from 'react';
import { useEmigrate } from '../context/EmigrateContext';
import {
  Building2,
  MapPin,
  User,
  BadgeIndianRupee,
  FileCheck2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const RecruitingAgentForm: React.FC = () => {
  const { addRARegistration, setActiveView } = useEmigrate();

  const [activeTab, setActiveTab] = useState<'org' | 'roc' | 'proprietor' | 'other' | 'docs'>('org');
  const [submittedRaId, setSubmittedRaId] = useState<string | null>(null);

  // 1. Organisational Details
  const [agencyName, setAgencyName] = useState('Hindustan Overseas Human Resources Pvt Ltd');
  const [constitution, setConstitution] = useState('Private Limited');
  const [panNumber, setPanNumber] = useState('AAACH9012K');
  const [gstNumber, setGstNumber] = useState('07AAACH9012K1Z5');

  // 2. ROC Address
  const [rocAddress, setRocAddress] = useState('Plot 84, Okhla Industrial Area Phase-III, New Delhi 110020');
  const [state, setState] = useState('Delhi');
  const [pinCode, setPinCode] = useState('110020');
  const [officeContact, setOfficeContact] = useState('+91-11-4991-8800');

  // 3. MD / Proprietor
  const [proprietorName, setProprietorName] = useState('Sanjivani K. Deshmukh');
  const [aadhaarNumber, setAadhaarNumber] = useState('8921-4402-1190');
  const [mobileNumber, setMobileNumber] = useState('+91-98112-99012');
  const [email, setEmail] = useState('contact@hindustanoverseas.in');

  // 4. Other Details
  const [bankName, setBankName] = useState('State Bank of India, Commercial Branch, New Delhi');
  const [bankAccountNumber, setBankAccountNumber] = useState('309811244091');
  const [netWorthLakhs, setNetWorthLakhs] = useState<number>(75);
  const [fixedAssetsLakhs, setFixedAssetsLakhs] = useState<number>(45);
  const [liquidAssetsLakhs, setLiquidAssetsLakhs] = useState<number>(30);
  const [liabilitiesLakhs, setLiabilitiesLakhs] = useState<number>(10);
  const [turnover2022, setTurnover2022] = useState<number>(24);
  const [turnover2023, setTurnover2023] = useState<number>(35);
  const [turnover2024, setTurnover2024] = useState<number>(48);
  const [turnover2025, setTurnover2025] = useState<number>(62);
  const [turnover2026, setTurnover2026] = useState<number>(75);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const raId = addRARegistration({
      agencyName,
      rocAddress,
      proprietorName,
      panNumber,
      aadhaarNumber,
      bankName,
      netWorthLakhs,
      turnoverFiveYears: [turnover2022, turnover2023, turnover2024, turnover2025, turnover2026],
    });

    setSubmittedRaId(raId);
  };

  if (submittedRaId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in">
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="tricolor-stripe" />
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-700" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Recruiting Agent Application Lodged
            </span>

            <h2 className="text-2xl font-black text-navy-900">
              Agency License File ID (RA-ID)
            </h2>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg max-w-md mx-auto">
              <span className="font-mono text-2xl font-extrabold text-navy-900 tracking-wider">
                {submittedRaId}
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Allocated to the Protector of Emigrants (PoE) scrutiny queue.
              </p>
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your 5-year financial solvency dossier, audited turnovers, and ₹50 Lakh bank guarantee confirmation have been submitted for statutory review under Section 11 of the Emigration Act 1983.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmittedRaId(null);
                  setActiveTab('org');
                }}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 rounded hover:bg-slate-100 transition"
              >
                File Another Registration
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
      <div className="mb-6">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Ministry of External Affairs • Form RA-REG-01
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-navy-900">
          Recruiting Agent (RA) Registration & Licensing
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Statutory registration for Indian recruitment agencies seeking a license under the Emigration Act 1983 and Rule 25 compliance.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <div className="tricolor-stripe" />

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between overflow-x-auto text-xs font-bold text-slate-700">
          {[
            { id: 'org', label: 'Organisational Details', icon: Building2 },
            { id: 'roc', label: 'ROC Address', icon: MapPin },
            { id: 'proprietor', label: 'MD / Proprietor', icon: User },
            { id: 'other', label: 'Financials & Solvency', icon: BadgeIndianRupee },
            { id: 'docs', label: 'Documents Checklist', icon: FileCheck2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'border-navy-900 text-navy-900 bg-white shadow-xs rounded-t'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: Organisational Details */}
          {activeTab === 'org' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-navy-900">
                  Part A: Organisational Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Agency Name *
                  </label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Constitution of Entity *
                  </label>
                  <select
                    value={constitution}
                    onChange={(e) => setConstitution(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded bg-white focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    <option value="Private Limited">Private Limited Company</option>
                    <option value="Public Limited">Public Limited Company</option>
                    <option value="Partnership">Partnership Firm</option>
                    <option value="Proprietorship">Proprietorship Concern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PAN Card Number *
                  </label>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono font-bold focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    GSTIN Registration Number *
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROC Address */}
          {activeTab === 'roc' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-navy-900">
                  Part B: Registered Office (ROC) Address
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Registered Office Address *
                  </label>
                  <textarea
                    value={rocAddress}
                    onChange={(e) => setRocAddress(e.target.value)}
                    required
                    rows={2}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State / UT *</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Landline / Contact *</label>
                    <input
                      type="text"
                      value={officeContact}
                      onChange={(e) => setOfficeContact(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MD / Proprietor */}
          {activeTab === 'proprietor' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-navy-900">
                  Part C: Managing Director / Managing Partner / Proprietor
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name of Managing Director / Proprietor *
                  </label>
                  <input
                    type="text"
                    value={proprietorName}
                    onChange={(e) => setProprietorName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Aadhaar Number (UIDAI) *
                  </label>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Mobile Number *
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Other Details (Turnovers & Bank Solvency) */}
          {activeTab === 'other' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-navy-900">
                  Part D: Financial Solvency & 5-Year Turnover History
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Operational Bank Name *
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Net Worth (in ₹ Lakhs) *
                  </label>
                  <input
                    type="number"
                    value={netWorthLakhs}
                    onChange={(e) => setNetWorthLakhs(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded font-bold text-navy-900 focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mandatory Bank Guarantee Deposited *
                  </label>
                  <div className="px-3 py-2 text-xs bg-emerald-50 border border-emerald-300 rounded font-bold text-emerald-800 flex items-center justify-between">
                    <span>Statutory ₹50.00 Lakh Bank Guarantee</span>
                    <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded">Verified Active</span>
                  </div>
                </div>
              </div>

              {/* 5-Year Turnover Table */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  5-Year Audited Turnovers (₹ in Lakhs) *
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { year: '2022', val: turnover2022, set: setTurnover2022 },
                    { year: '2023', val: turnover2023, set: setTurnover2023 },
                    { year: '2024', val: turnover2024, set: setTurnover2024 },
                    { year: '2025', val: turnover2025, set: setTurnover2025 },
                    { year: '2026', val: turnover2026, set: setTurnover2026 },
                  ].map((t) => (
                    <div key={t.year} className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                      <span className="text-[10px] font-bold text-slate-500 block">FY {t.year}</span>
                      <input
                        type="number"
                        value={t.val}
                        onChange={(e) => t.set(Number(e.target.value))}
                        className="w-full text-center text-xs font-bold text-navy-900 mt-1 border border-slate-300 rounded py-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Documents Checklist */}
          {activeTab === 'docs' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="font-bold text-sm text-navy-900">
                  Part E: Documents Checklist & Rule 25 Statutory Pledge
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-navy-900 block mb-1">Audited Balance Sheets</span>
                  <span className="text-slate-500 text-[11px]">Past 3 years CA certified balance sheets</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Attached</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-navy-900 block mb-1">Bank Guarantee Bond</span>
                  <span className="text-slate-500 text-[11px]">Original ₹50 Lakh bank guarantee deed</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Attached</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-bold text-navy-900 block mb-1">Specimen Signatures</span>
                  <span className="text-slate-500 text-[11px]">Notarized authorized signatures</span>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">✓ Attached</span>
                </div>
              </div>

              {/* Rule 25 Statutory Pledge */}
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-xs text-rose-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Rule 25 Maximum Service Charge Undertaking:</span>
                </div>
                <p>
                  The applicant agency hereby solemnly pledges under Rule 25 of the Emigration Rules that it shall never charge more than <strong>₹30,000 + GST</strong> from any worker for recruitment services. All visa costs, flight tickets, and foreign employer costs are strictly prohibited from being collected from job seekers.
                </p>
              </div>
            </div>
          )}

          {/* Tab Navigation Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {activeTab !== 'org' && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'docs') setActiveTab('other');
                  else if (activeTab === 'other') setActiveTab('proprietor');
                  else if (activeTab === 'proprietor') setActiveTab('roc');
                  else if (activeTab === 'roc') setActiveTab('org');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded border border-slate-300 flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Section
              </button>
            )}

            <div className="ml-auto">
              {activeTab !== 'docs' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'org') setActiveTab('roc');
                    else if (activeTab === 'roc') setActiveTab('proprietor');
                    else if (activeTab === 'proprietor') setActiveTab('other');
                    else if (activeTab === 'other') setActiveTab('docs');
                  }}
                  className="px-5 py-2 text-xs font-bold bg-navy-900 hover:bg-navy-800 text-white rounded shadow transition flex items-center gap-1.5"
                >
                  Next Section <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white rounded shadow transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Submit RA License Application to PoE
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
