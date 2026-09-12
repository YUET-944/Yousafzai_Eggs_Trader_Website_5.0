import { defaultContent } from '../../data/defaultContent';

export const stages = defaultContent.productionProcess.steps.map((step, index) => ({
  id: `step-${index}`,
  title: step.title,
  description: step.desc,
  image: defaultContent.websiteImages[step.img] || step.img,
  stats: `0${index + 1}`
}));
