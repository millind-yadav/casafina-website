import { assetPath } from '../utils/assetPath';

export const services = [
  {
    id: 1,
    number: '01',
    title: 'Project Conceptualization',
    description:
      'These services allow clients to tap into our extensive construction expertise during the planning phase of their project, including cost estimation, value engineering, constructability reviews, and project scheduling.',
    includes: [
      'Feasibility Studies',
      'Concept Design',
      'Budget Estimation',
      'Timeline Planning',
      'Risk Assessment',
    ],
    icon: '📐',
    image: assetPath('images/desk_helmet_drawing_ipad-1024x683.jpg'),
  },
  {
    id: 2,
    number: '02',
    title: 'Construction Management',
    description:
      'For clients who prefer to complete design prior to engaging the general contractors, we offer construction management services with price certainty, transparent reporting, and disciplined site oversight.',
    includes: [
      'Contractor Procurement',
      'Site Supervision',
      'Quality Control',
      'Progress Reporting',
      'Cost Management',
    ],
    icon: '🏢',
    image: assetPath('images/african-engineer-on-construction-site1d-q85gtp310i56grxg0hfhvoqkzmrs5qc4q59zgnop40.png'),
  },
  {
    id: 3,
    number: '03',
    title: 'Procurement of Materials',
    description:
      'Leveraging our experience and supplier network, we source materials through qualified vendors or directly from manufacturers across all construction inputs, always targeting the best price and convenient payment structures.',
    includes: [
      'Supplier Sourcing',
      'Price Negotiation',
      'Quality Verification',
      'Logistics Management',
      'Payment Plans',
    ],
    icon: '📦',
    image: assetPath('images/Construction-Materials-1170x781-1-1024x684.jpeg'),
  },
  {
    id: 4,
    number: '04',
    title: 'Engineering Design & Construction',
    description:
      'This delivery method gives our clients a single source of responsibility for both the design and construction of their project, with early cost clarity, schedule control, and full accountability through completion.',
    includes: [
      'Structural Engineering',
      'MEP Design',
      'Architectural Drawings',
      'Full Construction',
      'As-Built Drawings',
    ],
    icon: '⚙️',
    image: assetPath('images/design_build_construction.jpg'),
  },
];
