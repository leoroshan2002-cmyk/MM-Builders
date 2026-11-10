// Static copy for the "Our Approach" section (not stored in the database).
export const PROCESS_STEPS = [
  { title: 'Initial Consultation', text: 'Understand your goals, requirements and budget.' },
  { title: 'Planning & Design', text: 'Develop design concepts and finalize the plan.' },
  { title: 'Scope & Quotation', text: 'Provide detailed scope and transparent quotation.' },
  { title: 'Project Execution', text: 'Begin construction with regular updates.' },
  { title: 'Handover & Support', text: 'Complete the project and provide ongoing support.' },
];

// `icon` = SVG markup children drawn inside a 40×40 box
export const WHY_CHOOSE_US = [
  {
    title: 'Client-Focused Approach',
    text: 'We understand your needs and provide personalized solutions.',
    icon: (
      <>
        <circle cx="20" cy="14" r="6" />
        <path d="M8 34c2-8 6-11 12-11s10 3 12 11" />
      </>
    ),
  },
  {
    title: 'Clear Communication',
    text: 'Transparent and honest discussions throughout the project.',
    icon: <path d="M6 10h28v18H16l-8 6v-6H6z" />,
  },
  {
    title: 'Quality Construction',
    text: 'Focus on quality materials and workmanship.',
    icon: <path d="M20 5l12 5v9c0 8-5 13-12 16C13 32 8 27 8 19v-9zM14 20l5 5 8-9" />,
  },
  {
    title: 'Practical Solutions',
    text: 'Designs and plans tailored to your budget and requirements.',
    icon: <path d="M8 32V12h24v20zM8 20h24M16 12v20" />,
  },
];
