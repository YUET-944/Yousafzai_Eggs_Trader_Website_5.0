import deliveryTruckImage from './image.png';
import qualityInspectionImage from '../../assets/Qulatiy.png';

export const stages = [
  {
    id: "farm",
    title: "Farm Sourcing",
    description: "Fresh eggs begin their journey from vetted partner farms across Pakistan",
    image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=1200&q=80",
    stats: "200+ PARTNER FARMS"
  },
  {
    id: "quality",
    title: "Quality Laboratory",
    description: "Every egg passes through strict quality checks, including salmonella swabs, Haugh unit testing, candling, and USDA grading.",
    image: qualityInspectionImage,
    stats: "TRIPLE INSPECTION PROCESS"
  },
  {
    id: "cold_storage",
    title: "Cold Storage",
    description: "Continuous 2–5°C controlled storage across nationwide  with IoT monitoring.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    stats: "MAINTAINED AT 2-5°C"
  },
  {
    id: "packaging",
    title: "Packaging",
    description: "Client-specified or standard 30-egg tray packaging with complete batch traceability labels.",
    image: "/images/yousafzai-packaging.png",
    stats: "BATCH TRACEABILITY"
  },
  {
    id: "delivery",
    title: "Delivery",
    description: "Refrigerated last-mile delivery with real-time GPS and temperature logging right to your dock.",
    image: deliveryTruckImage,
    stats: "TEMPERATURE MONITORED FLEET"
  }
];
