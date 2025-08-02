import React from 'react';
import { cn } from '~/lib/cn';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent
} from '~/components/Accordion';

// Helper Components
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  let bgColor = '';
  let textColor = '';
  let icon = null;

  if (score > 69) {
    bgColor = 'bg-green-100';
    textColor = 'text-green-600';
    icon = (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  } else if (score > 39) {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-600';
    icon = null;
  } else {
    bgColor = 'bg-red-100';
    textColor = 'text-red-600';
    icon = null;
  }

  return (
    <div className={cn('flex items-center px-3 py-1 rounded-full', bgColor)}>
      {icon}
      <span className={cn('text-xs font-medium', textColor)}>{score}/100</span>
    </div>
  );
};

const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({ 
  title, 
  categoryScore 
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3 className="text-lg font-medium">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent: React.FC<{ 
  tips: { type: "good" | "improve"; tip: string; explanation: string }[] 
}> = ({ tips }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start">
            <img 
              src={tip.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'} 
              alt={tip.type === 'good' ? 'Good' : 'Improve'} 
              className="w-5 h-5 mt-0.5 mr-2" 
            />
            <span className="text-sm">{tip.tip}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={cn('p-3 rounded-lg', {
              'bg-green-50 border border-green-100': tip.type === 'good',
              'bg-yellow-50 border border-yellow-100': tip.type === 'improve'
            })}
          >
            <p className={cn('text-sm font-medium mb-1', {
              'text-green-700': tip.type === 'good',
              'text-yellow-700': tip.type === 'improve'
            })}>
              {tip.tip}
            </p>
            <p className="text-sm text-gray-600">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Accordion>
        <AccordionItem id="tone-and-style">
          <AccordionHeader itemId="tone-and-style">
            <CategoryHeader 
              title="Tone & Style" 
              categoryScore={feedback.toneAndStyle.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-and-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader 
              title="Content" 
              categoryScore={feedback.content.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader 
              title="Structure" 
              categoryScore={feedback.structure.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader 
              title="Skills" 
              categoryScore={feedback.skills.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
