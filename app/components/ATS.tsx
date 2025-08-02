import React from 'react';

interface Suggestion {
  type: 'good' | 'improve';
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  let gradientClass = '';
  let iconSrc = '';

  if (score > 69) {
    gradientClass = 'from-green-100';
    iconSrc = '/icons/ats-good.svg';
  } else if (score > 49) {
    gradientClass = 'from-yellow-100';
    iconSrc = '/icons/ats-warning.svg';
  } else {
    gradientClass = 'from-red-100';
    iconSrc = '/icons/ats-bad.svg';
  }

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-xl shadow-md p-6`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center mb-4">
        <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10 mr-3" />
        <h2 className="text-xl font-bold">ATS score - {score}/100</h2>
      </div>

      {/* Description section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Applicant Tracking System Compatibility</h3>
        <p className="text-gray-600 mb-4">
          This score indicates how well your resume will perform when processed by Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <ul className="space-y-3 mb-4">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <img 
                src={suggestion.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'} 
                alt={suggestion.type === 'good' ? 'Check' : 'Warning'} 
                className="w-5 h-5 mt-0.5 mr-2" 
              />
              <span>{suggestion.tip}</span>
            </li>
          ))}
        </ul>

        {/* Closing line */}
        <p className="text-gray-700 italic">
          Improving these aspects will help your resume get past ATS filters and into the hands of hiring managers.
        </p>
      </div>
    </div>
  );
};

export default ATS;
