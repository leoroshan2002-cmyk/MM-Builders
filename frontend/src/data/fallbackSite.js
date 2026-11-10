// Used only when the API cannot be reached (backend offline / first run before seeding).
// It mirrors backend/src/data/siteData.js so the website still looks complete.
// To regenerate after editing the backend data run:  node scripts/generate-fallback.mjs

const fallbackSite = {
  "settings": {
    "key": "main",
    "primaryPhone": "918015613840",
    "secondaryPhone": "917639318582",
    "address": "Anna Street, Nehru Nagar, Velachery, Chennai, Tamil Nadu",
    "whatsappMessage": "Hello MM Builders, I would like to discuss a project."
  },
  "services": [
    {
      "order": 1,
      "title": "Architectural Design",
      "slug": "architectural-design",
      "summary": "Functional and aesthetic designs tailored to your lifestyle.",
      "description": "Every great building begins with a clear idea. We turn your lifestyle, plot and budget into functional, good-looking plans that make the most of light and ventilation.",
      "offerings": [
        "Concept development and space planning",
        "Floor plans, elevations and sections",
        "Vastu-friendly layouts on request",
        "Approval-ready drawings"
      ],
      "deliverables": [
        "Floor Plans",
        "Elevations",
        "Working Drawings"
      ],
      "image": "/images/services/architectural-design.jpg",
      "iconKey": "design",
      "cut": "22%",
      "imageStyle": "arch"
    },
    {
      "order": 2,
      "title": "Structural Design & Consultation",
      "slug": "structural-design-consultation",
      "summary": "Safe, strong and efficient structural solutions.",
      "description": "A strong building is a safe building. Our structural guidance keeps your project sound, efficient and free from costly surprises on site.",
      "offerings": [
        "Foundation and load-path design",
        "Column, beam and slab detailing",
        "Material and site-condition advice",
        "Safety review of existing structures"
      ],
      "deliverables": [
        "Structural Drawings",
        "Site Advice",
        "Safety Review"
      ],
      "image": "/images/services/structural-design.jpg",
      "iconKey": "structure",
      "cut": "35%",
      "imageStyle": "plain"
    },
    {
      "order": 3,
      "title": "3D Visualization",
      "slug": "3d-visualization",
      "summary": "Realistic 3D designs to visualize your dream project.",
      "description": "See your project before it is built. Realistic 3D views help you finalise designs, colours and materials with confidence and avoid changes later.",
      "offerings": [
        "Photo-realistic exterior renders",
        "Interior views and day / night looks",
        "Walk-through style presentations",
        "Design changes before construction begins"
      ],
      "deliverables": [
        "Exterior Render",
        "Interior Views",
        "Walkthrough"
      ],
      "image": "/images/services/3d-visualization.jpg",
      "iconKey": "cube",
      "cut": "12%",
      "imageStyle": "full"
    },
    {
      "order": 4,
      "title": "Residential Construction",
      "slug": "residential-construction",
      "summary": "Quality construction for your dream home.",
      "description": "From foundation to handover, we build homes with careful supervision, honest communication and dependable finishing.",
      "offerings": [
        "Independent houses, villas and duplexes",
        "Stage-wise progress updates",
        "Quality materials and skilled site teams",
        "Handover with finishing checks"
      ],
      "deliverables": [
        "Villas",
        "Independent Homes",
        "Renovation"
      ],
      "image": "/images/services/residential-construction.jpg",
      "iconKey": "home",
      "cut": "5%",
      "imageStyle": "plain"
    },
    {
      "order": 5,
      "title": "Commercial Construction",
      "slug": "commercial-construction",
      "summary": "Functional spaces for business growth.",
      "description": "Business spaces need to work as hard as you do. We plan and build around workflow, footfall and timelines.",
      "offerings": [
        "Offices, showrooms and retail spaces",
        "Layouts planned around how you operate",
        "Timeline-driven execution",
        "Electrical and plumbing coordination"
      ],
      "deliverables": [
        "Offices",
        "Showrooms",
        "Retail"
      ],
      "image": "/images/services/commercial-construction.jpg",
      "iconKey": "building",
      "cut": "5%",
      "imageStyle": "plain"
    },
    {
      "order": 6,
      "title": "Interior Design",
      "slug": "interior-design",
      "summary": "Elegant and practical interiors that inspire.",
      "description": "Interiors that look elegant and live comfortably. We handle the details so your space feels complete from day one.",
      "offerings": [
        "Space planning and furniture layout",
        "Lighting, materials and colour palettes",
        "Kitchens, wardrobes and false ceilings",
        "Turnkey execution from design to fitting"
      ],
      "deliverables": [
        "Living Spaces",
        "Kitchens",
        "Bedrooms"
      ],
      "image": "/images/services/interior-design.jpg",
      "iconKey": "sofa",
      "cut": "12%",
      "imageStyle": "full"
    }
  ],
  "concepts": [
    {
      "order": 1,
      "title": "Modern Villa Elevation",
      "slug": "modern-villa-elevation",
      "category": "res",
      "fit": "cover",
      "showByDefault": true,
      "image": "/images/concepts/modern-villa-elevation.webp",
      "video": "/concepts/modern-villa-elevation.mp4"
    },
    {
      "order": 2,
      "title": "Contemporary Home",
      "slug": "contemporary-home",
      "category": "res",
      "fit": "cover",
      "showByDefault": true,
      "image": "/images/concepts/contemporary-home.webp",
      "video": "/concepts/contemporary-home.mp4"
    },
    {
      "order": 3,
      "title": "Commercial Building",
      "slug": "commercial-building",
      "category": "com",
      "fit": "cover",
      "showByDefault": true,
      "image": "/images/concepts/commercial-building.webp",
      "video": "/concepts/commercial-building.mp4"
    },
    {
      "order": 4,
      "title": "Interior Concept",
      "slug": "interior-concept",
      "category": "int",
      "fit": "cover",
      "showByDefault": true,
      "image": "/images/concepts/interior-concept.webp",
      "video": "/concepts/interior-concept.mp4"
    },
    {
      "order": 5,
      "title": "Villa 3D Render",
      "slug": "villa-3d-render",
      "category": "3d",
      "fit": "cover",
      "showByDefault": false,
      "image": "/images/concepts/villa-3d-render.webp",
      "video": "/concepts/villa-3d-render.mp4"
    },
    {
      "order": 6,
      "title": "Ground Floor Plan",
      "slug": "ground-floor-plan",
      "category": "plan",
      "fit": "contain",
      "showByDefault": false,
      "image": "/images/concepts/ground-floor-plan.webp",
      "video": "/concepts/ground-floor-plan.mp4"
    }
  ],
  "conceptFilters": [
    {
      "key": "all",
      "label": "All"
    },
    {
      "key": "res",
      "label": "Residential"
    },
    {
      "key": "com",
      "label": "Commercial"
    },
    {
      "key": "int",
      "label": "Interior"
    },
    {
      "key": "3d",
      "label": "3D Renders"
    },
    {
      "key": "plan",
      "label": "Floor Plans"
    }
  ],
  "blueprints": [
    {
      "order": 1,
      "title": "Dr. Vijay Residence",
      "subtitle": "Plumbing Layout · Sathyamangalam",
      "description": "Water supply, drainage and external connection lines extruded from the residence plumbing plan.",
      "tags": [
        "Plumbing",
        "Residential",
        "Sathyamangalam"
      ],
      "thumbnail": "/images/blueprints/dr-vijay-residence-plumbing.webp",
      "thumbnailAlt": "Dr. Vijay Residence Plumbing Layout blueprint",
      "file": "/blueprints/dr-vijay-residence-plumbing-3d.html"
    },
    {
      "order": 2,
      "title": "Mr. Sasikumar Residence",
      "subtitle": "Electrical & Speaker Points · Coimbatore",
      "description": "Conduit runs, light fixtures, fans and speaker points laid out on every room of the plan.",
      "tags": [
        "Electrical",
        "Speaker Points",
        "Coimbatore"
      ],
      "thumbnail": "/images/blueprints/sasikumar-residence-electrical.webp",
      "thumbnailAlt": "Mr. Sasikumar Residence Electrical & Speaker Layout blueprint",
      "file": "/blueprints/sasikumar-residence-electrical-speaker-3d.html"
    },
    {
      "order": 3,
      "title": "Service Apartment",
      "subtitle": "Single Line Diagram · LT / CT Supply",
      "description": "Panels, breakers and distribution connections of the LT/CT supply as a searchable 3D schematic.",
      "tags": [
        "Single Line Diagram",
        "LT / CT Supply",
        "Apartment"
      ],
      "thumbnail": "/images/blueprints/service-apartment-sld.webp",
      "thumbnailAlt": "Service Apartment Single Line Diagram blueprint",
      "file": "/blueprints/service-apartment-sld-ltct-3d.html"
    },
    {
      "order": 4,
      "title": "Administration Building",
      "subtitle": "HVAC & Architectural Plan",
      "description": "Walls, rooms and supply / return duct network rebuilt in 3D from the HVAC drawing.",
      "tags": [
        "HVAC",
        "Ducting",
        "Administration"
      ],
      "thumbnail": "/images/blueprints/administration-building-hvac.webp",
      "thumbnailAlt": "Administration Building HVAC & Architecture blueprint",
      "file": "/blueprints/administration-building-hvac-3d.html"
    }
  ]
};

export default fallbackSite;
