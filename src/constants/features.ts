import getFeature from "../shared/utils/functions/getFeature";

import type FeatureProps from "../types/features";

const featureList: FeatureProps[] = [
  getFeature("allInOne"),
  getFeature("checkAnswer"),
  getFeature("database"),
  getFeature("rank"),
  getFeature("timeLimit"),
];

export default featureList;
